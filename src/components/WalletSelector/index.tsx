import { PureWalletSelector } from "./WalletSelector";
import { SUPPORTED_WALLETS } from "../../connectors";

const WalletSelector = () => {
	const wallets = Object.keys(SUPPORTED_WALLETS).map((key) => {
		return SUPPORTED_WALLETS[key];
	});

	return <PureWalletSelector wallets={wallets} />;
};

export default WalletSelector;
