import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import { AppState } from "../../state";
import { fetchTokens } from "../../state/explore/actions";
import CurrencyLogo from "../Logo/CurrencyLogo";
import CurrencyText from "../CurrencyText";
import ResponsiveTable from "../ResponsiveTable";
import * as Styled from "./styleds";

const TokenSetsExploreTable = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const exploreSets = useSelector((state: AppState) => state.explore);

	useEffect(() => {
		if (exploreSets.tokenSets.data.length === 0) {
			dispatch(fetchTokens());
		}

		setData(exploreSets.tokenSets.data);
		setLoading(false);
	}, [exploreSets, dispatch]);

	const columns = [
		{
			dataField: "id",
			text: "ID",
			formatter: (cellContent: any, row: any, rowIndex: number) => (
				<Styled.CellText className="fw-bold">{rowIndex + 1}</Styled.CellText>
			),
		},

		{
			dataField: "name",
			text: "NAME",
			formatter: (cellContent: any, row: any, rowIndex: number) => (
				<div
					key={rowIndex}
					className="d-flex flex-row-reverse flex-lg-row align-items-start align-items-lg-center py-lg-2 pr-lg-4"
				>
					{row.image ? (
						<Styled.Logo src={row.image} alt={row.name} />
					) : (
						<Styled.LogoContainer>
							<CurrencyLogo currency={row.currency} />
						</Styled.LogoContainer>
					)}
					<div className="d-flex flex-column justify-content-center ms-lg-3 me-3 me-lg-0">
						<Styled.TokenSetCustomTitle className={"fw-bold"}>{row.name}</Styled.TokenSetCustomTitle>
					</div>
				</div>
			),
			style: {
				maxWidth: 250,
			},
			notCentered: true,
		},
		{
			dataField: "price_usd",
			text: "CURRENT PRICE",
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText className={`label label-inline label-lg label-light-success`}>
					<CurrencyText value={row.price_usd} />
				</Styled.CellText>
			),
		},
		{
			dataField: "components",
			text: "ASSETS",
			formatter: (cellContent: any, row: any) => (
				<div className="d-flex align-items-center">
					{row.components.map((comp: any, index: number) => {
						return (
							<Styled.CellText key={`cell-${index}`} className={`me-lg-4 ms-2 fs-6`}>
								{comp.symbol}
							</Styled.CellText>
						);
					})}
				</div>
			),
		},
		{
			dataField: "natural_units",
			text: "NATURAL UNITS",
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText className="fw-bold">{row.natural_unit}</Styled.CellText>
			),
		},
		{
			dataField: "unit_shares",
			text: "UNIT SHARES",
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText className="fw-bold">{row.unit_shares}</Styled.CellText>
			),
		},
		{
			dataField: "market_cap",
			text: "MARKET CAP",
			formatter: (cellContent: any, row: any) => (
				<Styled.CellText>
					<CurrencyText value={row.market_cap} />
				</Styled.CellText>
			),
		},
	];

	if (loading) {
		return (
			<div className="d-flex align-items-center justify-content-center py-5">
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	if (data.length === 0) {
		return <h2>No data to display</h2>;
	}

	return (
		<>
			<Styled.ExploreTable>
				<BootstrapTable
					wrapperClasses="table-responsive d-none d-lg-block"
					bordered={false}
					classes="table table-head-custom table-borderless table-vertical-center overflow-hidden table-hover"
					bootstrap4
					remote
					keyField="id"
					columns={columns}
					data={data.slice(0, 100)}
				></BootstrapTable>
			</Styled.ExploreTable>

			<ResponsiveTable
				centered
				size={"lg"}
				breakpoint={"lg"}
				columns={columns}
				data={data.slice(0, 100)}
				direction={"rtl"}
			/>
		</>
	);
};

export default TokenSetsExploreTable;
