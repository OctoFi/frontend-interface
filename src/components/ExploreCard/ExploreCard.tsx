import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

import useTheme from "../../hooks/useTheme";
import CurrencyText from "../CurrencyText";
import CurrencyLogo from "../Logo/CurrencyLogo";
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
	const theme = useTheme();

	return (
		<Styled.Container>
			<Styled.Wrapper>
				<Styled.Header className="d-flex align-items-start justify-content-between">
					<div className={"d-flex align-items-start mb-10"}>
						<Styled.LogoContainer>
							{imageComponent ? (
								imageComponent
							) : img ? (
								<Styled.Logo src={img} alt={name} />
							) : (
								<CurrencyLogo currency={currency} />
							)}
						</Styled.LogoContainer>
						<Styled.HeaderContent className="d-flex flex-column justify-content-center">
							<Styled.Title>{name}</Styled.Title>
							{symbol && <Styled.Symbol>{symbol}</Styled.Symbol>}
						</Styled.HeaderContent>
					</div>
					{src && (
						<Link className={"d-none d-md-flex align-items-center justify-content-end"} to={src}>
							<Styled.Details>Details</Styled.Details>
							<ChevronRight size={16} color={theme.primary} />
						</Link>
					)}
				</Styled.Header>
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
					<div
						className="d-flex d-md-none flex-column align-items-stretch justify-content-center"
						style={{ marginTop: 24 }}
					>
						<Link to={src} className={"d-flex w-100"}>
							<Styled.DetailsButton>Details</Styled.DetailsButton>
						</Link>
					</div>
				)}
			</Styled.Wrapper>
		</Styled.Container>
	);
};
