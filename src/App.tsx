import { Suspense } from "react";
import { HashRouter as Router } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";
import useKeyboardShortcut from "use-keyboard-shortcut";

import ApplicationUpdater from "./state/application/updater";
import ListsUpdater from "./state/lists/updater";
import MultiCallUpdater from "./state/multicall/updater";
import TransactionUpdater from "./state/transactions/updater";
import UserUpdater from "./state/user/updater";
import SplashScreen from "./components/SplashScreen";
import RouteChanger from "./components/RouteChanger/routeChanger";
import WalletModal from "./components/WalletModal";
import Web3ReactManager from "./components/Web3ReactManager";
import TransactionHandler from "./components/TransactionHandler";
import { FixedGlobalStyle, ThemedGlobalStyle } from "./theme";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap-grid.min.css";
// import "bootstrap/dist/css/bootstrap-utilities.min.css";
// import "./global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDarkModeManager } from "./state/user/useDarkModeManager";

function Updaters() {
	return (
		<>
			<ListsUpdater />
			<UserUpdater />
			<ApplicationUpdater />
			<TransactionUpdater />
			<MultiCallUpdater />
		</>
	);
}

function App() {
	const [darkMode, toggleDarkMode] = useDarkModeManager();

	useKeyboardShortcut(["Shift", "*"], () => toggleDarkMode(), { overrideSystem: false });

	return (
		<Suspense fallback={<SplashScreen />}>
			<Web3ReactManager>
				<>
					<FixedGlobalStyle />
					<Updaters />

					<Toaster
						position="bottom-right"
						toastOptions={{
							className: "",
							style: {
								background: "#464646",
								color: "#fff",
								zIndex: 9999999,
								boxShadow: "initial",
								borderRadius: 12,
							},
							duration: 5000,
						}}
					/>
					<TransactionHandler />
					<SkeletonTheme>
						{/* color={darkMode ? "#1e1f24" : "#d4daf2"}
						highlightColor={darkMode ? "#232429" : "#F3F5FD"} */}

						<ThemedGlobalStyle />
						<Router>
							<WalletModal />
							<RouteChanger />
							<Routes />
						</Router>
					</SkeletonTheme>
				</>
			</Web3ReactManager>
		</Suspense>
	);
}

export default App;
