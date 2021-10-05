import { Theme } from "@theme-ui/css";

const makeTheme = <T extends Theme>(t: T) => t;

export const theme = makeTheme({
	colors: {
		scrollbar: "#3F3F46",
	},
});

export type ExactTheme = typeof theme;
