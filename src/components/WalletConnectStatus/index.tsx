import { PureWalletConnectStatus } from "./WalletConnectStatus";
import { useActiveWeb3React } from "../../hooks";

const WalletConnectStatus = () => {
	const { account } = useActiveWeb3React();

	return <PureWalletConnectStatus account={account} />;
};

export default WalletConnectStatus;
