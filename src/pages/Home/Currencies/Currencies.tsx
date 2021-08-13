import { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import SVG from "react-inlinesvg";
import Skeleton from "react-loading-skeleton";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import { ROUTE_MARKETS_EXPLORE } from "../../../constants/routes";
import { CustomCard } from "../../../components/Card";
import SearchIcon from "../../../assets/images/search.svg";
import MarketApi from "../../../http/market";
import CurrencyText from "../../../components/CurrencyText";
import SparklineChart from "../../../components/SparklineChart";
import { InputGroupFormControl as FormControl, InputGroup, InputGroupText } from "../../../components/Form";
import CoinDisplay from "../../../components/CoinDisplay";
// import CurrencyText from "../../../components/CurrencyText";
import * as Styled from "./styleds";

const marketApi = new MarketApi();

let typingInterval: ReturnType<typeof setTimeout>;

export const Currencies = () => {
	const defaultCoins = process.env.REACT_APP_FEATURED_COINS?.split(",") || [];
	const [coins, setCoins] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
	const [query, setQuery] = useState("");
	const { t } = useTranslation();
	const history = useHistory();

	const getSearchedCoins = useCallback(async (query) => {
		try {
			const coins = await marketApi.get("search", {
				locale: "en",
				query: query,
			});
			if (coins.length > 0) {
				const res = await marketApi.get("searchedCoins", {
					ids: coins.slice(0, 10).map((coin: any) => coin.id),
					pageSize: 10,
				});

				if (res.hasOwnProperty("data")) {
					setCoins(res.data.slice(0, 10));
				}
			} else {
				setCoins([]);
			}
		} catch (e) {
			setCoins([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
		}
	}, []);

	useEffect(() => {
		if (query === "") {
			marketApi
				.get("searchedCoins", {
					page: 1,
					pageSize: 10,
					ids: defaultCoins,
				})
				.then((response) => {
					if (response.hasOwnProperty("data")) {
						setCoins(response.data);
					}
				})
				.catch((e) => {
					setCoins([]);
				});
		} else {
			clearTimeout(typingInterval);
			typingInterval = setTimeout(() => getSearchedCoins(query), 300);
		}
	}, [query]);

	const columnRank = {
		dataField: "id",
		text: "#",
		formatter: (cell: any, row: any) => {
			return row?.market_cap_rank;
		},
		sort: false,
	};

	const columnName = {
		dataField: "name",
		text: t("name"),
		formatter: (cell: any, row: any) => {
			return <CoinDisplay name={row?.name} symbol={row?.symbol} image={row?.image} />;
		},
	};

	const columnPrice = {
		dataField: "price",
		text: t("table.price"),
		formatter: (cell: any, row: any) => {
			return (
				<span>
					{row.hasOwnProperty("current_price") ? (
						<CurrencyText value={row?.current_price} />
					) : (
						<Skeleton width={isMobile ? 50 : 80} height={32} />
					)}
				</span>
			);
		},
	};

	const column24hChange = {
		dataField: "price_change",
		text: t("table.24_price"),
		formatter: (cell: any, row: any) => {
			const data = row?.price_change_percentage_24h?.toFixed(2);
			return row.hasOwnProperty("current_price") ? (
				<span className={`${data > 0 ? "text-success" : "text-danger"}`}>
					{data > 0 ? "+" : ""}
					{data ? `${data}%` : ""}
				</span>
			) : (
				<Skeleton width={80} height={32} />
			);
		},
	};

	const columnMktCap = {
		dataField: "mkt_cap",
		text: t("table.marketCap"),
		formatter: (cell: any, row: any) => {
			const data = row?.market_cap;
			return row.hasOwnProperty("current_price") ? (
				<CurrencyText value={data} />
			) : (
				<Skeleton width={80} height={32} />
			);
		},
	};

	const columnSparkline = {
		dataField: "sparkline",
		text: t("last7Days"),
		formatter: (cell: any, row: any) => {
			const data = row?.sparkline_in_7d?.price;

			return row.hasOwnProperty("sparkline_in_7d") ? (
				<SparklineChart
					data={data}
					theme={row.price_change_percentage_7d_in_currency >= 0 ? "primary" : "secondary"}
				/>
			) : (
				<Skeleton width={120} height={40} />
			);
		},
		style: {
			width: 180,
		},
	};

	const columns = [columnRank, columnName, columnPrice, column24hChange, columnSparkline];
	const mobileColumns = [columnName, columnPrice, column24hChange];

	const rowEvents = {
		onClick: (e: any, row: any) => {
			history.push(`/market/${row?.id}`);
		},
	};

	const onSearch = (event: any) => setQuery(event.target.value);

	return (
		<Styled.Wrapper>
			<div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between mb-4">
				<div className="d-flex align-items-start justify-content-between mb-3 mb-lg-0">
					<h2 className="mr-auto mb-0">{t("tokens.assets")}</h2>
					<Link to={"/invest/tokens"} className={"d-flex d-lg-none"}>
						<Button variant="link">{t("tokens.allAssets")}</Button>
					</Link>
				</div>

				<InputGroup className="w-auto" size="lg">
					<InputGroupText>
						<SVG src={SearchIcon} />
					</InputGroupText>
					<FormControl
						id="search-currencies"
						placeholder={t("search")}
						onChange={onSearch}
						value={query}
						className={"form-control--currency"}
					/>
				</InputGroup>
			</div>

			<CustomCard>
				{coins.length > 0 ? (
					<>
						<Styled.TableWrap>
							<BootstrapTable
								keyField="id"
								data={coins}
								columns={isMobile ? mobileColumns : columns}
								rowEvents={rowEvents}
								bordered={false}
								striped
								hover
							/>
						</Styled.TableWrap>

						<Styled.GotoMarketContainer>
							<Button as={Link} variant={"primary"} to={ROUTE_MARKETS_EXPLORE}>
								{t("tokens.allAssets")}
							</Button>
						</Styled.GotoMarketContainer>
					</>
				) : (
					<div className="py-4 font-size-base font-weight-medium d-flex align-items-center justify-content-center">
						{t("tokens.noToken")}
					</div>
				)}
			</CustomCard>
		</Styled.Wrapper>
	);
};
