import { WalletTable } from "./WalletTable";
export default WalletTable;

// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Skeleton from "react-loading-skeleton";
// import toast from "react-hot-toast";
// import Web3 from "web3";
// import { Web3Wrapper } from "@0x/web3-wrapper";
// import { ERC20TokenContract } from "@0x/contract-wrappers";

// import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from "../../constants";
// import { useActiveWeb3React } from "../../hooks";
// import useTheme from "../../hooks/useTheme";
// import { getContractWrappers } from "../../utils/spot/contractWrapper";
// import { useMemoTokenBalances } from "../../state/balances/hooks";
// import { fetchBalances, fetchTransformedBalances } from "../../state/balances/actions";

// import CurrencyLogo from "../Logo/CurrencyLogo";
// import CurrencyText from "../CurrencyText";
// import WalletTable from "./WalletTable";

// let web3;
// let web3Wrapper;

// const theme = useTheme();
// const { account } = useActiveWeb3React();
// const [done, setDone] = useState(false);
// const overview = useSelector((state: AppState) => state.balances.overview);
// const balances = useSelector((state: AppState) => state.balances.data);
// const { ETH } = useSelector((state: AppState) => state.currency.currenciesRate);
// const dispatch = useDispatch();
// const walletBalances = useMemoTokenBalances();

// useEffect(() => {
// 	if (account) {
// 		dispatch(fetchBalances(account));
// 	}
// }, [account, dispatch]);

// useEffect(() => {
// 	dispatch(fetchTransformedBalances(balances, walletBalances, ETH));
// }, [balances, walletBalances, ETH, dispatch]);

// useEffect(() => {
// 	web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL));
// 	if (web3.currentProvider) {
// 		web3Wrapper = new Web3Wrapper(web3.currentProvider);
// 	}
// }, []);

// let tokensData = overview.wallet.balances || [];

// let filteredTokensData = useMemo(() => {
// 	if (query === "") {
// 		return tokensData;
// 	} else {
// 		const lowerQuery = query.toLowerCase();
// 		return tokensData.filter((token) => JSON.stringify(token.metadata).toLowerCase().includes(lowerQuery));
// 	}
// }, [tokensData, query]);

// const TokensColumns = [
// 	{
// 		dataField: "token",
// 		text: t("token"),
// 		formatter: (cellContent: any, row: any) => {
// 			const isLoading = row.loading || false;
// 			return (
// 				<div className="d-flex align-items-center flex-row-reverse flex-lg-row">
// 					<Styled.LogoContainer>
// 						{isLoading ? (
// 							<Skeleton width={"100%"} height={"100%"} circle />
// 						) : (
// 							<CurrencyLogo currency={row.metadata} />
// 						)}
// 					</Styled.LogoContainer>
// 					<span>
// 						{isLoading ? <Skeleton width={48} height={24} /> : row.metadata.symbol}
// 					</span>
// 				</div>
// 			);
// 		},
// 	},
// 	{
// 		dataField: "balance",
// 		text: t("balanceTitle"),
// 		formatter: (cellContent: any, row: any) => {
// 			const isLoading = row.loading || false;
// 			return (
// 				<div>
// 					{isLoading ? (
// 						<Skeleton width={80} height={24} />
// 					) : (
// 						<span>{row.balance ? row.balance.toSignificant(6) : 0}</span>
// 					)}
// 				</div>
// 			);
// 		},
// 	},
// 	{
// 		dataField: "value",
// 		text: t("totalValue"),
// 		formatter: (cellContent: any, row: any) => {
// 			const isLoading = row.loading || false;
// 			return (
// 				<div>
// 					{isLoading ? (
// 						<div className={"d-flex align-items-center"}>
// 							<Skeleton width={24} height={24} className={"mr-2"} />
// 							<Skeleton width={80} height={24} />
// 						</div>
// 					) : (
// 						<span>
// 							<CurrencyText value={row.balanceUSD} />
// 						</span>
// 					)}
// 				</div>
// 			);
// 		},
// 	},
// 	{
// 		dataField: "action",
// 		text: t("table.actions"),
// 		formatter: (cellContent: any, row: any, rowIndex: number) => {
// 			const isLoading = row.loading || false;
// 			// const value = row.balanceUSD * (currenciesRate["BTC"] || 1);
// 			return (
// 				<div className="d-flex align-items-stretch justify-content-end flex-column flex-lg-row align-items-lg-center w-100">
// 					{isLoading ? (
// 						<div className={"d-flex align-items-center"}>
// 							<Skeleton width={70} height={40} count={3} className={"mr-lg-4 mb-2 mb-lg-0"} />
// 						</div>
// 					) : (
// 						<>
// 							<Styled.TradeButton
// 								href={`/#/exchange?outputCurrency=${
// 									row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
// 								}`}
// 							>
// 								{t("buttons.buy")}
// 							</Styled.TradeButton>

// 							<Styled.TradeButton
// 								href={`/#/exchange?inputCurrency=${
// 									row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
// 								}`}
// 								variant={theme.secondary}
// 							>
// 								{t("buttons.sell")}
// 							</Styled.TradeButton>

// 							{/* {value <= 0.001 ? (
// 								<Styled.TradeButton
// 									href={`/#/exchange?inputCurrency=${
// 										row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
// 									}&outputCurrency=0x7240aC91f01233BaAf8b064248E80feaA5912BA3`}
// 									disabled
// 									variant={theme.tertiary}>
// 										{t("buttons.convertTo", { symbol: "OCTO" })}
// 									</Styled.TradeButton>
// 							) : (
// 								<Styled.TradeButton variant={theme.tertiary} disabled={true}>
// 									{t("buttons.convertTo", { symbol: "OCTO" })}
// 								</Styled.TradeButton>
// 							)} */}
// 						</>
// 					)}
// 				</div>
// 			);
// 		},
// 		isAction: true,
// 	},
// ];

// const onClickToken = (token) => {
// 	if (token.metadata.symbol === "ETH") {
// 		history.push("/coins/ethereum");
// 	} else {
// 		history.push(`/coins/${token.metadata.address}`);
// 	}
// };
