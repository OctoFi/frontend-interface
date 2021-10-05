import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BootstrapTable from "react-bootstrap-table-next";
import { BigNumber } from "@0x/utils";
import { Token } from "@uniswap/sdk";

import { sortedData } from "../../../lib/helper";
import useTheme from "../../../hooks/useTheme";
import { useActiveWeb3React } from "../../../hooks";
import { getAaveCurrency, getAaveLoadingState, getATokensData, getTokensPrice } from "../../../state/selectors";
// import { setAaveCurrency } from "../../../state/aave/actions";
import { startLendingTokenSteps, startUnLendingTokenSteps } from "../../../state/spotUI/actions";
import { getKnownTokens, isWethToken } from "../../../utils/known_tokens";
import { tokenAmountInUnits } from "../../../utils/spot/tokens";
import { Protocol } from "../../../utils/aave/types";
import withBalance from "../../../components/hoc/withBalance";
import CurrencyLogo from "../../../components/Logo/CurrencyLogo";
import ResponsiveTable from "../../../components/ResponsiveTable";
import LendingModalContainer from "../LendingModalContainer";
import * as StyledParent from "../styleds";
import * as Styled from "./styleds";

export interface LendingBalanceProps {
	tokensBalance: any;
	ethBalance: any;
	totalEthBalance: any;
	wethBalance: any;
}

