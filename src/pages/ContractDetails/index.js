import { useEffect, useMemo, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dompurify from "dompurify";
import styled from "styled-components";

import CustomCard, { CustomHeader, CustomTitle } from "../../components/CustomCard";
import HistoricalChart from "../../components/HistoricalChart";
import { useActiveWeb3React } from "../../hooks";
import { useTokenContract } from "../../hooks/useContract";
import useTheme from "../../hooks/useTheme";
import { AppState } from "../../state";
import { useDarkModeManager } from "../../state/user/useDarkModeManager";
import { fetchContractHistoricalData, fetchSelectedContract } from "../../state/market/actions";
import CurrencyText from "../../components/CurrencyText";

const LoadingCol = styled(Col)`
	background-color: ${({ theme }) => theme.bg1};
`;

const ContractDetails = (props) => {
	const { account } = useActiveWeb3React();
	const theme = useTheme();
	const [darkMode] = useDarkModeManager();
	const dispatch = useDispatch();
	const marketData = useSelector((state: AppState) => state.market);
	const [walletBalance, setWalletBalance] = useState(false);
	const selected = marketData.selected.data || false;
	const { contract } = useParams();
	const tokenContract = useTokenContract(contract);

	useEffect(() => {
		if (tokenContract) {
			tokenContract.decimals().then((decimals) => {
				tokenContract.balanceOf(account).then((response) => {
					const balance = response.toString();
					setWalletBalance(balance / 10 ** decimals);
				});
			});
		}
	}, [tokenContract, account]);

	useEffect(() => {
		dispatch(fetchSelectedContract(contract));

		dispatch(fetchContractHistoricalData(contract, 30));
	}, [dispatch, contract]);

	const changeRangeHandler = (days) => {
		dispatch(fetchContractHistoricalData(contract, days));
	};

	const contractAbout = useMemo(() => {
		if (selected) {
			return dompurify.sanitize(selected?.description?.en);
		}

		return "";
	}, [selected?.description?.en]);

	return marketData.selected.loading ? (
		<Row>
			<LoadingCol
				xs={12}
				className={"d-flex align-items-center justify-content-center rounded"}
				style={{ padding: "120px 0" }}
			>
				<Spinner animation="border" role="status" variant={"primary"}>
					<span className="sr-only">Loading...</span>
				</Spinner>
			</LoadingCol>
		</Row>
	) : (
		<>
			<Row>
				{selected && typeof walletBalance !== "boolean" && (
					<Col xs={12} className={"gutter-b"}>
						<CustomCard>
							<div className="card-body d-flex align-items-center justify-content-between">
								<CustomTitle className={"card-title text-muted mb-0"}>
									Your "{selected.name}" Balance
								</CustomTitle>
								<div className="card-title mb-0 fw-bold fs-5">
									{selected.symbol.toUpperCase()} {walletBalance.toFixed(6)}{" "}
									<span className="text-muted">
										(
										<CurrencyText value={walletBalance * selected.market_data.current_price.usd} />)
									</span>
								</div>
							</div>
						</CustomCard>
					</Col>
				)}
				<Col xs={12} className={"gutter-b"}>
					<CustomCard>
						{selected && selected.contract_address && (
							<CustomHeader className="card-header d-flex align-items-center justify-content-between">
								<CustomTitle className={"card-title"}>
									Do you want to Exchange {selected.name}?
								</CustomTitle>
								<div className="d-flex align-items-center justify-content">
									<Link
										to={`/exchange?outputCurrency=${selected.contract_address}`}
										className="btn btn-outline-success me-2"
									>
										Buy
									</Link>
									<Link
										to={`/exchange?inputCurrency=${selected.contract_address}`}
										className="btn btn-outline-danger"
									>
										Sell
									</Link>
								</div>
							</CustomHeader>
						)}

						<div className="card-body px-0 pt-0">
							<HistoricalChart
								theme={theme}
								darkMode={darkMode}
								variant={"primary"}
								color={theme.primary}
								series={[
									{
										name: "Price",
										data: marketData.historical.data.prices,
									},
								]}
								loading={marketData.historical.loading}
								description={`${selected && selected.name} Historical Price`}
								days={marketData.historical.days}
								currentData={selected && selected.market_data.current_price.usd}
								changeRangeHandler={changeRangeHandler}
							/>
						</div>
					</CustomCard>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body px-0 pt-0">
							<HistoricalChart
								theme={theme}
								darkMode={darkMode}
								variant={"success"}
								color={theme.green1}
								series={[
									{
										name: "Market Cap",
										data: marketData.historical.data.market_caps,
									},
								]}
								loading={marketData.historical.loading}
								days={marketData.historical.days}
								description={`${selected && selected.name} Historical Market Cap`}
								currentData={selected && selected.market_data.market_cap.usd}
								minHeight={250}
								changeRangeHandler={changeRangeHandler}
							/>
						</div>
					</CustomCard>
				</Col>
				<Col xs={12} md={6} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body px-0 pt-0">
							<HistoricalChart
								theme={theme}
								darkMode={darkMode}
								variant={"warning"}
								color={theme.yellow2}
								series={[
									{
										name: "Total Volume",
										data: marketData.historical.data.total_volumes,
									},
								]}
								loading={marketData.historical.loading}
								days={marketData.historical.days}
								minHeight={250}
								description={`${selected && selected.name} Historical Total Volume`}
								currentData={selected && selected.market_data.total_volume.usd}
								changeRangeHandler={changeRangeHandler}
							/>
						</div>
					</CustomCard>
				</Col>
			</Row>
			<Row>
				<Col lg={3} md={6} xs={12} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body">
							<div
								className={`fw-bolder fs-3 mt-3 ${
									selected && selected.market_data.price_change_percentage_24h >= 0
										? "text-success"
										: "text-danger"
								}`}
							>
								{selected && Number(selected.market_data.price_change_percentage_24h).toFixed(4)}%
							</div>
							<span className="text-muted text-hover-primary fw-bold fs-5 mt-1">
								Daily Changes Percentage
							</span>
						</div>
					</CustomCard>
				</Col>
				<Col lg={3} md={6} xs={12} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body">
							<div
								className={`fw-bolder fs-3 mt-3 ${
									selected && selected.market_data.price_change_percentage_7d >= 0
										? "text-success"
										: "text-danger"
								}`}
							>
								{selected && Number(selected.market_data.price_change_percentage_7d).toFixed(4)}%
							</div>
							<span className="text-muted text-hover-primary fw-bold fs-5 mt-1">
								Weekly Changes Percentage
							</span>
						</div>
					</CustomCard>
				</Col>
				<Col lg={3} md={6} xs={12} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body">
							<div
								className={`fw-bolder fs-3 mt-3 ${
									selected && selected.market_data.price_change_percentage_30d >= 0
										? "text-success"
										: "text-danger"
								}`}
							>
								{selected && Number(selected.market_data.price_change_percentage_30d).toFixed(4)}%
							</div>
							<span className="text-muted text-hover-primary fw-bold fs-5 mt-1">
								Monthly Changes Percentage
							</span>
						</div>
					</CustomCard>
				</Col>
				<Col lg={3} md={6} xs={12} className={"gutter-b"}>
					<CustomCard>
						<div className="card-body">
							<div
								className={`fw-bolder fs-3 mt-3 ${
									selected && selected.market_data.price_change_percentage_1y >= 0
										? "text-success"
										: "text-danger"
								}`}
							>
								{selected && Number(selected.market_data.price_change_percentage_1y).toFixed(4)}%
							</div>
							<span className="text-muted text-hover-primary fw-bold fs-5 mt-1">
								Yearly Changes Percentage
							</span>
						</div>
					</CustomCard>
				</Col>
			</Row>
			<Row>
				<Col xs={12} className={"gutter-b"}>
					<CustomCard>
						<CustomHeader className={"card-header"}>
							<CustomTitle className={"card-title"}>Coin Stats</CustomTitle>
						</CustomHeader>
						<div className="card-body d-flex align-items-center justify-content-between row pb-2">
							<Col xs={12} md={4} className={"d-flex flex-column justify-content-center gutter-b"}>
								<span className="text-muted fs-6 fw-bold mb-2">Market Cap</span>
								<span className="fs-4 fw-bolder">
									${selected && selected.market_data.market_cap.usd}
								</span>
							</Col>
							<Col xs={12} md={4} className={"d-flex flex-column justify-content-center gutter-b"}>
								<span className="text-muted fs-6 fw-bold mb-2">All time High</span>
								<span className="fs-4 fw-bolder text-success">
									${selected && selected.market_data.ath.usd}
								</span>
							</Col>
							<Col xs={12} md={4} className={"d-flex flex-column justify-content-center gutter-b"}>
								<span className="text-muted fs-6 fw-bold mb-2">All Time Low</span>
								<span className="fs-4 fw-bolder text-danger">
									${selected && selected.market_data.atl.usd}
								</span>
							</Col>
						</div>
					</CustomCard>
				</Col>
			</Row>
			<Row>
				<Col xs={12} className={"gutter-b"}>
					<CustomCard>
						<CustomHeader className={"card-header"}>
							<CustomTitle className={"card-title"}>About</CustomTitle>
						</CustomHeader>
						<div className="card-body">
							<div className="text-muted" dangerouslySetInnerHTML={{ __html: contractAbout }} />
						</div>
					</CustomCard>
				</Col>
				<Col xs={12} className={"gutter-b"}>
					<CustomCard>
						<CustomHeader className={"card-header"}>
							<CustomTitle className={"card-title"}>Coin Information</CustomTitle>
						</CustomHeader>
						<div className="card-body">
							<Row>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Currency Name</span>
										</Col>
										<Col xs={8}>
											<span className="fw-normal text-muted fs-5">
												{selected && selected.name}
											</span>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Symbol</span>
										</Col>
										<Col xs={8}>
											<span className="fw-normal text-muted fs-5">
												{selected && selected.symbol.toUpperCase()}
											</span>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Website</span>
										</Col>
										<Col xs={8}>
											<a
												href={selected && selected.links.homepage[0]}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected && selected.links.homepage[0]}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Whitepaper</span>
										</Col>
										<Col xs={8}>
											<a
												href={
													selected && selected.ico_data
														? selected.ico_data.links.whitepaper
														: "#"
												}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected && selected.ico_data
													? selected.ico_data.links.whitepaper
													: "-"}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Block Explorer</span>
										</Col>
										<Col xs={8}>
											<a
												href={selected && (selected.links.blockchain_site[0] || "#")}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected && (selected.links.blockchain_site[0] || "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Github</span>
										</Col>
										<Col xs={8}>
											<a
												href={selected && (selected.links.repos_url.github[0] || "#")}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected && (selected.links.repos_url.github[0] || "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Twitter</span>
										</Col>
										<Col xs={8}>
											<a
												href={
													selected &&
													(selected.links.twitter_screen_name
														? `https://twitter.com/${selected.links.twitter_screen_name}`
														: "#")
												}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected &&
													(selected.links.twitter_screen_name
														? `https://twitter.com/${selected.links.twitter_screen_name}`
														: "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Facebook</span>
										</Col>
										<Col xs={8}>
											<a
												href={
													selected &&
													(selected.links.facebook_username
														? `https://facebook.com/${selected.links.facebook_username}`
														: "#")
												}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected &&
													(selected.links.facebook_username
														? `https://facebook.com/${selected.links.facebook_username}`
														: "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Reddit</span>
										</Col>
										<Col xs={8}>
											<a
												href={selected && (selected.links.subreddit_url || "#")}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected && (selected.links.subreddit_url || "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Telegram</span>
										</Col>
										<Col xs={8}>
											<a
												href={
													selected &&
													(selected.links.telegram_channel_identifier
														? `https://t.me/${selected.links.telegram_channel_identifier}`
														: "#")
												}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected &&
													(selected.links.telegram_channel_identifier
														? `https://t.me/${selected.links.telegram_channel_identifier}`
														: "-")}
											</a>
										</Col>
									</Row>
								</Col>
								<Col xs={12} md={6} className={"py-3"}>
									<Row>
										<Col xs={4}>
											<span className="fw-bolder fs-5">Bitcoin Talk</span>
										</Col>
										<Col xs={8}>
											<a
												href={
													selected &&
													(selected.links.bitcointalk_thread_identifier
														? `https://bitcointalk.org/index.php?topic=${selected.links.bitcointalk_thread_identifier}`
														: "#")
												}
												className="fw-normal text-muted fs-5"
												target={"_blank"}
												rel={"noopener noreferrer"}
											>
												{selected &&
													(selected.links.bitcointalk_thread_identifier
														? `https://bitcointalk.org/index.php?topic=${selected.links.bitcointalk_thread_identifier}`
														: "-")}
											</a>
										</Col>
									</Row>
								</Col>
							</Row>
						</div>
					</CustomCard>
				</Col>
			</Row>
		</>
	);
};

export default ContractDetails;
