import { PureGovernanceSpaceItem } from "./GovernanceSpaceItem";
import { useLogo } from "../../state/governance/hooks";

export type SnapshotSpaceProps = {
	name: string;
	symbol: string;
	network: string;
};

export type GovernanceSpaceItemProps = {
	space: SnapshotSpaceProps;
	id: string;
	symbolIndex: string;
	pinned?: boolean;
	loading?: boolean;
};

const GovernanceSpaceItem = ({ space, id, pinned = false, symbolIndex, loading = false }: GovernanceSpaceItemProps) => {
	const LogoURL = useLogo(id, symbolIndex);

	return (
		<PureGovernanceSpaceItem
			id={id}
			space={space}
			pinned={pinned}
			loading={loading}
			to={`/governance/${id}`}
			logo={LogoURL}
		/>
	);
};

export default GovernanceSpaceItem;
