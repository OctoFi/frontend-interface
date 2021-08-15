import { Row, Col } from "react-bootstrap";
import Card from "../../Card";
import ArrowUp from "../../Icons/ArrowUp";
import ArrowDown from "../../Icons/ArrowDown";
import * as Styled from "./styleds";

export interface CoinChangesProps {
	coin: any;
}

export const CoinChanges = ({ coin }: CoinChangesProps) => {
	if(!coin) {
		return null;
	}
	return (
		<Row className={"d-flex align-items-stretch"}>
			<Col lg={3} md={6} xs={12}>
				<div className="mb-3">
					<Card className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start">
						<div className="d-flex align-items-center">
							{coin?.market_data?.price_change_percentage_24h >= 0 ? (
								// TODO: fix fills
								// @ts-ignore
								<ArrowUp fill={"#1BC5BD"} size={64} />
							) : (
								// @ts-ignore
								<ArrowDown fill={"#F64E60"} size={64} />
							)}
							<Styled.ChangesTitle
								className={
									coin?.market_data?.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
								}
							>
								{Number(coin?.market_data?.price_change_percentage_24h).toFixed(4)}%
							</Styled.ChangesTitle>
						</div>
						<Styled.ChangesSubtitle>Daily Changes Percentage</Styled.ChangesSubtitle>
					</Card>
				</div>
			</Col>
			<Col lg={3} md={6} xs={12}>
				<div className="mb-3">
					<Card className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start">
						<div className="d-flex align-items-center">
							{coin?.market_data?.price_change_percentage_7d >= 0 ? <ArrowUp /> : <ArrowDown />}
							<Styled.ChangesTitle
								className={
									coin?.market_data?.price_change_percentage_7d >= 0 ? "text-success" : "text-danger"
								}
							>
								{Number(coin?.market_data?.price_change_percentage_7d).toFixed(4)}%
							</Styled.ChangesTitle>
						</div>
						<Styled.ChangesSubtitle>Weekly Changes Percentage</Styled.ChangesSubtitle>
					</Card>
				</div>
			</Col>
			<Col lg={3} md={6} xs={12}>
				<div className="mb-3">
					<Card className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start">
						<div className="d-flex align-items-center">
							{coin?.market_data?.price_change_percentage_30d >= 0 ? <ArrowUp /> : <ArrowDown />}
							<Styled.ChangesTitle
								className={
									coin?.market_data?.price_change_percentage_30d >= 0 ? "text-success" : "text-danger"
								}
							>
								{Number(coin?.market_data?.price_change_percentage_30d).toFixed(4)}%
							</Styled.ChangesTitle>
						</div>
						<Styled.ChangesSubtitle>Monthly Changes Percentage</Styled.ChangesSubtitle>
					</Card>
				</div>
			</Col>
			<Col lg={3} md={6} xs={12}>
				<div className="mb-3">
					<Card className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-start">
						<div className="d-flex align-items-center">
							{coin?.market_data?.price_change_percentage_1y >= 0 ? <ArrowUp /> : <ArrowDown />}
							<Styled.ChangesTitle
								className={
									coin?.market_data?.price_change_percentage_1y >= 0 ? "text-success" : "text-danger"
								}
							>
								{Number(coin?.market_data?.price_change_percentage_1y).toFixed(4)}%
							</Styled.ChangesTitle>
						</div>
						<Styled.ChangesSubtitle>Yearly Changes Percentage</Styled.ChangesSubtitle>
					</Card>
				</div>
			</Col>
		</Row>
	);
};
