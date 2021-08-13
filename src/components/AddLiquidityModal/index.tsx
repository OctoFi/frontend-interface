import { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TokenAmount } from "@uniswap/sdk";
import { TransactionResponse } from "@ethersproject/providers";
import { useTranslation } from "react-i18next";
import { Button, Row, Col } from "react-bootstrap";

import { CONTRACTS } from "../../constants";
import curvePipeABI from "../../constants/abis/curve.json";
import balancerPipeABI from "../../constants/abis/balancer.json";
import yVaultPipeABI from "../../constants/abis/yVault.json";
import { useActiveWeb3React } from "../../hooks";
import { useCurrency } from "../../hooks/Tokens";
import useTransactionDeadline from "../../hooks/useTransactionDeadline";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { calculateSlippageAmount, getContract, isAddress } from "../../utils";
import { AppState } from "../../state";
import { useWalletModalToggle } from "../../state/application/hooks";
import { getGasPrice } from "../../state/currency/actions";
import { Field } from "../../state/mint/actions";
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from "../../state/mint/hooks";
import { clearSelectedPool } from "../../state/pools/actions";
import { useTransactionAdder } from "../../state/transactions/hooks";
import { useUserSlippageTolerance } from "../../state/user/hooks";
import { TYPE } from "../../theme";

import CurrencyInputPanel from "../CurrencyInputPanel";
import CurrencyLogo from "../Logo/CurrencyLogo";
import PlatformLogo from "../Logo/PlatformLogo";
import GasPricesContainer from "../GasPrices";
import { Modal } from "../Modal/bootstrap";
import {
	ConfirmationModalContent,
	ConfirmationPendingContent,
	TransactionSubmittedContent,
} from "../TransactionConfirmationModal";
import GradientButton from "../UI/Button";
import { RowBetween, RowFixed } from "../Row";
import { LightCard } from "../StyledCards";
import { PriceTopbar } from "./uniswap";
import * as Styled from "./styleds";

