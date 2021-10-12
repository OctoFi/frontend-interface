import { Icon, ArrowDownUp, GraphUp, List, Grid1x2, Star } from "react-bootstrap-icons";

export const ROUTE_DEFAULT = "/";
export const ROUTE_HOME = "/";
export const ROUTE_DASHBOARD = "/dashboard";
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

export const navigation: Array<{ title: string; path?: string; disabled?: boolean; routes?: Array<{ title: string; path?: string; disabled?: boolean; }> }> = [
    {
        title: "home",
        path: ROUTE_HOME,
        disabled: false,
    },
    {
        title: "dashboard",
        path: ROUTE_DASHBOARD,
        disabled: false,
    },
    {
        title: "history",
        path: ROUTE_HISTORY,
        disabled: false,
    },
    {
        title: "exchange",
        path: ROUTE_EXCHANGE,
        disabled: true,
    },
    {
        title: "invest",
        path: ROUTE_INVEST,
        disabled: false,
    },
    {
        title: "pools",
        path: ROUTE_POOLS,
        disabled: true,
    },
    {
        title: "more",
        routes: [
            {
                title: "favorites",
                path: ROUTE_FAVORITES,
                disabled: false,
            },
            {
                title: "governance",
                path: ROUTE_GOVERNANCE,
                disabled: true,
            },
            {
                title: "nft",
                path: ROUTE_NFT_MARKETPLACE,
                disabled: true,
            },
            {
                title: "crypto",
                path: ROUTE_ONRAMP,
                disabled: false,
            },
            {
                title: "giftCards",
                path: ROUTE_OFFRAMP,
                disabled: false,
            },
            {
                title: "loans",
                path: ROUTE_LOANS,
                disabled: false,
            },
            {
                title: "launchpad",
                path: ROUTE_LAUNCHPAD,
                disabled: true,
            },
            {
                title: "cross",
                path: ROUTE_CROSS,
                disabled: true,
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
