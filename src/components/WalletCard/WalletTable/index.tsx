import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useActiveWeb3React } from "../../../hooks";
import { AppState } from "../../../state";
import { useMemoTokenBalances } from "../../../state/balances/hooks";
import { fetchBalances, fetchTransformedBalances } from "../../../state/balances/actions";
import { PureWalletTable } from "./WalletTable";

export interface WalletTableProps {
	query?: string;
}

const WalletTable = ({ query = "" }: WalletTableProps) => {
	const { account } = useActiveWeb3React();
	const dispatch = useDispatch();
	const overview = useSelector((state: AppState) => state.balances.overview);
	const balances = useSelector((state: AppState) => state.balances.data);
	const loading = useSelector((state: AppState) => state.balances.loading);
	const { ETH } = useSelector((state: AppState) => state.currency.currenciesRate);
	const walletBalances = useMemoTokenBalances();

	useEffect(() => {
		if (account) {
			dispatch(fetchBalances(account));
		}
	}, [account]);

	useEffect(() => {
		dispatch(fetchTransformedBalances(balances, walletBalances, ETH));
	}, [balances, ETH]);

	let filteredTokensData = useMemo(() => {
		let tokensData = overview.wallet.balances || [];
		if (query === "") {
			return tokensData;
		} else {
			const lowerQuery = query.toLowerCase();
			return tokensData.filter((token) => JSON.stringify(token.metadata).toLowerCase().includes(lowerQuery));
		}
	}, [overview.wallet.balances, query]);

	return <PureWalletTable data={filteredTokensData} loading={loading} />;
};

export default WalletTable;
