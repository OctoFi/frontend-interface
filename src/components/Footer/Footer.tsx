import { useTranslation } from "react-i18next";
import SocialLinkList from "../SocialLinkList";
import * as Styled from "./styleds";

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<Styled.Footer className="d-none d-lg-flex flex-column align-items-center justify-content-center">
			<SocialLinkList />
			<Styled.CopyRight>{t("app.copyright")}</Styled.CopyRight>
		</Styled.Footer>
	);
};
