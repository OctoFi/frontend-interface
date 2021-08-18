import { PureAppBar } from "./AppBar";
import { appbarRoutes } from "../../constants/routes";

const AppBar = () => {
	return <PureAppBar items={appbarRoutes} />;
};

export default AppBar;
