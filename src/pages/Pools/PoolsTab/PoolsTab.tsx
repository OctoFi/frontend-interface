import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import PlatformLogo from "../../../components/Logo/PlatformLogo";
import { sortedData } from "../../../lib/helper";
import CurrencyText from "../../../components/CurrencyText";
import { fetchPools } from "../../../state/pools/actions";
import ExchangeIcon from "../../../components/Icons/Exchange";
import { PoolsTable } from "../PoolsTable/PoolsTable";
import { AppState } from "../../../state";
import { shorten } from "../../../state/governance/hooks";
import { usePoolsBalances } from "../../../state/pools/hooks";
import { useActiveWeb3React } from "../../../hooks";
import * as Styled from "./styleds";

export interface PoolsTabProps {
	query?: string;
	type?: any;
	onAddLiquidity?: any;
	onRemoveLiquidity?: any;
}

export const PoolsTab = ({ query = "", type, onAddLiquidity, onRemoveLiquidity }: PoolsTabProps) => {
	const { t } = useTranslation();
	const { account } = useActiveWeb3React();
	const loader = useRef(null);
	const [page, setPage] = useState(1);
	const [virtualPage, setVirtualPage] = useState(1);
	const [sort, setSort] = useState({
		field: false,
		order: "desc",
	});
	// const [pools, setPools] = useState([]);
	const pools = useSelector((state: AppState) => state.pools);
	const dispatch = useDispatch();
	const [seeMore, setSeeMore] = useState(false);
	const [shownListLength, setShownListLength] = useState(0);

	const filterHandler = useCallback(() => {
		if (query.length === 0) {
			return pools;
		} else {
			return pools.filter((pool) => JSON.stringify(pool).toLowerCase().includes(query.toLowerCase()));
		}
	}, [query, pools]);

	const filteredPools = useMemo(() => {
		const data = filterHandler().slice(0, virtualPage * 10);
		setShownListLength(data.length);
		return data;
	}, [query, virtualPage, pools]);

	const sortedPools = useMemo(() => {
		return sortedData(filteredPools, sort);
	}, [filteredPools, sort]);

	const balances = usePoolsBalances(
		account,
		filteredPools.map((pool: any) => pool.id || pool.address),
		type
	);

	// const fetchPools = (type: any, options: any) => dispatch(fetchPools(type, options));

	const onFetchPools = async () => {
		const res = await fetchPools(type || "Uniswap", {
			pageSize: 200,
			page: page,
		});
		if (res) {
			setPools((pools) => pools.concat(res));
		}
	};

	useEffect(() => {
		onFetchPools();
	}, [page]);

	useEffect(() => {
		setVirtualPage(1);
	}, [query]);

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
		if (shownListLength < virtualPage * 10 && !props.pools[type].isFinished) {
			setPage((page) => page + 1);
		}
	}, [shownListLength, pools]);

	const showMorePools = () => {
		setVirtualPage((vp) => {
			let listLength = shownListLength;
			setShownListLength((ln) => {
				listLength = ln;
				return ln;
			});
			setSeeMore(false);
			if (((vp + 1) % 20 === 0 && !props.pools[type].isFinished) || listLength < vp * 10) {
				setPage((p) => p + 1);
			}
			return vp + 1;
		});
	};

	const observeAction = () => {
		setVirtualPage((vp) => {
			let listLength = shownListLength;
			setShownListLength((ln) => {
				listLength = ln;
				return ln;
			});
			if (vp > 0 && vp % 3 === 0) {
				setSeeMore(true);
				return vp;
			} else {
				if (((vp + 1) % 20 === 0 && !props.pools[type].isFinished) || listLength < vp * 10) {
					setPage((p) => p + 1);
				}
				return vp + 1;
			}
		});
	};

	const handleObserver = (entities) => {
		const target = entities[0];
		if (target.isIntersecting) {
			observeAction();
		}
	};

	const onTableChange = (type, context) => {
		if (type === "sort") {
			setSort({
				field: context.sortField,
				order: context.sortOrder,
			});
		}
	};

	let columns = {
		Uniswap: [
			{
				dataField: "id",
				text: "ID",
				formatter: (cellContent, row, rowIndex) => (
					<span className="fw-bold d-block">{rowIndex + 1}</span>
				),
			},
			{
				dataField: "poolName",
				text: t("pools.availablePools"),
				formatter: (cellContent, row, rowIndex) => {
					return (
						<div
							key={rowIndex}
							className="d-flex flex-row-reverse flex-lg-row align-items-center flex-row py-0 py-lg-3"
						>
							<PlatformLogo size={32} platform={"uniswap"} name={"Uniswap-v2"} />
							<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
								<Styled.CustomTitle>
									{row.token0?.symbol}-{row.token1?.symbol}
								</Styled.CustomTitle>
								<Styled.PlatformName>Uniswap-v2</Styled.PlatformName>
							</div>
						</div>
					);
				},
			},
			{
				dataField: "totalSupply",
				text: t("pools.totalSupply"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.totalSupply} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "volumeUSD",
				text: t("pools.volume"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.volumeUSD} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "txCount",
				text: t("pools.txnCount"),
				formatter: (cellContent, row) => <Styled.Text>{row.txCount}</Styled.Text>,
				sort: true,
			},
			{
				dataField: "actions",
				text: "",
				formatter: (cellContent, row, rowIndex, { addLiquidityDialog, balances, removeLiquidityDialog }) => {
					const pool = {
						poolName: `${row.token0?.symbol}-${row.token1?.symbol}`,
						token0: row.token0,
						token1: row.token1,
						address: row.id,
					};
					return (
						<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-end flex-grow-1 flex-lg-grow-0">
							{Number(balances[0][row.id]) > 0 ? (
								<Styled.WithdrawButton
									className="mt-2 mt-lg-0 me-0 me-lg-2"
									onClick={() => removeLiquidityDialog("Uniswap", pool)}
								>
									{t("pools.withdraw")}
								</Styled.WithdrawButton>
							) : null}
							<Styled.AddLiquidityButton onClick={() => addLiquidityDialog("Uniswap", pool)}>
								{t("pools.addLiquidity")}
							</Styled.AddLiquidityButton>
						</div>
					);
				},
				formatExtraData: {
					addLiquidityDialog: onAddLiquidity,
					removeLiquidityDialog: onRemoveLiquidity,
					balances: balances,
				},
			},
		],
		Balancer: [
			{
				dataField: "id",
				text: "ID",
				formatter: (cellContent, row, rowIndex) => (
					<span className="fw-bold d-block">{rowIndex + 1}</span>
				),
			},
			{
				dataField: "poolName",
				text: t("pools.availablePools"),
				formatter: (cellContent, row, rowIndex) => {
					return (
						<div
							key={rowIndex}
							className="d-flex flex-row-reverse flex-lg-row align-items-center flex-row py-0 py-lg-3"
						>
							<PlatformLogo size={32} platform={"balancer"} name={"balancer"} />
							<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
								<Styled.CustomTitle>{row.tokens.map((t) => t.symbol).join("-")}</Styled.CustomTitle>
								<Styled.PlatformName>Balancer</Styled.PlatformName>
							</div>
						</div>
					);
				},
			},
			{
				dataField: "liquidity",
				text: t("pools.liquidity"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.liquidity} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "totalSwapVolume",
				text: t("pools.totalSwapVolume"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.totalSwapVolume} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "swapFee",
				text: t("pools.swapFee"),
				formatter: (cellContent, row) => <Styled.Text>{row.swapFee}</Styled.Text>,
				sort: true,
			},
			{
				dataField: "actions",
				text: "",
				formatter: (cellContent, row, rowIndex, { addLiquidityDialog, balances, removeLiquidityDialog }) => {
					const pool = {
						poolName: row.tokens.map((t) => t.symbol).join("-"),
						address: row.id,
					};
					return (
						<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-end flex-grow-1 flex-lg-grow-0">
							{Number(balances[0][row.id]) > 0 ? (
								<Styled.WithdrawButton
									className="mt-2 mt-lg-0 me-0 me-lg-2"
									onClick={() => removeLiquidityDialog("Balancer", pool)}
								>
									{t("pools.withdraw")}
								</Styled.WithdrawButton>
							) : null}
							<Styled.AddLiquidityButton onClick={() => addLiquidityDialog("Balancer", pool)}>
								{t("pools.addLiquidity")}
							</Styled.AddLiquidityButton>
						</div>
					);
				},
				formatExtraData: {
					addLiquidityDialog: onAddLiquidity,
					removeLiquidityDialog: onRemoveLiquidity,
					balances: balances,
				},
			},
		],
		Curve: [
			{
				dataField: "id",
				text: "ID",
				formatter: (cellContent, row, rowIndex) => (
					<span className="fw-bold d-block">{rowIndex + 1}</span>
				),
			},
			{
				dataField: "poolName",
				text: t("pools.availablePools"),
				formatter: (cellContent, row, rowIndex) => {
					return (
						<div
							key={rowIndex}
							className="d-flex flex-row-reverse flex-lg-row align-items-center flex-row py-0 py-lg-3"
						>
							<PlatformLogo size={32} platform={"curve"} name={"Curve"} />
							<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
								<Styled.CustomTitle>
									{row.poolToken
										? row.poolToken.name
										: row.coins?.length > 0
										? row.coins?.map((c) => c.symbol).join("-")
										: shorten(row.address, "name")}
								</Styled.CustomTitle>
								<Styled.PlatformName>Curve</Styled.PlatformName>
							</div>
						</div>
					);
				},
			},
			{
				dataField: "virtualPrice",
				text: t("pools.virtualPrice"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.virtualPrice} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "fee",
				text: t("pools.fee"),
				formatter: (cellContent, row) => <Styled.Text>{row.fee}</Styled.Text>,
				sort: true,
			},
			{
				dataField: "actions",
				text: "",
				formatter: (cellContent, row, rowIndex, { addLiquidityDialog, balances, removeLiquidityDialog }) => {
					const pool = {
						poolName: row.poolToken
							? row.poolToken.name
							: row.coins?.length > 0
							? row.coins?.map((c) => c.symbol).join("-")
							: shorten(row.address, "name"),
						address: row.address,
					};
					return (
						<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-end flex-grow-1 flex-lg-grow-0">
							{Number(balances[0][row.id]) > 0 ? (
								<Styled.WithdrawButton
									className="mt-2 mt-lg-0 me-0 me-lg-2"
									onClick={() => removeLiquidityDialog("Curve", pool)}
								>
									{t("pools.withdraw")}
								</Styled.WithdrawButton>
							) : null}
							<Styled.AddLiquidityButton onClick={() => addLiquidityDialog("Curve", pool)}>
								{t("pools.addLiquidity")}
							</Styled.AddLiquidityButton>
						</div>
					);
				},
				formatExtraData: {
					addLiquidityDialog: onAddLiquidity,
					removeLiquidityDialog: onRemoveLiquidity,
					balances: balances,
				},
			},
		],
		Yearn: [
			{
				dataField: "id",
				text: "ID",
				formatter: (cellContent, row, rowIndex) => (
					<span className="fw-bold d-block">{rowIndex + 1}</span>
				),
			},
			{
				dataField: "poolName",
				text: t("pools.availablePools"),
				formatter: (cellContent, row, rowIndex) => {
					return (
						<div
							key={rowIndex}
							className="d-flex flex-row-reverse flex-lg-row align-items-center flex-row py-0 py-lg-3"
						>
							<PlatformLogo size={32} platform={"yearn"} name={"yearn"} />
							<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
								<Styled.CustomTitle>
									{row.shareToken ? row.shareToken.name : row.underlyingToken.name}
								</Styled.CustomTitle>
								<Styled.PlatformName>yEarn</Styled.PlatformName>
							</div>
						</div>
					);
				},
			},
			{
				dataField: "totalSupply",
				text: t("pools.totalSupply"),
				formatter: (cellContent, row) => (
					<Styled.Text>
						<CurrencyText value={row.totalSupply} />
					</Styled.Text>
				),
				sort: true,
			},
			{
				dataField: "available",
				text: t("pools.totalSupply"),
				formatter: (cellContent, row) => <Styled.Text>{Number(row.available).toFixed(6)}</Styled.Text>,
				sort: true,
			},
			{
				dataField: "vaultBalance",
				text: t("pools.vaultBalance"),
				formatter: (cellContent, row) => <Styled.Text>{Number(row.vaultBalance).toFixed(6)}</Styled.Text>,
				sort: true,
			},
			{
				dataField: "actions",
				text: "",
				formatter: (cellContent, row, rowIndex, { addLiquidityDialog, balances, removeLiquidityDialog }) => {
					const pool = {
						poolName: row.shareToken ? row.shareToken.name : row.underlyingToken.name,
						address: row.id,
					};
					return (
						<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-end flex-grow-1 flex-lg-grow-0">
							{Number(balances[0][row.id]) > 0 ? (
								<Styled.WithdrawButton
									className="mt-2 mt-lg-0 me-0 me-lg-2"
									onClick={() => removeLiquidityDialog("Yearn", pool)}
								>
									{t("pools.withdraw")}
								</Styled.WithdrawButton>
							) : null}
							<Styled.AddLiquidityButton onClick={() => addLiquidityDialog("Yearn", pool)}>
								{t("pools.addLiquidity")}
							</Styled.AddLiquidityButton>
						</div>
					);
				},
				formatExtraData: {
					addLiquidityDialog: onAddLiquidity,
					removeLiquidityDialog: onRemoveLiquidity,
					balances: balances,
				},
			},
		],
	};

	return (
		<>
			{(!props.pools[type].loading || pools.length > 1) && (
				<PoolsTable entities={sortedPools} columns={columns[type]} onTableChange={onTableChange} />
			)}
			{props.pools[type].isFinished && filteredPools.length === 0 && (
				<div className="d-flex flex-column align-items-center justify-content-center py-8 px-4">
					<ExchangeIcon size={48} fill={"#6993FF"} />
					<h5 className="text-primary fw-bolder mb-3 mt-5">
						There is no <strong>Pool</strong> in <strong>{type}</strong> platform
					</h5>
					<span className="text-muted fw-light fs-5">{t("pools.chooseAnotherPool")}</span>
				</div>
			)}
			<div className="d-flex align-items-center justify-content-center" ref={loader}>
				{!props.pools[type].isFinished || (filteredPools.length === 0 && page > 1) ? (
					seeMore ? (
						<div className="py-4">
							<button className="btn btn-light-primary py-3" onClick={showMorePools}>
								{t("seeMore")}
							</button>
						</div>
					) : (
						<div className="py-5">
							<Spinner animation="border" variant="primary" id={`pool-${type}`} />
						</div>
					)
				) : null}
			</div>
		</>
	);
};
