import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CurrencyText from "../CurrencyText";
import * as Styled from "./styleds";

export interface PurePriceFeedsProps {
	feeds: any;
	currentPrice?: any;
	loading?: boolean;
}

export const PurePriceFeeds = ({ feeds, currentPrice, loading = false }: PurePriceFeedsProps) => {
	const { t } = useTranslation();
	const markets = Object.keys(feeds.links);

	return loading ? (
		<div className="d-flex justify-content-center py-4">
			<Spinner animation="border" variant="primary" id="load-markets" />
		</div>
	) : (
		<div className="d-grid gap-4">
			{markets ? (
				markets.map((market) => {
					return (
						<div
							className="d-flex flex-row justify-content-lg-center justify-content-start flex-grow-1 mb-3 mb-lg-0 flex-lg-column"
							key={market}
						>
							<Styled.MarketLink
								className="mb-lg-1 me-2 me-lg-0 fs-6"
								href={feeds.links[market]}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{market} ↗
							</Styled.MarketLink>
							<span
								className={`${
									feeds.result[market] >= current_price ? "text-success" : "text-danger"
								} fw-bold fs-5`}
								style={{ flex: "1" }}
							>
								<CurrencyText value={feeds.result[market]} />
							</span>
						</div>
					);
				})
			) : (
				<div className="d-flex flex-column flex-lg-row align-items-center justify-content-center py-5">
					<Styled.CellText>{t("errors.default")}</Styled.CellText>
				</div>
			)}
		</div>
	);
};
