import { useHistory } from "react-router-dom";
import { PureHero } from "./Hero";
import { useActiveWeb3React } from "../../hooks";
import { useWalletModalToggle } from "../../state/application/hooks";
import { ROUTE_DASHBOARD } from "../../constants/routes";

const Hero = () => {
	const toggleConnectModal = useWalletModalToggle();
	const { account } = useActiveWeb3React();
	const history = useHistory();

	const onCallToAction = () => {
		if (account) {
			history.push(ROUTE_DASHBOARD);
		} else {
			toggleConnectModal();
		}
	};

	return <PureHero connected={!!account} onCallToAction={onCallToAction} />;
};

export default Hero;
