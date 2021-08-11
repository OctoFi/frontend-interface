import { Button } from "react-bootstrap";
import { ExternalLink } from "react-feather";
import { getExplorerLink } from "../../utils/explorer";

export type PureViewOnExplorerProps = {
	chainId?: number;
	value?: string;
	type?: "transaction" | "token" | "address" | "block" | "default";
	label?: string;
};

export const PureViewOnExplorer = ({ chainId = 1, value = "", type = "default", label }: PureViewOnExplorerProps) => {
	return (
		<Button
			as="a"
			href={getExplorerLink(chainId, value, type)}
			target="_blank"
			rel="noreferrer noopener"
			variant="light"
			className="d-inline-flex gap-2 flex-nowrap align-items-center"
		>
			<ExternalLink size={24} />
			{label && <span>{label}</span>}
		</Button>
	);
};
