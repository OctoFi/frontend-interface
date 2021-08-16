import React from "react";
import { MemoryRouter } from "react-router";
import ThemeProvider from "../src/theme";
import "../src/i18n";
import "bootstrap/dist/css/bootstrap.min.css";

export const decorators = [
	(Story) => (
		<MemoryRouter initialEntries={["/"]}>
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		</MemoryRouter>
	),
];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
