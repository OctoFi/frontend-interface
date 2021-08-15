import Page from "../../components/Page";
import CoinDetails from "../../components/CoinDetails";

export const CoinDetailsPage = () => {
	return (
		<Page title={"Coin Details"}>
			<CoinDetails />

			{/* const isLoading = row.loading || false; */}
			{/* const value = row.balanceUSD * (currenciesRate["BTC"] || 1); */}

			{/* <div className="d-flex align-items-stretch justify-content-end flex-column flex-lg-row align-items-lg-center w-100">
				{isLoading ? (
					<div className={"d-flex align-items-center"}>
						<Skeleton width={70} height={40} count={3} className={"mr-lg-4 mb-2 mb-lg-0"} />
					</div>
				) : (
					<>
						<Styled.TradeButton
							href={`/#/exchange?outputCurrency=${
								row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
							}`}
						>
							{t("buttons.buy")}
						</Styled.TradeButton>

						<Styled.TradeButton
							href={`/#/exchange?inputCurrency=${
								row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
							}`}
							variant={theme.secondary}
						>
							{t("buttons.sell")}
						</Styled.TradeButton>

						<Styled.TradeButton
							href={`/#/exchange?inputCurrency=${
								row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address
							}&outputCurrency=0x7240aC91f01233BaAf8b064248E80feaA5912BA3`}
							disabled
							variant={theme.tertiary}
						>
							{t("buttons.convertTo", { symbol: "OCTO" })}
						</Styled.TradeButton>
						<Styled.TradeButton variant={theme.tertiary} disabled={true}>
							{t("buttons.convertTo", { symbol: "OCTO" })}
						</Styled.TradeButton>
					</>
				)}
			</div> */}
		</Page>
	);
};
