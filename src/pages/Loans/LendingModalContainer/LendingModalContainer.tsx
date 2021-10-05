import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { BigNumber } from "@0x/utils";

import { TX_DEFAULTS_TRANSFER } from "../../../constants";
import useTheme from "../../../hooks/useTheme";
import { tokenAmountInUnits, tokenSymbolToDisplayString } from "../../../utils/spot/tokens";
import BorrowInputPanel from "../../../components/BorrowInputPanel";
import { AutoColumn } from "../../../components/Column";
import { Modal } from "../../../components/Modal/bootstrap";
import { RowFixed } from "../../../components/Row";
import * as Styled from "./styleds";

export interface LendingModalContainerProps {
	tokenBalance: any;
	ethBalance: any;
	isEth: any;
	wethToken: any;
	aToken: any;
	isLending: any;
	show: any;
	onSubmit: any;
}

export const LendingModalContainer = ({
	tokenBalance,
	ethBalance,
	isEth,
	wethToken,
	aToken,
	isLending,
	show,
	onSubmit,
	...restProps
}: LendingModalContainerProps) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState({
		btnMsg: "",
		cardMsg: "",
	});

	const { liquidityRate } = aToken;
	let coinSymbol;
	let maxBalance;
	let decimals;
	let displayDecimals;

	if (isEth) {
		displayDecimals = wethToken.displayDecimals;
		decimals = 18;
		maxBalance = isLending ? ethBalance : aToken.balance || new BigNumber(0);
		coinSymbol = tokenSymbolToDisplayString("ETH");
	} else if (tokenBalance) {
		const { token, balance } = tokenBalance;
		displayDecimals = token.displayDecimals;
		decimals = token.decimals;
		maxBalance = isLending ? balance : aToken.balance || new BigNumber(0);
		coinSymbol = tokenSymbolToDisplayString(token.symbol);
	}

	const { token } = tokenBalance;
	const btnPrefix = isLending ? "Deposit " : "Withdraw ";
	const balanceInUnits = tokenAmountInUnits(maxBalance, decimals, displayDecimals);
	const btnText = error && error.btnMsg ? "Error" : btnPrefix + coinSymbol;
	const isSubmitAllowed = amount === null || (amount && amount.isGreaterThan(maxBalance));

	useEffect(() => {
		if (ethBalance.isLessThan(TX_DEFAULTS_TRANSFER.gasTransferToken)) {
			toast.error(t("errors.notEnoughGas"));
			setError({
				btnMsg: "Error",
				cardMsg: t("errors.notEnoughGas"),
			});
		}
	}, [ethBalance]);

	const onInternalSubmit = async () => {
		let token;
		if (isEth) {
			token = {
				...wethToken,
				symbol: "ETH",
			};
		} else if (tokenBalance) {
			token = tokenBalance.token;
		} else {
			return null;
		}
		const amt = amount || new BigNumber(0);
		onSubmit(amt, token, aToken, isEth, isLending);
	};

	const closeModal = () => {
		setAmount(0);
	};

	const setMax = () => {
		if (isEth) {
			const maxBalance = isLending ? ethBalance : aToken.balance || new BigNumber(0);
			setAmount(maxBalance);
		} else if (tokenBalance) {
			const val = isLending ? tokenBalance.balance : aToken.balance || new BigNumber(0);
			setAmount(val);
		}
	};

	const onUpdateAmount = (newValue: number) => {
		setAmount(newValue);
	};

	return (
		<Modal show={show} onHide={closeModal} centered>
			<Modal.Body className="p-4">
				<div>
					<Styled.Title>
						{isLending ? t("Deposit") : t("withdraw")} {coinSymbol}
					</Styled.Title>
				</div>
				<div>
					<BorrowInputPanel
						decimals={decimals}
						min={0}
						max={maxBalance}
						onUserInput={onUpdateAmount}
						value={amount}
						token={token}
						selected={coinSymbol}
						showBalance={false}
						label={isLending ? t("wantToDeposit") : t("wantToWithdraw")}
						placeholder={new BigNumber(1).div(new BigNumber(10).pow(displayDecimals)).toString()}
						valueFixedDecimals={displayDecimals}
					/>
				</div>

				<div className="mb-5">
					<AutoColumn>
						<Styled.SummaryRow>
							<RowFixed>
								<Styled.TypeBlack fontWeight={500} color={theme.text1}>
									{t("interestAPR")}
								</Styled.TypeBlack>
							</RowFixed>
							<RowFixed>
								<Styled.TypeBlack color={theme.text1} fontWeight={500}>
									{liquidityRate.div("1e27").multipliedBy(100).toFixed(5)} %
								</Styled.TypeBlack>
							</RowFixed>
						</Styled.SummaryRow>
						<Styled.SummaryRow>
							<RowFixed>
								<Styled.TypeBlack fontWeight={500} color={theme.text1}>
									{t("amount")}
								</Styled.TypeBlack>
							</RowFixed>
							<RowFixed>
								<Styled.TypeBlack color={theme.text1} fontWeight={500}>
									{balanceInUnits}
								</Styled.TypeBlack>
							</RowFixed>
						</Styled.SummaryRow>
					</AutoColumn>
				</div>

				<div className="d-flex align-items-stretch align-items-lg-center justify-content-center flex-column">
					<Styled.CustomButton
						className={`btn btn-${isLending ? "primary" : "warning"}`}
						disabled={isSubmitAllowed}
						onClick={onInternalSubmit}
					>
						{btnText}
					</Styled.CustomButton>
				</div>
			</Modal.Body>
		</Modal>
	);
};
