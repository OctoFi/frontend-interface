import { Currency, Percent, Price } from "@uniswap/sdk";

import { ONE_BIPS } from "../../constants";
import { Field } from "../../state/mint/actions";
import { PurePoolPriceBar } from "./PoolPriceBar";

export type PoolPriceBarProps = {
	currencies: { [field in Field]?: Currency };
	noLiquidity?: boolean;
	poolTokenPercentage?: Percent;
	price?: Price;
};

export function PoolPriceBar({ currencies, noLiquidity, poolTokenPercentage, price }: PoolPriceBarProps) {
	return (
		<PurePoolPriceBar
			symbolA={currencies[Field.CURRENCY_A]?.symbol}
			symbolB={currencies[Field.CURRENCY_B]?.symbol}
			price={price}
			share={
				noLiquidity && price
					? "100"
					: (poolTokenPercentage?.lessThan(ONE_BIPS) ? "<0.01" : poolTokenPercentage?.toFixed(2)) ?? "0"
			}
		/>
	);
}
