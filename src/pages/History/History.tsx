import { useTranslation } from "react-i18next";
import Page from "../../components/Page";
// import TransactionHistory from "../../components/TransactionHistory";

export const History = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("transactionHistory")}>
			{/* <TransactionHistory /> */}
		</Page>
	);
};
