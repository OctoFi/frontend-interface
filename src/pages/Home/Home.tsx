import Page from "../../components/Page";
import Hero from "../../components/Hero";
import Features from "./Features";
import Banners from "./Banners";
import Currencies from "./Currencies";

export const PureHome = () => {
	return (
		<Page hero={<Hero />}>
			<Banners />
			<Currencies />
			<Features />
		</Page>
	);
};
