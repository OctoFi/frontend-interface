import { ROUTE_CROSS, ROUTE_DASHBOARD, ROUTE_EXCHANGE, ROUTE_GOVERNANCE, ROUTE_HISTORY, ROUTE_HOME, ROUTE_INVEST, ROUTE_LAUNCHPAD, ROUTE_LOANS, ROUTE_NFT_MARKETPLACE, ROUTE_OFFRAMP, ROUTE_ONRAMP, ROUTE_POOLS } from "./routes";

export const routes: Array<{ title: string; path?: string; routes?: Array<{ title: string; path?: string }> }> = [
	{
		title: "home",
		path: ROUTE_HOME,
	},
	{
		title: "dashboard",
		path: ROUTE_DASHBOARD,
	},
	{
		title: "history",
		path: ROUTE_HISTORY,
	},
	{
		title: "exchange",
		path: ROUTE_EXCHANGE,
	},
	{
		title: "invest",
		path: ROUTE_INVEST,
	},
	{
		title: "pools",
		path: ROUTE_POOLS,
	},
	{
		title: "more",
		routes: [
			{
				title: "governance",
				path: ROUTE_GOVERNANCE,
			},
			{
				title: "nft",
				path: ROUTE_NFT_MARKETPLACE,
			},
			{
				title: "crypto",
				path: ROUTE_ONRAMP,
			},
			{
				title: "giftCards",
				path: ROUTE_OFFRAMP,
			},
			{
				title: "loans",
				path: ROUTE_LOANS,
			},
			{
				title: "launchpad",
				path: ROUTE_LAUNCHPAD,
			},
			{
				title: "cross",
				path: ROUTE_CROSS,
			}
		]
	},
];
