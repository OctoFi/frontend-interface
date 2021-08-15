import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";
// @ts-ignore
import TransakSDK from "@transak/transak-sdk";

import { useActiveWeb3React } from "../../hooks";
import useTheme from "../../hooks/useTheme";

export const TransakButton = () => {
	const { account } = useActiveWeb3React();
	const { t } = useTranslation();
	const theme = useTheme();

	const onTransakInit = () => {
		let transak = new TransakSDK({
			apiKey: process.env.REACT_APP_TRANSAK_API_KEY,
			environment: process.env.REACT_APP_TRANSAK_ENVIRONMENT,
			walletAddress: account || "",
			themeColor: theme.primary,
			hostURL: window.location.origin,
			widgetHeight: "650px",
			widgetWidth: "500px",
			defaultCryptoCurrency: "ETH",
		});

		transak.init();

		transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, () => {
			toast.success("Your Purchase was completed Successfully!");
			transak.close();
		});
		transak.on(transak.EVENTS.ORDER_COMPLETED, () => {
			toast.success("Your Purchase was completed Successfully!");
			transak.close();
		});
		transak.on(transak.EVENTS.TRANSAK_ORDER_CANCELLED, () => {
			toast.error("You Canceled the Purchase. Maybe next time!");
			transak.close();
		});
		transak.on(transak.EVENTS.TRANSAK_ORDER_FAILED, () => {
			toast.error("Your order failed. Please try again later.");
			transak.close();
		});
		transak.on(transak.EVENTS.ORDER_FAILED, () => {
			toast.error("The order process failed. Please try again later.");
			transak.close();
		});
	};

	return (
		<Button onClick={onTransakInit} size="lg">
			{t("fiatOn.buyButton")}
		</Button>
	);
};
