import { useTranslation } from "react-i18next";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { PureDisconnectAccount } from "./DisconnectAccount";

const DisconnectAccount = () => {
	const { account, deactivate } = useActiveWeb3React();
	const { t } = useTranslation();

	const onLogout = () => {
		if (account) {
			deactivate();
		}
	};

	return <PureDisconnectAccount label={t("menu.disconnect")} onLogout={onLogout} />;
};

export default DisconnectAccount;
