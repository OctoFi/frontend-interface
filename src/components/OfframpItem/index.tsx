import { PureOfframpItem } from "./OfframpItem";

const OfframpItem = ({ item }: { item: any }) => {
	return <PureOfframpItem thumbnail={item.thumbnail} title={item.title} traits={item.traits} url={item.url} />;
};

export default OfframpItem;
