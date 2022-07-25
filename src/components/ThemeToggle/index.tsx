import { PureThemeToggle } from "./ThemeToggle";
import { useDarkModeManager } from "../../state/user/useDarkModeManager";

const ThemeToggle = () => {
	const [darkMode, toggleDarkMode] = useDarkModeManager();

	return <PureThemeToggle onChange={toggleDarkMode} checked={darkMode} />;
};

export default ThemeToggle;
