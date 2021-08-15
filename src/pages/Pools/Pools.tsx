import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTE_POOLS } from "../../constants/routes";
import { emitter } from "../../lib/helper";
import * as actions from "../../state/pools/actions";
import AddLiquidityModal from "../../components/AddLiquidityModal";
import RemoveLiquidityModal from "../../components/RemoveLiquidityModal";
import UniswapLiquidityModal from "../../components/AddLiquidityModal/uniswap";
import Page from "../../components/Page";
import PoolsCard from "./PoolsCard";

export const Pools = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const setSelectedPool = (type: any, pool: any) => {
		dispatch(actions.selectPool(type, pool));
	};

	const onInvest = () => {
		emitter.emit("open-modal", {
			action: () => {
				history.push(ROUTE_POOLS);
				emitter.emit("close-modal");
			},
		});
		history.push(`${ROUTE_POOLS}/ETH/undefined`);
	};

	const onAddLiquidity = (type: any, pool: any) => {
		emitter.emit("open-modal", {
			action: () => {
				history.push(ROUTE_POOLS);
				emitter.emit("close-modal");
			},
		});
		if (type === "Uniswap") {
			const currencyA = pool.token0.symbol.toUpperCase() === "ETH" ? "ETH" : pool.token0.id;
			const currencyB = pool.token1.id;
			history.push(`${ROUTE_POOLS}/${currencyA}/${currencyB}`);
		} else {
			setSelectedPool(type, pool);
			history.push(`${ROUTE_POOLS}/ETH/`);
		}
	};

	const onRemoveLiquidity = (type: any, pool: any) => {
		setSelectedPool(type, pool);
		history.push(`${ROUTE_POOLS}/remove/ETH/`);
		emitter.emit("open-modal", {
			action: () => {
				history.push(ROUTE_POOLS);
				emitter.emit("close-modal");
			},
		});
	};

	return (
		<Page title={"Pools"}>
			<PoolsCard onInvest={onInvest} onAddLiquidity={onAddLiquidity} onRemoveLiquidity={onRemoveLiquidity} />
			<Switch>
				<Route path={`${ROUTE_POOLS}/remove/ETH`} exact component={RemoveLiquidityModal} />
				<Route path={`${ROUTE_POOLS}/:currencyIdA/:currencyIdB`} exact component={UniswapLiquidityModal} />
				<Route path={`${ROUTE_POOLS}/ETH`} exact component={AddLiquidityModal} />
			</Switch>
		</Page>
	);
};
