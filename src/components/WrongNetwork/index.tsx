// import { useWalletModalToggle } from "../../state/application/hooks";
import { PureWrongNetwork } from "./WrongNetwork";

const WrongNetwork = () => {
	// const toggleWalletModal = useWalletModalToggle();
	// TODO: add action
	const toggleWalletModal = () => {
		alert("Coming Soon");
	};

	return (
		<PureWrongNetwork
			title={"Wrong Network"}
			message={"Please connect to the Ethereum network to continue."}
			label={"Change Network"}
			onChangeNetwork={toggleWalletModal}
		/>
	);
};

export default WrongNetwork;
