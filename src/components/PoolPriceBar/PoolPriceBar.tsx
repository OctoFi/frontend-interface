import { Price } from "@uniswap/sdk";
import useTheme from "../../hooks/useTheme";
import * as Styled from "./styleds";

export type PurePoolPriceBarProps = {
	symbolA?: string;
	symbolB?: string;
	price?: Price;
	share?: string;
};

export const PurePoolPriceBar = ({ symbolA, symbolB, price, share }: PurePoolPriceBarProps) => {
	const theme = useTheme();

	return (
		<>
			<Styled.PriceRow>
				<Styled.Label fontWeight={500} color={theme.text1}>
					{symbolB} per {symbolA}
				</Styled.Label>
				<Styled.Content fontWeight={500} color={theme.text1}>
					{price?.toSignificant(6) ?? "-"}
				</Styled.Content>
			</Styled.PriceRow>

			<Styled.PriceRow>
				<Styled.Label fontWeight={500} color={theme.text1}>
					{symbolA} per {symbolB}
				</Styled.Label>
				<Styled.Content fontWeight={500} color={theme.text1}>
					{price?.invert()?.toSignificant(6) ?? "-"}
				</Styled.Content>
			</Styled.PriceRow>

			<Styled.PriceRow>
				<Styled.Label fontWeight={500} color={theme.text1}>
					Share of Pool
				</Styled.Label>
				<Styled.Content fontWeight={500} color={theme.text1}>
					{share}%
				</Styled.Content>
			</Styled.PriceRow>
		</>
	);
};
