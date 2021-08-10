// import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
// import useENSName from "../../hooks/useENSName";
import { PureViewOnExplorer } from "./ViewOnExplorer";

const ViewOnExplorer = () => {
	// const { chainId, account } = useActiveWeb3React();
	// const { ENSName } = useENSName(account ?? undefined);
	// TODO: replace hardcoded values
	const account = "0x73F29805198cCE93015bC960F47885CF6268ce85";
	const ENSName = false;
	const chainId = 1;

	return <PureViewOnExplorer address={ENSName ? ENSName : account} chainId={chainId} />;
};

export default ViewOnExplorer;
