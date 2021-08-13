import { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
const NFT = lazy(() => import("./pages/NFT"));
const Borrow = lazy(() => import("./pages/Borrow"));
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
				<Route path={"/"} exact component={HomePage} />
				<Route path={"/favorites"} component={Favorites} />
				<Route path={"/history"} exact component={History} />
				<Route path={"/offramp"} component={Offramp} />
				<Route path={"/onramp"} component={Onramp} />
				<Route path={"/settings"} component={Settings} />
				<Route path={"/dashboard"} component={Dashboard} />
				<Route path={"/exchange"} component={Exchange} />
				<Route path={"/platforms/:platform"} component={Platform} />
				<Route path={"/invest"} exact component={Explore} />
				<Route path={"/invest/pools"} component={Pools} />
				<Route path={"/invest/tokens"} component={MarketsExplore} />
				<Route path={"/invest/tokensets"} component={TokenSets} />
				<Route path={"/nft"} exact component={NFT} />
				<Route path={"/governance"} exact component={Governance} />
				<Route path={"/governance/:space/create"} exact component={CreateProposal} />
				<Route path={"/governance/:space"} exact component={Proposals} />
				<Route path={"/governance/:space/proposal/:id"} exact component={VotePage} />
				<Route path={"/invest/loans"} component={Borrow} />
				<Route path={"/market/:id"} exact component={CoinDetailsPage} />
				<Route path={"/coins/:id"} exact component={CoinDetailsPage} />
				<Route path={"/launchpad"} exact component={Launchpad} />
				<Route path={"/launchpad/new"} exact component={NewLaunchpad} />
				<Route path={"/launchpad/:address"} exact component={LaunchpadItem} />
				<Route path={"/cross"} component={CrossRouteHandler} />
				<Redirect to={"/"} />
			</Switch>
		</Suspense>
	);
};

export default Routes;
