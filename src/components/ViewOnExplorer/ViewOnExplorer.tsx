import { Button } from "react-bootstrap";
import { ExternalLink } from "react-feather";
import { getExplorerLink } from "../../utils/explorer";

export type PureViewOnExplorerProps = {
	address: string;
	chainId: number;
};

export const PureViewOnExplorer = ({ address, chainId }: PureViewOnExplorerProps) => {
	return (
		<Button
			as="a"
			href={getExplorerLink(chainId, address, "address")}
			target="_blank"
			rel="noreferrer noopener"
			variant="light"
			className={"d-inline-flex gap-2 flex-nowrap align-items-center"}
		>
			<ExternalLink size={24} />
			<span>View on explorer</span>
		</Button>
	);
};
