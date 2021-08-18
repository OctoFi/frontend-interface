import { Icon, ArrowDownUp, GraphUp, List, Grid1x2, Star } from "react-bootstrap-icons";

export const ROUTE_DEFAULT = "/";
export const ROUTE_DASHBOARD = "/";
export const ROUTE_HOME = "/home";
export const ROUTE_FAVORITES = "/favorites";
export const ROUTE_HISTORY = "/history";
export const ROUTE_OFFRAMP = "/offramp";
export const ROUTE_ONRAMP = "/onramp";
export const ROUTE_SETTINGS = "/settings";
export const ROUTE_EXCHANGE = "/exchange";
export const ROUTE_PLATFORMS = "/platforms";
export const ROUTE_INVEST = "/invest";
export const ROUTE_LOANS = "/invest/loans";
export const ROUTE_POOLS = "/invest/pools";
export const ROUTE_MARKETS_EXPLORE = "/invest/tokens";
export const ROUTE_TOKENSETS = "/invest/tokensets";
export const ROUTE_NFT_MARKETPLACE = "/nft";
export const ROUTE_GOVERNANCE = "/governance";
export const ROUTE_MARKET = "/market";
export const ROUTE_COIN_DETAILS = "/coins";
export const ROUTE_LAUNCHPAD = "/launchpad";
export const ROUTE_LAUNCHPAD_NEW = "/launchpad/new";
export const ROUTE_CROSS = "/cross";

export const navigation: Array<{ title: string; path?: string; routes?: Array<{ title: string; path?: string }> }> = [
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

export const appbarRoutes: Array<{ title: string; path: string; icon: Icon; }> = [
    {
        title: "dashboard",
        path: ROUTE_DASHBOARD,
        icon: Grid1x2,
    },
    {
        title: "history",
        path: ROUTE_HISTORY,
        icon: List,
    },
    {
        title: "exchange",
        path: ROUTE_EXCHANGE,
        icon: ArrowDownUp,
    },
    {
        title: "favorites",
        path: ROUTE_FAVORITES,
        icon: Star,
    },
    {
        title: "invest",
        path: ROUTE_INVEST,
        icon: GraphUp,
    },
];