const LendingBalance = ({ tokensBalance, ethBalance, totalEthBalance, wethBalance }: LendingBalanceProps) => {
	const theme = useTheme();
	const [isEthState, setIsEthState] = useState(false);
	const [isHideZeroBalance, setIsHideZeroBalance] = useState(false);
	const [isStableCoin, setIsStableCoin] = useState(false);
	const [isModalOpenState, setIsModalOpenState] = useState(false);
	const [isSubmittingState, setIsSubmittingState] = useState(false);
	const [aTokenDataState, setATokenDataState] = useState();
	const [isLendingState, setIsLendingState] = useState(true);
	const [tokenBalanceState, setTokenBalanceState] = useState();
	const [sort, setSort] = useState({
		field: false,
		order: "desc",
	});
	const { t } = useTranslation();

	const { account } = useActiveWeb3React();
	const dispatch = useDispatch();
	const aTokensData = useSelector(getATokensData);
	const tokensPrice = useSelector(getTokensPrice);
	const tokenBalances = tokensBalance;
	const ethTotalBalance = totalEthBalance;
	const wethTokenBalance = wethBalance;
	// const aaveLoadingState = useSelector(getAaveLoadingState);
	const currencySelector = useSelector(getAaveCurrency);

	// const innerTabs = [
	// 	{
	// 		active: currencySelector === "NATIVE",
	// 		onClick: () => dispatch(setAaveCurrency("NATIVE")),
	// 		text: "Native",
	// 	},
	// 	{
	// 		active: currencySelector === "USD",
	// 		onClick: () => dispatch(setAaveCurrency("USD")),
	// 		text: "USD",
	// 	},
	// ];

	const openLendingModal = (...rest: any) => {
		const [tokenD, isEthToken, tokB, token] = rest;
		setATokenDataState(tokenD);
		setIsModalOpenState(true);
		if (isEthToken) {
			setIsEthState(true);
			setTokenBalanceState({ ...wethTokenBalance, balance: tokB });
		} else {
			setIsEthState(false);
			setTokenBalanceState(tokenBalances.find((tb: any) => tb.token === token));
		}
		setIsLendingState(true);
	};

	const openUnLendingModal = (...rest: any) => {
		const [tokenD, isEthToken, tokB, token] = rest;
		setATokenDataState(tokenD);
		if (isEthToken) {
			setIsEthState(true);
			setTokenBalanceState({ ...wethTokenBalance, balance: tokB });
		} else {
			setIsEthState(false);
			setTokenBalanceState(tokenBalances.find((tb: any) => tb.token === token));
		}
		setIsModalOpenState(true);
		setIsLendingState(false);
	};

	const tokensRow = useMemo(() => {
		const data = aTokensData.map((tokenD: any) => {
			const { token, balance } = tokenD;

			const { symbol } = token;
			const isEthToken = isWethToken(token);
			const tokenBalance = tokenBalances.find((tb: any) => tb.token.symbol === symbol);
			if (isHideZeroBalance) {
				if (isEthToken && ethTotalBalance.isEqualTo(0) && balance && balance.isEqualTo(0)) {
					return null;
				}

				if (tokenBalance && tokenBalance.balance.isEqualTo(0) && balance && balance.isEqualTo(0)) {
					return null;
				}
			}
			if (isStableCoin) {
				if (!token.isStableCoin) {
					return null;
				}
			}

			const tokB = isEthToken
				? ethTotalBalance || new BigNumber(0)
				: (tokenBalance && tokenBalance.balance) || new BigNumber(0);
			let displayBalance;
			let displayDepositBalance;

			if (account && balance) {
				const formattedLendBalance = tokenAmountInUnits(balance, token.decimals, token.displayDecimals);
				const formattedBalance = tokenAmountInUnits(tokB, token.decimals, token.displayDecimals);
				const tokenPrice = tokensPrice && tokensPrice.find((t: any) => t.c_id === token.c_id);
				if (currencySelector === "NATIVE") {
					displayBalance = Number(formattedBalance);
					displayDepositBalance = Number(formattedLendBalance);
				} else {
					displayBalance = tokenPrice
						? tokenPrice.price_usd.multipliedBy(new BigNumber(formattedBalance)).toNumber()
						: "-";
					displayDepositBalance = tokenPrice
						? tokenPrice.price_usd.multipliedBy(new BigNumber(formattedLendBalance)).toNumber()
						: "-";
				}
			} else {
				displayBalance = "-";
				displayDepositBalance = "-";
			}

			const apy = tokenD.liquidityRate.dividedBy("1e27").multipliedBy(100).toNumber();

			const tokenName = isEthToken ? "Ethereum" : token.name;
			const tokenSymbol = isEthToken ? "ETH" : token.symbol.toUpperCase();

			return {
				token,
				symbol,
				tokenSymbol,
				tokenName,
				displayBalance,
				displayDepositBalance,
				apy,
				balance,
				tokB,
				isEthToken,
				tokenD,
			};
		});

		return sortedData(data, sort);
	}, [aTokensData, sort]);

	const closeModal = () => {
		setIsModalOpenState(false);
	};

	const handleSubmit = async (amount: any, token: any, aToken: any, isEth: any, isLending: any) => {
		setIsSubmittingState(true);

		try {
			if (isLending) {
				await dispatch(
					startLendingTokenSteps(
						amount,
						token,
						aToken,
						isEth,
						Protocol.Aave,
						ethBalance,
						wethTokenBalance,
						ethTotalBalance
					)
				);
			} else {
				await dispatch(startUnLendingTokenSteps(amount, token, aToken, isEth));
			}
		} finally {
			setIsSubmittingState(false);
			closeModal();
		}
	};

	const wethToken = getKnownTokens().getWethToken();
	// const onHideZeroBalance = () => {
	// 	setIsHideZeroBalance(!isHideZeroBalance);
	// };
	// const onIsStableCoin = () => {
	// 	setIsStableCoin(!isStableCoin);
	// };

	const wethPlusEthBalance = wethTokenBalance ? wethTokenBalance.balance.plus(ethBalance) : new BigNumber(0);

	const onTableChange = (type?: string, context?: any) => {
		if (type === "sort") {
			setSort({
				field: context.sortField,
				order: context.sortOrder,
			});
		}
	};

	const columns = [
		{
			dataField: "tokenName",
			text: t("token"),
			formatter: (cellContent: any, row: any, rowIndex: any) => {
				const currency = new Token(1, row.token.address, row.token.decimals, row.token.symbol, row.token.name);
				return (
					<div
						key={rowIndex}
						className="d-flex flex-row-reverse flex-lg-row align-items-start align-items-lg-center py-lg-2 pr-lg-4"
					>
						<Styled.LogoContainer>
							<CurrencyLogo currency={currency} />
						</Styled.LogoContainer>
						<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
							<Styled.Symbol>{row.tokenSymbol}</Styled.Symbol>
							<Styled.Name>{row.tokenName}</Styled.Name>
						</div>
					</div>
				);
			},
			sort: true,
		},
		{
			dataField: "displayBalance",
			text: t("borrow.balance"),
			formatter: (cellContent: any, row: any, rowIndex: any) => {
				return (
					<Styled.CellText>
						{typeof row.displayBalance === "number"
							? `${row.displayBalance} ${row.tokenSymbol}`
							: row.displayBalance}
					</Styled.CellText>
				);
			},
			sort: true,
		},
		{
			dataField: "displayDepositBalance",
			text: t("borrow.depositBalance"),
			formatter: (cellContent: any, row: any, rowIndex: any) => {
				return (
					<Styled.CellText>
						{typeof row.displayDepositBalance === "number"
							? `${row.displayDepositBalance} ${row.tokenSymbol}`
							: row.displayDepositBalance}
					</Styled.CellText>
				);
			},
			sort: true,
		},
		{
			dataField: "apy",
			text: "APY",
			formatter: (cellContent: any, row: any, rowIndex: any) => {
				return <Styled.CellText>{row.apy.toFixed(6)} %</Styled.CellText>;
			},
			sort: true,
		},
		{
			dataField: "actions",
			text: t("table.actions"),
			formatter: (cellContent: any, row: any, rowIndex: any, { openLendingModal, openUnLendingModal }) => {
				const { balance, tokB, tokenD, isEthToken, token } = row;
				return (
					<div className="d-flex align-items-stretch justify-content-center flex-column flex-lg-row align-items-lg-center justify-content-lg-start w-100">
						<StyledParent.TradeButton
							onClick={openLendingModal.bind(this, tokenD, isEthToken, tokB, token)}
							disabled={tokB.isEqualTo(0)}
						>
							{t("deposit")}
						</StyledParent.TradeButton>

						<StyledParent.TradeButton
							variant={theme.warning}
							onClick={openUnLendingModal.bind(this, tokenD, isEthToken, tokB, token)}
							disabled={balance && balance.isEqualTo(0)}
						>
							{t("withdraw")}
						</StyledParent.TradeButton>
					</div>
				);
			},
			isAction: true,
			formatExtraData: {
				openLendingModal,
				openUnLendingModal,
			},
		},
	];

	return (
		<div className="d-flex flex-column">
			<StyledParent.BorrowTableWrap>
				<BootstrapTable
					wrapperClasses="table-responsive d-none d-lg-block"
					bordered={false}
					classes="table table-head-custom table-borderless table-vertical-center overflow-hidden"
					bootstrap4
					remote
					keyField="id"
					data={tokensRow}
					columns={columns}
					onTableChange={onTableChange}
				></BootstrapTable>
			</StyledParent.BorrowTableWrap>
			<ResponsiveTable breakpoint={"lg"} columns={columns} data={tokensRow} direction={"rtl"} />

			{isModalOpenState && aTokenDataState && (
				<LendingModalContainer
					show={isModalOpenState}
					tokenBalance={tokenBalanceState}
					isSubmitting={isSubmittingState}
					onSubmit={handleSubmit}
					aToken={aTokenDataState}
					closeModal={closeModal}
					ethBalance={wethPlusEthBalance}
					isEth={isEthState}
					wethToken={wethToken}
					isLending={isLendingState}
				/>
			)}
		</div>
	);
};

export default withBalance(LendingBalance);
