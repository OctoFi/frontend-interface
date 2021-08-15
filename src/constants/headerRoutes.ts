import { ROUTE_CROSS, ROUTE_DASHBOARD, ROUTE_EXCHANGE, ROUTE_GOVERNANCE, ROUTE_HISTORY, ROUTE_HOME, ROUTE_INVEST, ROUTE_LAUNCHPAD, ROUTE_LOANS, ROUTE_NFT_MARKETPLACE, ROUTE_OFFRAMP, ROUTE_ONRAMP, ROUTE_POOLS } from "./routes";

export const routes = {
	homepage: {
		title: "home",
		path: ROUTE_HOME,
	},
	dashboard: {
		title: "dashboard",
		path: ROUTE_DASHBOARD,
	},
	history: {
		title: "history",
		path: ROUTE_HISTORY,
	},
	instantSwap: {
		title: "exchange",
		path: ROUTE_EXCHANGE,
	},
	invest: {
		title: "invest",
		path: ROUTE_INVEST,
	},
	pools: {
		title: "pools",
		path: ROUTE_POOLS,
	},
	more: {
		title: "more",
		routes: {
			governance: {
				title: "governance",
				path: ROUTE_GOVERNANCE,
			},
			nft: {
				title: "nft",
				path: ROUTE_NFT_MARKETPLACE,
			},
			on: {
				title: "crypto",
				path: ROUTE_ONRAMP,
			},
			off: {
				title: "giftCards",
				path: ROUTE_OFFRAMP,
			},
			loans: {
				title: "loans",
				path: ROUTE_LOANS,
			},
			launchpad: {
				title: "launchpad",
				path: ROUTE_LAUNCHPAD,
			},
			cross: {
				title: "cross",
				path: ROUTE_CROSS,
			},
		},
	},
};
