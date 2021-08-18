import Page from "../../components/Page";
import { CustomCard } from "../../components/Card";
import MarketTokens from "../../components/MarketTokens";

export const MarketsExplore = () => {
	return (
		<Page title={"Top Tokens"}>
			<CustomCard>
				<MarketTokens />
			</CustomCard>
		</Page>
	);
};
