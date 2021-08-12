import { PureSwapHeader } from "./SwapHeader";
import { useModalOpen, useToggleTrxSettingsMenu } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import { useUserSlippageTolerance, useUserTransactionTTL } from "../../state/user/hooks";

const SwapHeader = () => {
	const open = useModalOpen(ApplicationModal.TRXSETTINGS);
	const toggle = useToggleTrxSettingsMenu();
	const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance();
	const [ttl, setTtl] = useUserTransactionTTL();

	return (
		<PureSwapHeader
			open={open}
			onOpenMenu={toggle}
			slippageTolerance={userSlippageTolerance}
			deadline={ttl}
			onSetSlippage={setUserslippageTolerance}
			onSetDeadline={setTtl}
		/>
	);
};

export default SwapHeader;
