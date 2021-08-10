import { ExternalLink } from "react-feather";
import { getExplorerLink } from "../../utils/explorer";
import * as Styled from "./styleds";

export type PureViewOnExplorerProps = {
	address: string;
	chainId: number;
};

export const PureViewOnExplorer = ({ address, chainId }: PureViewOnExplorerProps) => {
	return (
		<Styled.ExplorerLink
			href={getExplorerLink(chainId, address, "address")}
			target="_blank"
			rel="noreferrer noopener"
		>
			<ExternalLink size={20} />
			<span>View on explorer</span>
		</Styled.ExplorerLink>
	);
};
