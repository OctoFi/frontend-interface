import { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as routes from "./constants/routes";
import { AppState } from "./state";
import { fetchCurrencies } from "./state/currency/actions";
import { useDarkModeManager } from "./state/user/hooks";
import HomePage from "./pages/Home";
import SplashScreen from "./components/SplashScreen";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Platform = lazy(() => import("./pages/Platform"));
const Pools = lazy(() => import("./pages/Pools"));
const Exchange = lazy(() => import("./pages/Exchange"));
const Favorites = lazy(() => import("./pages/Favorites"));
const History = lazy(() => import("./pages/History"));
const Explore = lazy(() => import("./pages/Explore"));
const MarketsExplore = lazy(() => import("./pages/MarketsExplore"));
const CoinDetailsPage = lazy(() => import("./pages/CoinDetailsPage"));
const Governance = lazy(() => import("./pages/Governance"));
const CreateProposal = lazy(() => import("./pages/CreateProposal"));
const Proposals = lazy(() => import("./pages/Proposals"));
const VotePage = lazy(() => import("./pages/VotePage"));
const Offramp = lazy(() => import("./pages/Offramp"));
const Onramp = lazy(() => import("./pages/Onramp"));
const NFTMarketplace = lazy(() => import("./pages/NFTMarketplace"));
const Loans = lazy(() => import("./pages/Loans"));
const TokenSets = lazy(() => import("./pages/TokenSets"));
const Launchpad = lazy(() => import("./pages/Launchpad"));
const LaunchpadItem = lazy(() => import("./pages/LaunchpadItem"));
const NewLaunchpad = lazy(() => import("./pages/NewLaunchpad"));
const CrossRouteHandler = lazy(() => import("./CrossRouteHandler"));
const Settings = lazy(() => import("./pages/Settings"));

const Routes = () => {
	const [darkMode] = useDarkModeManager();
	const selectedCurrency = useSelector((state: AppState) => state.currency.selected);
	const dispatch = useDispatch();

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [darkMode]);

	useEffect(() => {
		dispatch(fetchCurrencies(selectedCurrency));
	}, [selectedCurrency, dispatch]);

	return (
		<Suspense fallback={<SplashScreen />}>
			<Switch>
				<Route path={routes.ROUTE_DEFAULT} exact component={Dashboard} />
				<Route path={routes.ROUTE_HOME} component={HomePage} />
				<Route path={routes.ROUTE_FAVORITES} component={Favorites} />
				<Route path={routes.ROUTE_HISTORY} component={History} />
				<Route path={routes.ROUTE_OFFRAMP} component={Offramp} />
				<Route path={routes.ROUTE_ONRAMP} component={Onramp} />
				<Route path={routes.ROUTE_SETTINGS} component={Settings} />
				<Route path={routes.ROUTE_EXCHANGE} component={Exchange} />
				<Route path={routes.ROUTE_INVEST} exact component={Explore} />
				<Route path={routes.ROUTE_POOLS} component={Pools} />
				<Route path={routes.ROUTE_MARKETS_EXPLORE} component={MarketsExplore} />
				<Route path={routes.ROUTE_TOKENSETS} component={TokenSets} />
				<Route path={`${routes.ROUTE_PLATFORMS}/:platform`} component={Platform} />
				<Route path={routes.ROUTE_NFT_MARKETPLACE} exact component={NFTMarketplace} />
				<Route path={routes.ROUTE_GOVERNANCE} exact component={Governance} />
				<Route path={`${routes.ROUTE_GOVERNANCE}/:space/create`} exact component={CreateProposal} />
				<Route path={`${routes.ROUTE_GOVERNANCE}/:space`} exact component={Proposals} />
				<Route path={`${routes.ROUTE_GOVERNANCE}/:space/proposal/:id`} exact component={VotePage} />
				<Route path={routes.ROUTE_LOANS} component={Loans} />
				<Route path={`${routes.ROUTE_MARKET}/:id`} exact component={CoinDetailsPage} />
				<Route path={`${routes.ROUTE_COIN_DETAILS}/:id`} exact component={CoinDetailsPage} />
				<Route path={routes.ROUTE_LAUNCHPAD} exact component={Launchpad} />
				<Route path={`${routes.ROUTE_LAUNCHPAD}/new`} exact component={NewLaunchpad} />
				<Route path={`${routes.ROUTE_LAUNCHPAD}/:address`} exact component={LaunchpadItem} />
				<Route path={routes.ROUTE_CROSS} component={CrossRouteHandler} />
				<Redirect to={routes.ROUTE_DEFAULT} />
			</Switch>
		</Suspense>
	);
};

export default Routes;
