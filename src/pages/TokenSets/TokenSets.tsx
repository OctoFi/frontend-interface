import Page from "../../components/Page";
import { ResponsiveCard } from "../../components/Card";
import TokenSetsTabs from "../../components/TokenSetsTabs";

export const PureTokenSets = () => {
	return (
		<Page title={"Token Sets"} networkSensitive={true}>
			<ResponsiveCard>
				<TokenSetsTabs />
			</ResponsiveCard>
		</Page>
	);
};
