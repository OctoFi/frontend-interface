import { useTranslation } from "react-i18next";
import Page from "../../components/Page";
import ProposalsCard from "../../components/ProposalsCard";

export const Proposals = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("governance.title")}>
			<ProposalsCard />
		</Page>
	);
};
