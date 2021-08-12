import { useTranslation } from "react-i18next";
import Page from "../../components/Page";
import Vote from "../../components/Vote";

export const VotePage = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("governance.title")}>
			<Vote />
		</Page>
	);
};
