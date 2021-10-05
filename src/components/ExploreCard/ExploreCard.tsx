import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import CoinDisplay from "../CoinDisplay";
import CurrencyText from "../CurrencyText";
import * as Styled from "./styleds";

export interface PureExploreCardProps {
	imageComponent?: any;
	img?: any;
	name?: string;
	currency?: string;
	symbol?: any;
	src?: any;
	title?: any;
	price?: any;
	priceDiff?: any;
}

export const PureExploreCard = ({
	imageComponent,
	img,
	name,
	currency,
	symbol,
	src,
	title,
	price,
	priceDiff,
}: PureExploreCardProps) => {
	return (
		<Styled.Container>
			<Styled.Wrapper>
				<div className="d-flex justify-content-between mb-4">
					<CoinDisplay currency={currency} name={name} symbol={symbol} image={imageComponent || img} />

					{src && (
						<Link
							className="d-none d-md-flex align-items-center justify-content-end text-decoration-none"
							to={src}
						>
							<span className="me-2">Details</span>
							<ChevronRight size={16} />
						</Link>
					)}
				</div>
				<div>
					<Styled.Price>{title || "Price"}</Styled.Price>
					<div className="d-flex align-items-center justify-content-between">
						<Styled.CurrentPrice>
							<CurrencyText separate={true} value={price} />
						</Styled.CurrentPrice>
						{priceDiff && (
							<Styled.PriceDiff type={priceDiff > 0 ? "asc" : "desc"}>
								{priceDiff < 0.01 ? priceDiff.toFixed(4) : priceDiff.toFixed(2)}%
							</Styled.PriceDiff>
						)}
					</div>
				</div>
				{src && (
					<div className="d-grid d-md-none mt-4">
						<Styled.DetailsButton to={src} variant="outline-primary" size="lg" className="fs-6">
							Details
						</Styled.DetailsButton>
					</div>
				)}
			</Styled.Wrapper>
		</Styled.Container>
	);
};
