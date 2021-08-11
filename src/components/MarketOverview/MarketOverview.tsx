import Skeleton from "react-loading-skeleton";
import * as Styled from "./styleds";

export interface PureMarketOverviewProps {
	pair: any;
	price: number;
	variant: string;
	volume: string;
	change: string;
	loading: boolean;
}

export const PureMarketOverview = ({ pair, price, variant, volume, change, loading }: PureMarketOverviewProps) => {
	if (loading) {
		return (
			<Styled.Wrapper>
				<Styled.Row>
					<Skeleton width={80} height={20} />
				</Styled.Row>
				<Styled.Row>
					<Skeleton width={140} height={30} />
				</Styled.Row>
				<Styled.Row>
					<Skeleton width={100} height={36} style={{ borderRadius: 8 }} />
				</Styled.Row>
				<Styled.Row>
					<Skeleton width={180} height={24} />
				</Styled.Row>
			</Styled.Wrapper>
		);
	}

	return (
		<Styled.Wrapper>
			<Styled.Row>
				<Styled.Text>{pair}</Styled.Text>
			</Styled.Row>
			<Styled.Row>
				<Styled.Value variant={variant}>{price}</Styled.Value>
			</Styled.Row>
			<Styled.Row>
				<Styled.PriceChange variant={variant}>{change}</Styled.PriceChange>
			</Styled.Row>
			<Styled.Row>
				<Styled.Volume>Volume: {volume}</Styled.Volume>
			</Styled.Row>
		</Styled.Wrapper>
	);
};
