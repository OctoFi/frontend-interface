import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PLATFORMS } from "../../constants/routes";
import { AppState } from "../../state";
import { PurePlatforms } from "./Platforms";

const Platforms = () => {
	const history = useHistory();
	const balance = useSelector((state: AppState) => state.balances.transformedBalance);
	const loading = useSelector((state: AppState) => state.balances.loading);

	const onSelectPlatform = (platform: any) => {
		history.push(`${ROUTE_PLATFORMS}/${platform}`);
	};

	return <PurePlatforms balance={balance} onSelectPlatform={onSelectPlatform} loading={loading} />;
};

export default Platforms;
