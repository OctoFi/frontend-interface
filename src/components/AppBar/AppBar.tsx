import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, List, Maximize2, Repeat, Star, TrendingUp } from "react-feather";
import { routes } from "../../constants/appbarRoutes";
import * as Styled from "./styleds";

const Icons = {
	"pie-chart": PieChart,
	list: List,
	"maximize-2": Maximize2,
	repeat: Repeat,
	star: Star,
	"trending-up": TrendingUp,
};

export const AppBar = () => {
	const { t } = useTranslation();

	return (
		<Styled.AppNavbar>
			{Object.keys(routes).map((key, index) => {
				// @ts-ignore
				const r = routes[key];
				// @ts-ignore
				if (typeof Icons[r.icon] !== "undefined") {
					return (
						<Styled.AppBarItem key={index} to={r.path} activeClassName={"active"} exact>
							{r.icon === "maximize-2" ? (
								// @ts-ignore
								<Styled.RotateIcon>{React.createElement(Icons[r.icon])}</Styled.RotateIcon>
							) : (
								// @ts-ignore
								React.createElement(Icons[r.icon])
							)}
							<span className="sr-only">{t(`menu.${r.title}`)}</span>
						</Styled.AppBarItem>
					);
				} else {
					return false;
				}
			})}
		</Styled.AppNavbar>
	);
};
