import { useTranslation } from "react-i18next";
import Page from "../../components/Page";
import CurrencyDropdown from "../../components/CurrencyDropdown";
import GasIndicator from "../../components/GasIndicator";
// import GasPricesDropdown from "../../components/GasPricesDropdown";
import ThemeToggle from "../../components/ThemeToggle";

export const PureSettings = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("settings")}>
			<p className="mt-3 mb-2">Set your preferred transaction speed.</p>
			<GasIndicator gas="45" />
			{/* <GasPricesDropdown /> */}
			<p className="mt-3 mb-2">Toggle between light and dark themes.</p>
			<ThemeToggle />
			<p className="mt-3 mb-2">Set the displayed currency format.</p>
			<CurrencyDropdown />
		</Page>
	);
};
