import { useState } from "react";
// import { useDarkModeManager } from "../../state/user/hooks";
import { PureThemeToggle } from "./ThemeToggle";

const ThemeToggle = () => {
	// TODO: use app state
	// const [darkMode, toggleDarkMode] = useDarkModeManager();
	const [darkMode, setDarkMode] = useState(false);
	const toggleDarkMode = () => setDarkMode(!darkMode);

	return <PureThemeToggle onChange={toggleDarkMode} checked={darkMode} />;
};

export default ThemeToggle;
