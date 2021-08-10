export const routes = {
	dashboard: {
		title: "dashboard",
		path: "/dashboard",
	},
	history: {
		title: "history",
		path: "/history",
	},
	instantSwap: {
		title: "exchange",
		path: "/exchange",
	},
	invest: {
		title: "invest",
		path: "/invest",
	},
	pools: {
		title: "pools",
		path: "/invest/pools",
	},
	more: {
		title: "more",
		routes: {
			governance: {
				title: "governance",
				path: "/governance",
			},
			nft: {
				title: "nft",
				path: "/nft",
			},
			on: {
				title: "crypto",
				path: "/onramp",
			},
			off: {
				title: "giftCards",
				path: "/offramp",
			},
			loans: {
				title: "loans",
				path: "/invest/loans",
			},
			launchpad: {
				title: "launchpad",
				path: "/launchpad",
			},
			cross: {
				title: "cross",
				path: "/cross/anyswap",
			},
		},
	},
};
