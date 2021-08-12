// Formerly AccountDetails/Transaction
import { PureTransaction } from "./Transaction";

import React from "react";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { getExplorerLink } from "../../utils/explorer";
import { useAllTransactions } from "../../state/transactions/hooks";

export const Transaction = ({ hash }: { hash: string }) => {
	const { chainId } = useActiveWeb3React();
	const allTransactions = useAllTransactions();
	const tx = allTransactions?.[hash];
	const summary = tx?.summary;
	const pending = !tx?.receipt;
	const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");

	if (!chainId) return null;

	return (
		<PureTransaction
			url={getExplorerLink(chainId, hash, "transaction")}
			pending={pending}
			success={success}
			label={summary ?? hash}
		/>
	);
};

export default Transaction;
