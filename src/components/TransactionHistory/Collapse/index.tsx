import { useMemo } from "react";
import { useActiveWeb3React } from "../../../hooks";
import { PureCollapse } from "./Collapse";

export interface CollapseProps {
	txn?: any;
	ti?: number;
}

const Collapse = ({ txn, ti }: CollapseProps) => {
	const { chainId, account } = useActiveWeb3React();

	let tokens = useMemo(() => {
		let from: Array<any> = [],
			to: Array<any> = [],
			ref = null;
		txn.forEach((txnPart: any) => {
			if (txnPart.from === account?.toLowerCase()) {
				from.push(txnPart);
			} else if (txnPart.to === account?.toLowerCase()) {
				to.push(txnPart);
			}
			ref = txnPart;
		});
		return {
			from,
			to,
			ref,
		};
	}, [txn, account]);

	return <PureCollapse eventKey={`accordion-${ti}`} tokens={tokens} chainId={chainId} txn={txn} />;
};

export default Collapse;
