import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import ResponsiveTable from "../ResponsiveTable";
import TokenSetsApi from "../../http/tokenSet";
import Img from "../UI/Img";
import CurrencyText from "../CurrencyText";
import * as Styled from "./styleds";

const api = new TokenSetsApi();

const TokenSetTab = (props) => {
	const [sets, setSets] = useState([]);
	const [setsHistorical, setSetsHistorical] = useState([]);
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	const { active, tabKey } = props;

	const getTokenSets = async (key) => {
		let data;
		setLoading(true);
		try {
			if (key === "portfolios") {
				const res = await api.fetchPortfolios();
				data = res.data.portfolios;
				let ids = data.map((row) => row.address);
				const historicalRes = await api.getTokenSetsHistorical(ids);

				setSetsHistorical(historicalRes);
			} else {
				const res = await api.fetchAllSets();
				data = res.data.rebalancing_sets;
				let ids = data.map((row) => row.address);
				const historicalRes = await api.getTokenSetsHistorical(ids);

				setSetsHistorical(historicalRes);
			}

			setSets(data);
		} catch (e) {
			setSets([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (active && sets.length === 0) {
			getTokenSets(tabKey);
		}
	}, [active, tabKey]);

	const columns = [
		{
			dataField: "name",
			text: t("name"),
			formatter: (cellContent, row) => {
				return (
					<div className="d-flex align-items-center flex-row-reverse flex-lg-row">
						<Styled.LogoContainer>
							<Img src={row.image} alt={row.name} />
						</Styled.LogoContainer>
						<Styled.Title>{row.name}</Styled.Title>
					</div>
				);
			},
		},
		{
			dataField: "market_cap",
			text: t("table.marketCap"),
			formatter: (cellContent, row) => {
				return (
					<Styled.CellText>
						<CurrencyText value={row.market_cap} />
					</Styled.CellText>
				);
			},
		},
		{
			dataField: "price",
			text: t("table.price"),
			formatter: (cellContent, row) => {
				return (
					<Styled.CellBoldText>
						<CurrencyText value={row.price_usd} />
					</Styled.CellBoldText>
				);
			},
		},
		{
			dataField: "24h_changes",
			text: t("tokensets.oneDay"),
			formatter: (cellContent, row, index, { historical }) => {
				const h = historical[index] || {};

				return (
					<Styled.CellText
						className={h?.market_data?.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}
					>
						{(h.market_data?.price_change_percentage_24h &&
							h?.market_data?.price_change_percentage_24h.toFixed(2) + "%") ||
							"-"}
					</Styled.CellText>
				);
			},
			formatExtraData: {
				historical: setsHistorical,
			},
		},
		{
			dataField: "7d_changes",
			text: t("tokensets.week"),
			formatter: (cellContent, row, index, { historical }) => {
				const h = historical[index] || {};

				return (
					<Styled.CellText
						className={h?.market_data?.price_change_percentage_7d >= 0 ? "text-success" : "text-danger"}
					>
						{(h.market_data?.price_change_percentage_7d &&
							h?.market_data?.price_change_percentage_7d.toFixed(2) + "%") ||
							"-"}
					</Styled.CellText>
				);
			},
			formatExtraData: {
				historical: setsHistorical,
			},
		},
		{
			dataField: "30d_changes",
			text: t("tokensets.month"),
			formatter: (cellContent, row, index, { historical }) => {
				const h = historical[index] || {};

				return (
					<Styled.CellText
						className={h?.market_data?.price_change_percentage_30d >= 0 ? "text-success" : "text-danger"}
					>
						{(h.market_data?.price_change_percentage_30d &&
							h?.market_data?.price_change_percentage_30d.toFixed(2) + "%") ||
							"-"}
					</Styled.CellText>
				);
			},
			formatExtraData: {
				historical: setsHistorical,
			},
		},
		{
			dataField: "200d_changes",
			text: t("tokensets.sixMonth"),
			formatter: (cellContent, row, index, { historical }) => {
				const h = historical[index] || {};

				return (
					<Styled.CellText
						className={h?.market_data?.price_change_percentage_200d >= 0 ? "text-success" : "text-danger"}
					>
						{(h.market_data?.price_change_percentage_200d &&
							h?.market_data?.price_change_percentage_200d.toFixed(2) + "%") ||
							"-"}
					</Styled.CellText>
				);
			},
			formatExtraData: {
				historical: setsHistorical,
			},
		},
		{
			dataField: "1y_changes",
			text: t("tokensets.year"),
			formatter: (cellContent, row, index, { historical }) => {
				const h = historical[index] || {};

				return (
					<Styled.CellText
						className={h?.market_data?.price_change_percentage_1y >= 0 ? "text-success" : "text-danger"}
					>
						{(h.market_data?.price_change_percentage_1y &&
							h?.market_data?.price_change_percentage_1y.toFixed(2) + "%") ||
							"-"}
					</Styled.CellText>
				);
			},
			formatExtraData: {
				historical: setsHistorical,
			},
		},
	];

	const rowEvents = {
		onClick: (e, row) => {
			window.open(
				`https://www.tokensets.com/${tabKey === "portfolios" ? "portfolio" : "set"}/${row.id}`,
				"_blank"
			);
		},
	};

	if (loading) {
		return (
			<div className="w-100 h-100 d-flex align-items-center justify-content-center py-5">
				<Spinner animation="border" variant="primary" id={`token-sets-${tabKey || "rebalancing"}`} />
			</div>
		);
	}

	if (sets.length === 0) {
		return <h2>No Token Sets</h2>;
	}

	return (
		<>
			<Styled.TokenSetsTableWrap>
				<BootstrapTable
					wrapperClasses="table-responsive d-none d-lg-block"
					bordered={false}
					classes="table table-head-custom table-vertical-center table-hover overflow-hidden"
					bootstrap4
					remote
					keyField="id"
					data={sets === null ? [] : sets}
					columns={columns}
					rowEvents={rowEvents}
				></BootstrapTable>
			</Styled.TokenSetsTableWrap>
			<ResponsiveTable breakpoint={"lg"} columns={columns} data={sets} direction={"rtl"} />
		</>
	);
};

export default TokenSetTab;
