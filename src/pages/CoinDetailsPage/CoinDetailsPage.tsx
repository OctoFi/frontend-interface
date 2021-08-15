import Page from "../../components/Page";
// import CoinDetails from "../../components/CoinDetails";
import { TradePanel } from "../../components/CoinDetails/TradePanel/TradePanel";

export const CoinDetailsPage = () => {
	return (
		<Page title={"Coin Details"}>
			{/* <CoinDetails /> */}
			<TradePanel />
		</Page>
	);
};
