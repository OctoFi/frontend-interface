import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";

import { fetchProposals, fetchSpaces } from "../../state/governance/actions";
import { shorten } from "../../state/governance/hooks";
import { formatProposals, getScores } from "../../lib/utils";
import { useActiveWeb3React } from "../../hooks";
import { ResponsiveCard } from "../../components/Card";
import Page from "../../components/Page";
import ResponsiveTable from "../../components/ResponsiveTable";
// import "../../components/UI/Button/style.scss";
import * as Styled from "./styleds";

const Proposals = (props) => {
	const { library } = useActiveWeb3React();
	const [selectedProposal, setSelectedProposal] = useState({});
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { spaces, loading: governanceLoading, proposals } = useSelector((state) => state.governance);
	const history = useHistory();
	const location = useLocation();
	const { space } = useParams();
	let currentSpace = spaces[space];

	useEffect(() => {
		if (Object.keys(spaces).length === 0) {
			dispatch(fetchSpaces());
		} else {
			if (spaces.hasOwnProperty(space)) {
				dispatch(fetchProposals(space));
			} else {
				history.push("/governance");
			}
		}
	}, [spaces, space, history, dispatch]);

	const transformProposals = async (proposals, space) => {
		if (proposals.hasOwnProperty(space)) {
			let result = {};
			const selected = proposals[space];
			const scores = await getScores(
				space,
				currentSpace.strategies,
				currentSpace.network,
				library,
				Object.values(selected).map((proposal) => proposal.address)
			);
			result = Object.fromEntries(
				Object.entries(selected).map((proposal) => {
					const transformed = [proposal[0], Object.assign({}, proposal[1])];
					transformed[1].score = scores.reduce((a, b) => a + (b[transformed[1].address] || 0), 0);
					return [transformed[0], transformed[1]];
				})
			);

			result = formatProposals(result);
			const transformedProposal = Object.fromEntries(
				Object.entries(result).sort((a, b) => b[1].msg.payload.end - a[1].msg.payload.end, 0)
			);
			setSelectedProposal(transformedProposal);
		} else {
			setSelectedProposal({});
		}
	};

	useEffect(() => {
		transformProposals(proposals, space);
	}, [proposals, space]);

	const rowEvents = {
		onClick: (e, row) => {
			history.push(`/governance/${space}/proposal/${row[0]}`);
		},
	};

	const columns = [
		{
			dataField: "asset",
			text: t("description"),
			formatter: (cellContent, row, rowIndex) => (
				<Styled.RowTitle>{shorten(row[1].msg.payload.name, "name")}</Styled.RowTitle>
			),
		},
		{
			dataField: "status",
			text: t("status"),
			formatter(cellContent, row) {
				const ts = (Date.now() / 1e3).toFixed();
				const { start, end } = row[1].msg.payload;
				let state =
					ts > end
						? { title: "Closed", className: "label-light-danger", responsiveClassName: "text-danger" }
						: ts > start
						? { title: "Active", className: "label-light-success", responsiveClassName: "text-success" }
						: { title: "Pending", className: "label-light-info", responsiveClassName: "text-info" };
				return (
					<>
						<span className={`label ${state.className} label-lg d-none d-lg-flex w-100 label-inline py-3`}>
							{state.title}
						</span>
						<Styled.StatusText className={`d-flex d-lg-none ${state.responsiveClassName}`}>
							{state.title}
						</Styled.StatusText>
					</>
				);
			},
		},
		{
			dataField: "start",
			text: t("startDate"),
			formatter(cellContent, row) {
				return (
					<Styled.CellText>
						{moment(row[1].msg.payload.start * 1e3).format("YYYY/MM/DD HH:mm")}
					</Styled.CellText>
				);
			},
		},
		{
			dataField: "end",
			text: t("endDate"),
			formatter(cellContent, row) {
				return (
					<Styled.CellText>{moment(row[1].msg.payload.end * 1e3).format("YYYY/MM/DD HH:mm")}</Styled.CellText>
				);
			},
		},
		{
			dataField: "author",
			text: t("author"),
			formatter(cellContent, row) {
				return (
					<Styled.CellText>
						{row[1].address.slice(0, 6)}...{row[1].address.slice(-4)}
					</Styled.CellText>
				);
			},
		},
	];

	const actions = {
		dataField: "actions",
		text: t("table.actions"),
		formatter(cellContent, row) {
			return (
				<div className="d-flex flex-column align-items-stretch align-items-lg-center justify-content-center w-100">
					<Styled.StyledLink to={`/governance/${space}/proposal/${row[0]}`}>
						<Styled.TradeButton>{t("viewMore")}</Styled.TradeButton>
					</Styled.StyledLink>
				</div>
			);
		},
		isAction: true,
	};

	return (
		<Page title={t("governance.title")} networkSensitive={false}>
			<Row>
				<Col xs={12}>
					<ResponsiveCard>
						<Styled.Header>
							<Styled.Title className="card-title">{t("governance.proposals")}</Styled.Title>
							<Styled.NewButton
								to={`${location.pathname}/create`}
								className="bg-light-primary d-none d-md-flex"
							>
								{t("createNew")}
							</Styled.NewButton>
							<Styled.GradientButton
								to={`${location.pathname}/create`}
								className=" btn btn-primary btn-gradient-primary d-flex d-md-none"
							>
								{t("createNew")}
							</Styled.GradientButton>
						</Styled.Header>
						<div>
							{governanceLoading ? (
								<div className="d-flex align-items-center justify-content-center py-5 w-100">
									<Spinner animation="border" variant="primary" id="proposals" />
								</div>
							) : (
								<>
									<Styled.ProposalsTableWrap>
										<BootstrapTable
											wrapperClasses="table-responsive d-none d-lg-block"
											bordered={false}
											classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
											bootstrap4
											remote
											keyField="id"
											columns={columns}
											data={Object.entries(selectedProposal)}
											rowEvents={rowEvents}
										/>
									</Styled.ProposalsTableWrap>
									<ResponsiveTable
										breakpoint={"lg"}
										direction={"rtl"}
										columns={columns.concat(actions)}
										data={Object.entries(selectedProposal)}
										headerIndex={0}
									/>
								</>
							)}
						</div>
					</ResponsiveCard>
				</Col>
			</Row>
		</Page>
	);
};

export default Proposals;
