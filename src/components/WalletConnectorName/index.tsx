import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { SUPPORTED_WALLETS, injected } from "../../connectors";
import { PureWalletConnectorName } from "./WalletConnectorName";

const WalletConnectorName = () => {
	const { connector } = useActiveWeb3React();

	function getConnectorName() {
		const { ethereum } = window;
		const isMetaMask = !!(ethereum && ethereum.isMetaMask);
		const name = Object.keys(SUPPORTED_WALLETS)
			.filter(
				(k) =>
					SUPPORTED_WALLETS[k].connector === connector &&
					(connector !== injected || isMetaMask === (k === "metamask"))
			)
			.map((k) => SUPPORTED_WALLETS[k].name)[0];
		return name;
	}

	return <PureWalletConnectorName name={getConnectorName()} />;
};

export default WalletConnectorName;
