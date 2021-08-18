import { useIsDarkMode } from "../../state/user/hooks";
import { PureHeader } from "./Header";

const Header = () => {
	const darkMode = useIsDarkMode();

	return <PureHeader dark={darkMode} />;
};

export default Header;
