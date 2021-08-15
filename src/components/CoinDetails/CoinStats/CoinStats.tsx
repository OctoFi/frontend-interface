import { Col } from "react-bootstrap";
import Card from "../../Card";
import * as Styled from "./styleds";

export interface CoinStatsProps {
	coin: any;
}

export const CoinStats = ({ coin }: CoinStatsProps) => {
	if (!coin) {
		return null;
	}
	return (
		<Card header={true} title={"Coin Stats"}>
			<div className="d-flex align-items-center justify-content-between row pb-0 pb-lg-2">
				<Col
					xs={12}
					md={4}
					className="d-flex flex-row flex-lg-column align-items-center align-items-lg-start justify-content-between justify-content-lg-center"
				>
					<Styled.StatsDesc>Market Cap</Styled.StatsDesc>
					<Styled.StatsValue>{"$" + coin.market_data.market_cap.usd}</Styled.StatsValue>
				</Col>
				<Col
					xs={12}
					md={4}
					className="d-flex flex-row flex-lg-column align-items-center align-items-lg-start justify-content-between justify-content-lg-center"
				>
					<Styled.StatsDesc>All time High</Styled.StatsDesc>
					<Styled.StatsValue className="text-success">{"$" + coin.market_data.ath.usd}</Styled.StatsValue>
				</Col>
				<Col
					xs={12}
					md={4}
					className="d-flex flex-row flex-lg-column align-items-center align-items-lg-start justify-content-between justify-content-lg-center"
				>
					<Styled.StatsDesc last>All Time Low</Styled.StatsDesc>
					<Styled.StatsValue last className="text-danger">
						{"$" + coin.market_data.atl.usd}
					</Styled.StatsValue>
				</Col>
			</div>
		</Card>
	);
};
