import React, { Suspense } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import SplashScreen from "../src/components/SplashScreen";
import { theme as StyledTheme } from "../src/theme";
// import { ThemeProvider } from "theme-ui";
// import { base as preset } from "@theme-ui/presets";
import "../src/i18n";
import "bootstrap/dist/css/bootstrap.min.css";

// const themes = {
// 	base: preset,
// };

// Function to obtain the intended theme
const getTheme = (themeName) => {
	// return themes[themeName];
	return StyledTheme(themeName === "dark");
};

const withThemeProvider = (Story, context) => {
	const theme = getTheme(context.globals.theme);

	return (
		<MemoryRouter initialEntries={["/"]}>
			<ThemeProvider theme={theme}>
				<Suspense fallback={<SplashScreen />}>
					<Story {...context} />
				</Suspense>
			</ThemeProvider>
		</MemoryRouter>
	);
};

export const decorators = [withThemeProvider];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Global theme for components",
		defaultValue: "light",
		toolbar: {
			icon: "mirror",
			items: ["light", "dark"],
			showName: true,
		},
	},
};
