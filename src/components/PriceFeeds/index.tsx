// Pulled from MarketTokens
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../state";
import { PurePriceFeeds } from "./PriceFeeds";
import { fetchCoinMarketPrices } from "../../state/market/actions";

export interface PriceFeedsProps {
	id: any;
	symbol: any;
	current_price: any;
}

const PriceFeeds = ({ id, symbol, current_price }: PriceFeedsProps) => {
	const dispatch = useDispatch();
	const marketCoins = useSelector((state: AppState) => state.market.marketCoins);
	const loading = marketCoins.prices.loading[id];
	const feeds = marketCoins.prices.data[id];

	useEffect(() => {
		dispatch(
			fetchCoinMarketPrices({
				id: id,
				symbol: symbol,
			})
		);
	}, [id, symbol]);

	return <PurePriceFeeds feeds={feeds.links} currentPrice={current_price} loading={loading} />;
};

export default PriceFeeds;