export default function AddLiquidityModal({ history }: RouteComponentProps) {
	const { account, chainId, library } = useActiveWeb3React();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const toggleWalletModal = useWalletModalToggle();

	const { gasPrice, selectedGasPrice } = useSelector((state: AppState) => state.currency);
	const selectedPool = useSelector((state: AppState) => state.pools.selected);
	const pool = selectedPool.data;
	const type = selectedPool.type;

	useEffect(() => {
		if (!pool || !isAddress(pool.address)) {
			dispatch(clearSelectedPool());
			history.push("/invest/pools");
		}
	}, [pool, dispatch, history]);
	const currencyA = useCurrency("ETH");

	// mint state
	const { independentField, typedValue, otherTypedValue } = useMintState();
	const { dependentField, currencies, currencyBalances, parsedAmounts, noLiquidity, liquidityMinted } =
		useDerivedMintInfo(currencyA ?? undefined, undefined);
	const { onFieldAInput } = useMintActionHandlers(noLiquidity);

	// modal and loading
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // clicked confirm

	// txn values
	const deadline = useTransactionDeadline(); // custom from users settings
	const [allowedSlippage] = useUserSlippageTolerance(); // custom from users
	const [txHash, setTxHash] = useState<string>("");

	// get formatted amounts
	const formattedAmounts = {
		[independentField]: typedValue,
		[dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
	};

	// get the max amounts user can add
	const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
		(accumulator, field) => {
			return {
				...accumulator,
				[field]: maxAmountSpend(currencyBalances[field]),
			};
		},
		{}
	);

	const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
		(accumulator, field) => {
			return {
				...accumulator,
				[field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? "0"),
			};
		},
		{}
	);

	const addTransaction = useTransactionAdder();

	async function onAdd() {
		if (!chainId || !library || !account) return;
		let router;
		if (type && type.toLowerCase() === "curve") {
			router = getContract(CONTRACTS.curve, curvePipeABI, library, account);
		} else if (type && type.toLowerCase() === "balancer") {
			router = getContract(CONTRACTS.balancer, balancerPipeABI, library, account);
		} else if (type && type.toLowerCase() === "yearn") {
			router = getContract(CONTRACTS.yVault, yVaultPipeABI, library, account);
		} else {
			return;
		}

		const { [Field.CURRENCY_A]: parsedAmountA } = parsedAmounts;
		if (!parsedAmountA || !currencyA || !deadline) {
			return;
		}

		const amountsMin = {
			[Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
		};

		let method: (...args: any) => Promise<TransactionResponse>, args: Array<string | string[] | number>;
		method = router.ZapIn;
		args = [];
		if (type && type.toLowerCase() === "curve") {
			args = [
				account,
				"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				pool.address, // token
				parsedAmountA.raw.toString(),
				amountsMin[Field.CURRENCY_A].toString(),
			];
		} else if (type && type.toLowerCase() === "balancer") {
			args = [
				"0x0000000000000000000000000000000000000000",
				pool.address,
				parsedAmountA.raw.toString(),
				amountsMin[Field.CURRENCY_A].toString(),
			];
		} else if (type && type.toLowerCase() === "yearn") {
			args = [
				account,
				pool.address,
				0,
				"0x0000000000000000000000000000000000000000",
				parsedAmountA.raw.toString(),
				amountsMin[Field.CURRENCY_A].toString(),
			];
		}

		setAttemptingTxn(true);

		const selectedGas = gasPrice.find((item) => item[0] === selectedGasPrice);
		let gasEstimatedPrice = 0;
		if (selectedGas) {
			gasEstimatedPrice = selectedGas[1] * 10 ** 9;
		}

		await method(...args, {
			gasLimit: 21000,
			gasPrice: gasEstimatedPrice,
		})
			.then((response) => {
				setAttemptingTxn(false);

				addTransaction(response, {
					summary:
						"Add " +
						parsedAmounts[Field.CURRENCY_A]?.toSignificant(3) +
						" " +
						currencies[Field.CURRENCY_A]?.symbol,
				});

				setTxHash(response.hash);
			})
			.catch((error) => {
				setAttemptingTxn(false);
				// we only care if the error is something _other_ than the user rejected the tx
				if (error?.code !== 4001) {
					console.error(error);
				}
			});
	}

	useEffect(() => {
		dispatch(getGasPrice());
	}, [dispatch]);

	const modalHeader = () => {
		return (
			<Styled.HeaderAutoColumn gap="20px">
				<div className={"d-flex align-items-center align-items-xl-end mt-4"}>
					<Styled.ConfirmationText marginRight={10}>
						{liquidityMinted?.toSignificant(6)}
					</Styled.ConfirmationText>
					<div className={"d-flex align-items-center"}>
						<PlatformLogo platform={type} name={pool?.poolName} size={36} />
					</div>
				</div>
				<Styled.HeaderCurrencyText>{pool?.poolName + " Pool Tokens"}</Styled.HeaderCurrencyText>
				<TYPE.Italic fontSize={12} textAlign="left" padding={"8px 0 0 0 "}>
					{`Output is estimated. If the price changes by more than ${
						allowedSlippage / 100
					}% your transaction will revert.`}
				</TYPE.Italic>
			</Styled.HeaderAutoColumn>
		);
	};

	const modalBottom = () => {
		return (
			<>
				<RowBetween>
					<TYPE.Body>{currencies[Field.CURRENCY_A]?.symbol} Input</TYPE.Body>
					<RowFixed>
						<CurrencyLogo currency={currencies[Field.CURRENCY_A]} size={24} />
					</RowFixed>
				</RowBetween>
				<RowBetween>
					<TYPE.Body>{pool?.poolName} Output</TYPE.Body>
					<RowFixed>
						<PlatformLogo platform={type} name={pool?.poolName} size={24} />
					</RowFixed>
				</RowBetween>
				<GradientButton className={""} style={{ margin: "20px 0 0 0" }} onClick={onAdd}>
					{noLiquidity ? "Create Pool & Supply" : "Confirm Supply"}
				</GradientButton>
			</>
		);
	};

	const hideModal = () => {
		dispatch(clearSelectedPool());
		history.push("/invest/pools");
	};

	const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
		currencies[Field.CURRENCY_A]?.symbol
	}`;

	const handleDismissConfirmation = useCallback(() => {
		setShowConfirm(false);
		// if there was a tx hash, we want to clear the input
		if (txHash) {
			onFieldAInput("");
		}
		setTxHash("");
	}, [onFieldAInput, txHash]);

	return (
		<Modal show={true} onHide={hideModal} backdropClassName={"backdrop"} centered={true} size="md">
			<Modal.Body style={{ padding: !showConfirm ? "30px" : "0" }}>
				{!account ? (
					<Row>
						<Col
							xs={12}
							className="d-flex align-items-center justify-content-center"
							style={{ padding: "80px 0 88px" }}
						>
							<GradientButton className={"btn-lg"} onClick={toggleWalletModal}>
								{t("wallet.connect")}
							</GradientButton>
						</Col>
					</Row>
				) : !showConfirm ? (
					<Row>
						<Col xs={12} className={"mb-3"}>
							<CurrencyInputPanel
								value={formattedAmounts[Field.CURRENCY_A]}
								onUserInput={onFieldAInput}
								onMax={() => {
									onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? "");
								}}
								disableCurrencySelect={true}
								showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
								currency={currencyA}
								label={t("token")}
								id="add-liquidity-input-tokena"
								showCommonBases
							/>
						</Col>
						<Col xs={12} className="mb-3">
							<LightCard padding={"0"} borderRadius={"12px"}>
								<PriceTopbar>{t("pools.selectedPool")}</PriceTopbar>

								<Styled.PlatformRow className={"px-4 pb-3"}>
									<PlatformLogo size={32} platform={type} name={pool?.poolName} />
									<Styled.PlatformTitle>{pool?.poolName}</Styled.PlatformTitle>
								</Styled.PlatformRow>
							</LightCard>
						</Col>

						<Col xs={12} className="mb-4">
							<LightCard>
								<PriceTopbar>{t("pools.selectGasSetting")}</PriceTopbar>
								<GasPricesContainer />
							</LightCard>
						</Col>

						<Col
							xs={12}
							className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center justify-content-center"
						>
							{!account ? (
								<Button
									style={{ minWidth: 250 }}
									variant={"outline-primary"}
									disabled
									className="py-3 font-size-lg font-weight-bolder"
								>
									{t("wallet.connect")}
								</Button>
							) : (
								<Button
									style={{ minWidth: 250 }}
									onClick={() => {
										setShowConfirm(true);
									}}
									disabled={
										!parsedAmounts[Field.CURRENCY_A] ||
										Number(maxAmounts[Field.CURRENCY_A]?.toSignificant(6)) <
											Number(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6))
									}
									variant={
										!parsedAmounts[Field.CURRENCY_A] ||
										Number(maxAmounts[Field.CURRENCY_A]?.toSignificant(6)) <
											Number(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6))
											? "outline-primary"
											: "primary"
									}
									className={`${
										!!parsedAmounts[Field.CURRENCY_A] ||
										Number(maxAmounts[Field.CURRENCY_A]?.toSignificant(6)) >=
											Number(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6))
											? "outline-primary"
											: ""
									} py-3`}
								>
									<span className="font-weight-bold font-size-lg">
										{!parsedAmounts[Field.CURRENCY_A]
											? "Please Enter Amount"
											: Number(maxAmounts[Field.CURRENCY_A]?.toSignificant(6)) <
											  Number(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6))
											? t("insufficientBalance")
											: t("pools.supply")}
									</span>
								</Button>
							)}
						</Col>
					</Row>
				) : attemptingTxn ? (
					<ConfirmationPendingContent onDismiss={handleDismissConfirmation} pendingText={pendingText} />
				) : txHash ? (
					<TransactionSubmittedContent hash={txHash} onDismiss={handleDismissConfirmation} />
				) : (
					<ConfirmationModalContent
						title={noLiquidity ? t("pools.creatingPool") : t("pools.willReceive")}
						onDismiss={handleDismissConfirmation}
						topContent={modalHeader}
						bottomContent={modalBottom}
					/>
				)}
			</Modal.Body>
		</Modal>
	);
}
