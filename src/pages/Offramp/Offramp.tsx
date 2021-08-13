import Page from "../../components/Page";
import OfframpItems from "../../data/OfframpItems";
import OfframpList from "../../components/OfframpList";

export const Offramp = () => {
	return (
		<Page title={"Gift Cards & More"}>
			<OfframpList items={OfframpItems} />
		</Page>
	);
};
