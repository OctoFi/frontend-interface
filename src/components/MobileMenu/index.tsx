import { useTranslation } from "react-i18next";
import { X } from "react-feather";
import { Button } from "react-bootstrap";

import LogoImage from "../../assets/images/logo.svg";
import useTheme from "../../hooks/useTheme";
import { routes } from "../../constants/headerRoutes";
import BrandLogo from "../BrandLogo";
import MobileMenuItem from "./MobileMenuItem";
import * as Styled from "./styleds";

export type MobileMenuProps = {
	open: boolean;
	onDismiss: () => void;
};

const MobileMenu = ({ open, onDismiss }: MobileMenuProps) => {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<>
			<Styled.Backdrop open={open} onClick={onDismiss} />
			<Styled.Wrapper open={open}>
				<Styled.Content>
					<Styled.Header>
						<BrandLogo logo={LogoImage} name={process.env.REACT_APP_BRAND} />

						<Button onClick={onDismiss} variant={"link"} className="p-1">
							<X size={20} color={theme.text1} />
						</Button>
					</Styled.Header>

					{Object.keys(routes).map((key, index) => {
						// @ts-ignore
						const r = routes[key];
						if (r.hasOwnProperty("path")) {
							return (
								<Styled.LinkItem to={r.path} key={index}>
									{t(`menu.${r.title}`)}
								</Styled.LinkItem>
							);
						} else {
							return <MobileMenuItem title={r.title} items={r.routes} key={index} />;
						}
					})}
				</Styled.Content>
			</Styled.Wrapper>
		</>
	);
};

export default MobileMenu;
