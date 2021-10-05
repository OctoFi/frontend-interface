import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
// import "inter-ui";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import getLibrary from "./utils/getLibrary";
import { NetworkContextName } from "./constants/network";
import "./i18n";
import { store } from "./state";
import ThemeProvider from "./theme";
// import { ThemeProvider } from "theme-ui";
// import {
// 	deep as preset,
// 	base,
// 	system,
// 	funk,
// 	future,
// 	roboto,
// 	dark,
// 	swiss,
// 	tosh,
// 	bootstrap,
// 	bulma,
// 	tailwind,
// 	sketchy,
// } from "@theme-ui/presets";
// import { theme as custom } from "./themes/PurpleTheme";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ProviderNetwork getLibrary={getLibrary}>
				<Provider store={store}>
					{/* @ts-ignore */}
					{/* <ThemeProvider theme={preset}> */}
					{/* <ThemeProvider theme={custom}> */}
					<ThemeProvider>
						<App />
					</ThemeProvider>
					{/* </ThemeProvider> */}
					{/* </ThemeProvider> */}
				</Provider>
			</Web3ProviderNetwork>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
