import { useTranslation } from "react-i18next";
import { Icon } from "react-bootstrap-icons";
import * as Styled from "./styleds";

export interface ItemProps {
	title: string;
	path: string;
	icon: Icon;
}

export interface PureAppBarProps {
	items: Array<ItemProps>;
}

export const PureAppBar = ({ items }: PureAppBarProps) => {
	const { t } = useTranslation();

	return (
		<Styled.AppNavbar>
			{items.map((item: any) => {
				return (
					<Styled.AppBarItem key={item.title} to={item.path} activeClassName="active" exact>
						<item.icon size={24} />
						<span className="sr-only">{t(`menu.${item.title}`)}</span>
					</Styled.AppBarItem>
				);
			})}
		</Styled.AppNavbar>
	);
};
