import { ROUTE_DASHBOARD, ROUTE_EXCHANGE, ROUTE_FAVORITES, ROUTE_HISTORY, ROUTE_INVEST } from "./routes";

export const routes = {
	dashboard: {
		title: "dashboard",
		path: ROUTE_DASHBOARD,
		icon: "pie-chart",
	},
	history: {
		title: "history",
		path: ROUTE_HISTORY,
		icon: "list",
	},
	instantSwap: {
		title: "exchange",
		path: ROUTE_EXCHANGE,
		icon: "maximize-2",
		// icon: "repeat",
	},
	favorites: {
		title: "favorites",
		path: ROUTE_FAVORITES,
		icon: "star",
	},
	invest: {
		title: "invest",
		path: ROUTE_INVEST,
		icon: "trending-up",
	},
};
