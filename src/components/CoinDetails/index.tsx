import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";
import dompurify from "dompurify";

import { useActiveWeb3React } from "../../hooks";
import useTheme from "../../hooks/useTheme";
import { useTokenContract } from "../../hooks/useContract";
import { AppState } from "../../state";
import { useIsDarkMode } from "../../state/user/hooks";
import { fetchSelectedCoin, fetchHistoricalData } from "../../state/market/actions";
import Card, { ResponsiveCard } from "../Card";
import HistoricalChart from "../HistoricalChart";
import { CoinInformation } from "./CoinInformation/CoinInformation";
import { CoinStats } from "./CoinStats/CoinStats";
import { CoinChanges } from "./CoinChanges/CoinChanges";

const CoinDetails = () => {
	const { account } = useActiveWeb3React();
	const theme = useTheme();
	const darkMode = useIsDarkMode();
	const dispatch = useDispatch();
	const marketData = useSelector((state: AppState) => state.market);
	const [walletBalance, setWalletBalance] = useState<number>(0);
	const selected = marketData.selected.data || false;
	const tokenContract = useTokenContract(selected.contract_address);
	const { id } = useParams();

	useEffect(() => {
		if (tokenContract) {
			tokenContract.decimals().then((decimals: any) => {
				tokenContract.balanceOf(account).then((response: any) => {
					const balance = response.toString();
					setWalletBalance(balance / 10 ** decimals);
				});
			});
		}
	}, [tokenContract, account]);

	useEffect(() => {
		dispatch(fetchSelectedCoin(id));

		dispatch(fetchHistoricalData(id));
	}, [dispatch, id]);

	const coinAbout = useMemo(() => {
		if (selected) {
			return dompurify?.sanitize(selected.description?.en);
		}

		return "";
	}, [selected]);

	if (marketData?.selected?.loading) {
		return (
			<Card>
				<div className={"d-flex align-items-center justify-content-center"} style={{ height: 400 }}>
					<Spinner animation="border" variant="primary" />
				</div>
			</Card>
		);
	}

	return (
		<>
			<ResponsiveCard>
				<HistoricalChart
					isPrimary={true}
					theme={theme}
					darkMode={darkMode}
					field={"prices"}
					data={marketData.historical.data}
					loading={marketData.historical.loading}
					description={`${selected && selected.name} Historical Price`}
					days={marketData.historical.days}
					currentData={selected && selected.market_data.current_price.usd}
				/>
			</ResponsiveCard>

			<Row>
				<Col xs={12} md={6}>
					<ResponsiveCard>
						<HistoricalChart
							theme={theme}
							darkMode={darkMode}
							field={"market_caps"}
							data={marketData.historical.data}
							loading={marketData.historical.loading}
							days={marketData.historical.days}
							description={`${selected && selected.name} Historical Market Cap`}
							currentData={selected && selected.market_data.market_cap.usd}
							minHeight={250}
						/>
					</ResponsiveCard>
				</Col>
				<Col xs={12} md={6}>
					<ResponsiveCard>
						<HistoricalChart
							theme={theme}
							darkMode={darkMode}
							field={"total_volumes"}
							data={marketData.historical.data}
							loading={marketData.historical.loading}
							days={marketData.historical.days}
							minHeight={250}
							description={`${selected && selected.name} Historical Total Volume`}
							currentData={selected && selected.market_data.total_volume.usd}
						/>
					</ResponsiveCard>
				</Col>
			</Row>

			<CoinChanges coin={selected} />

			<div className="mb-3">
				<CoinStats coin={selected} />
			</div>

			<div className="mb-3">
				<Card header={true} title={"About"}>
					<div dangerouslySetInnerHTML={{ __html: coinAbout }} />
				</Card>
			</div>

			<div className="mb-3">
				<CoinInformation coin={selected} />
			</div>
		</>
	);
};

export default CoinDetails;
