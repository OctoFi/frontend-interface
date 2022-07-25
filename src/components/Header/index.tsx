import { useDarkModeManager } from "../../state/user/useDarkModeManager";
import { PureHeader } from "./Header";

const Header = () => {
	const [darkMode] = useDarkModeManager();

	return <PureHeader dark={darkMode} />;
};

export default Header;
