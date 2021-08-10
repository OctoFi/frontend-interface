// import { useBetaMessageManager } from "../../contexts/LocalStorage";
import { PureWarningTip } from "./WarningTip";

const WarningTip = () => {
	// TODO: fix state
	// const [showBetaMessage, dismissBetaMessage] = useBetaMessageManager();
	const showBetaMessage = true;
	const dismissBetaMessage = () => alert("dismiss");

	return (
		<PureWarningTip
			message={"This project is in Beta. Use at your own risk."}
			show={showBetaMessage}
			onDismiss={dismissBetaMessage}
		/>
	);
};

export default WarningTip;
