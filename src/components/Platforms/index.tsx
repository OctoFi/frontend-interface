import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PurePlatforms } from "./Platforms";

const Platforms = () => {
	const history = useHistory();
	const balance = useSelector((state) => state.balances.transformedBalance);
	const loading = useSelector((state) => state.balances.loading);

	const onSelectPlatform = (platform: any) => {
		history.push(`/platforms/${platform}`);
	};

	return <PurePlatforms balance={balance} onSelectPlatform={onSelectPlatform} loading={loading} />;
};

export default Platforms;
