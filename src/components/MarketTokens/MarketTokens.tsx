import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Tab, Nav, Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import SVG from "react-inlinesvg";

import SearchIcon from "../../assets/images/search.svg";
import { ROUTE_MARKET } from "../../constants/routes";
import MarketApi from "../../http/market";
import { sortedData } from "../../lib/helper";
import { AppState } from "../../state";
import { fetchMarketCoins } from "../../state/market/actions";
import CoinDisplay from "../CoinDisplay";
import CurrencyText from "../CurrencyText";
import { InputGroup, InputGroupFormControl as FormControl, InputGroupText } from "../Form";
import ResponsiveTable from "../ResponsiveTable";
import * as Styled from "./styleds";

const api = new MarketApi();

const PAGE_SIZE = 100;
let typingInterval: any;

export const MarketTokens = () => {
	const history = useHistory();
	const [query, setQuery] = useState("");
	const [allTokens, setAllTokens] = useState([]);
	const { t } = useTranslation();
	const [sort, setSort] = useState({
		field: "market_cap",
		order: "desc",
	});
	const [page, setPage] = useState({
		page: 1,
		query: "",
		seeMore: false,
		hasMore: true,
	});

	const loader = useRef(null);
	const dispatch = useDispatch();
	const marketCoins = useSelector((state: AppState) => state.market.marketCoins);

	const allTokensData = useMemo(() => {
		return sortedData(allTokens, sort);
	}, [allTokens, sort]);

	const marketCoinsData = useMemo(() => {
		const filterText = query.trim().toLowerCase();
		let data;
		if (filterText.length > 0) {
			data = marketCoins.data.filter(
				(token: any) =>
					token.name.toLowerCase().indexOf(filterText) > -1 ||
					token.symbol.toLowerCase().indexOf(filterText) > -1
			);
		} else {
			data = marketCoins.data;
		}
		return sortedData(data, sort);
	}, [marketCoins, query, sort]);

	const observeAction = () => {
		setPage((p) => {
			const newPage = {
				...p,
			};
			if (p.page > 0 && p.page % 2 === 0) {
				newPage.seeMore = true;
			} else {
				newPage.page++;
			}
			return newPage;
		});
	};

	const handleObserver = (entities: any) => {
		const target = entities[0];
		if (target.isIntersecting) {
			observeAction();
		}
	};

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
	}, []);

	useEffect(() => {
		dispatch(fetchMarketCoins());
	}, [dispatch]);

	useEffect(() => {
		if (page.hasMore && !page.seeMore) {
			if (page.query === "") {
				api.get("all", {
					page: page.page,
					pageSize: PAGE_SIZE,
				})
					.then((response) => {
						if (response.hasOwnProperty("data")) {
							if (response.data.length < PAGE_SIZE) {
								setPage((p) => {
									return {
										...p,
										hasMore: false,
									};
								});
							}
							setAllTokens((tokens) => {
								if (page.page > 1) {
									return tokens.concat(response.data);
								}
								return response.data;
							});
						}
					})
					.catch((e) => {
						setAllTokens((tokens) => {
							if (page.page > 1) {
								return tokens;
							}
							return [];
						});
					});
			} else {
				clearTimeout(typingInterval);
				typingInterval = setTimeout(() => onSearchCoins(page), 400);
			}
		}
	}, [page, dispatch]);

	const columns = (hasPagination: boolean) => [
		{
			dataField: "id",
			text: "#",
			formatter: (cellContent: any, row: any) => {
				return row?.market_cap_rank;
			},
			sort: false,
		},
		{
			dataField: "name",
			text: t("tokens.assets"),
			formatter: (cellContent: any, row: any) => {
				return <CoinDisplay name={row?.name} symbol={row?.symbol} image={row?.image} />;
			},
			sort: true,
		},
		{
			dataField: "current_price",
			text: t("table.price"),
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText>
					<CurrencyText value={row.current_price} />
				</Styled.CellText>
			),
			sort: true,
		},
		{
			dataField: "price_change_percentage_24h",
			text: t("table.24_price"),
			formatter: (cellContent: any, row: any) => (
				<span className={row.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}>
					{row.price_change_percentage_24h ? `${row.price_change_percentage_24h.toFixed(2)}%` : "-"}
				</span>
			),
			sort: true,
		},
		{
			dataField: "price_change_percentage_7d_in_currency",
			text: t("tokensets.week"),
			formatter: (cellContent: any, row: any) => (
				<span className={row.price_change_percentage_7d_in_currency >= 0 ? "text-success" : "text-danger"}>
					{row.price_change_percentage_7d_in_currency
						? `${row.price_change_percentage_7d_in_currency.toFixed(2)}%`
						: "-"}
				</span>
			),
			sort: true,
		},
		{
			dataField: "price_change_percentage_30d_in_currency",
			text: t("tokensets.month"),
			formatter: (cellContent: any, row: any) => (
				<span className={row.price_change_percentage_30d_in_currency >= 0 ? "text-success" : "text-danger"}>
					{row.price_change_percentage_30d_in_currency
						? `${row.price_change_percentage_30d_in_currency.toFixed(2)}%`
						: "-"}
				</span>
			),
			sort: true,
		},
		{
			dataField: "price_change_percentage_1y_in_currency",
			text: t("tokensets.year"),
			formatter: (cellContent: any, row: any) => (
				<span className={row.price_change_percentage_1y_in_currency >= 0 ? "text-success" : "text-danger"}>
					{row.price_change_percentage_1y_in_currency
						? `${row.price_change_percentage_1y_in_currency.toFixed(2)}%`
						: "-"}
				</span>
			),
			sort: true,
		},
		{
			dataField: "market_cap",
			text: t("table.marketCap"),
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText>
					<CurrencyText value={row.market_cap || "-"} />
				</Styled.CellText>
			),
			sort: true,
		},
	];

	const rowEvents = {
		onClick: (e: any, row: any) => {
			history.push(`${ROUTE_MARKET}/${row.id}`);
		},
	};

	const onChangeTable = (type: string, context: any) => {
		if (type === "sort") {
			setSort({
				field: context.sortField,
				order: context.sortOrder,
			});
		}
	};

	const onSearchCoins = useCallback(async (settings) => {
		try {
			const coins = await api.get("search", {
				locale: "en",
				query: settings.query,
			});
			if (coins.length > 0) {
				const res = await api.get("searchedCoins", {
					ids: coins.map((coin: any) => coin.id),
					pageSize: PAGE_SIZE,
					page: settings.page,
				});

				if (res.hasOwnProperty("data")) {
					if (res.data.length < PAGE_SIZE) {
						setPage((p) => {
							return {
								...p,
								hasMore: false,
							};
						});
					}
					setAllTokens((tokens) => {
						if (settings.page > 1) {
							return tokens.concat(res.data);
						}
						return res.data;
					});
				}
			} else {
				setAllTokens((tokens) => {
					if (settings.page > 1) {
						return tokens;
					}
					return [];
				});
			}
		} catch (e) {
			setAllTokens((tokens) => {
				if (settings.page > 1) {
					return tokens;
				}
				return [];
			});
		}
	}, []);

	const onSearch = useCallback((e) => {
		const value = e.target.value.toLowerCase();
		setQuery(value);
		setPage((p) => {
			return {
				...p,
				page: 1,
				query: value,
				hasMore: true,
				seeMore: false,
			};
		});
	}, []);

	const onShowMore = () => {
		setPage((p) => {
			return {
				...p,
				page: p.page + 1,
				seeMore: false,
			};
		});
	};

	return (
		<Tab.Container defaultActiveKey="featured">
			<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-start justify-content-lg-between py-4 px-3">
				<Nav variant="pills">
					<Nav.Item>
						<Nav.Link eventKey="all">{t("allCoins")}</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="featured">{t("featuredCoins")}</Nav.Link>
					</Nav.Item>
				</Nav>

				<InputGroup className="w-auto mb-4 mb-lg-0" size="lg" bg={"darker"}>
					<InputGroupText>
						<SVG src={SearchIcon} />
					</InputGroupText>
					<FormControl id="MarketSearch" placeholder={t("search")} onChange={onSearch} />
				</InputGroup>
			</div>

			<Tab.Content className="bg-transparent">
				<Tab.Pane eventKey="all">
					<Styled.ExploreTableWrap>
						<BootstrapTable
							wrapperClasses="table-responsive d-none d-lg-block"
							bordered={false}
							classes="table table-head-custom table-borderless table-vertical-center overflow-hidden table-hover explore__table"
							bootstrap4
							remote
							keyField="id"
							columns={columns(true)}
							data={allTokensData}
							rowEvents={rowEvents}
							onTableChange={onChangeTable}
						/>
					</Styled.ExploreTableWrap>
					<ResponsiveTable
						centered
						size={"lg"}
						breakpoint={"lg"}
						columns={columns(true)}
						data={allTokensData}
						direction={"rtl"}
					/>

					<div className="d-flex align-items-center justify-content-center" ref={loader}>
						{page.hasMore || (allTokensData.length === 0 && page.page > 1) ? (
							page.seeMore ? (
								<div className="py-4">
									<Button variant={"primary"} onClick={onShowMore} size="lg">
										See More
									</Button>
								</div>
							) : (
								<div className="py-5">
									<Spinner animation="border" variant="primary" id="tokens-list" />
								</div>
							)
						) : null}
					</div>
				</Tab.Pane>

				<Tab.Pane eventKey="featured">
					<Styled.ExploreTableWrap>
						<BootstrapTable
							keyField="id"
							data={marketCoinsData}
							columns={columns(false)}
							rowEvents={rowEvents}
							bordered={false}
							striped
							hover
							remote
							onTableChange={onChangeTable}
						/>
					</Styled.ExploreTableWrap>
					<ResponsiveTable
						centered
						size={"lg"}
						breakpoint={"lg"}
						columns={columns(false)}
						data={marketCoinsData}
						direction={"rtl"}
					/>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};
