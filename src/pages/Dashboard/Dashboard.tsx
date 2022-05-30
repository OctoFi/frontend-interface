import { useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ROUTE_DASHBOARD } from "../../constants/routes";
import { useActiveWeb3React } from "../../hooks";
import { emitter } from "../../lib/helper";
import { AppState } from "../../state";
import { fetchBalances } from "../../state/balances/actions";
import Page from "../../components/Page";
import AccountCard from "../../components/AccountCard";
import AssetModal from "../../components/AssetModal";
import AssetTable from "../../components/AssetTable";
// import ChartCard from "../../components/ChartCard";
import Platforms from "../../components/Platforms";
import WalletCard from "../../components/WalletCard";
import * as Styled from "./styleds";

export const Dashboard = () => {
	const { t } = useTranslation();
	const { account } = useActiveWeb3React();
	const dispatch = useDispatch();
	const history = useHistory();
	const overview = useSelector((state: AppState) => state.balances.overview);
	const loading = useSelector((state: AppState) => state.balances.loading);

	useEffect(() => {
		if (account) {
			dispatch(fetchBalances(account));
		}
	}, [account, dispatch]);

	const onSelectCard = (asset: string) => {
		emitter.emit("open-modal", {
			action: () => {
				history.push(ROUTE_DASHBOARD);
				emitter.emit("close-modal");
			},
		});

		history.push(`${ROUTE_DASHBOARD}/account/${asset}`);
	};

	return (
		<Page>
			<Row className="mb-3">
				<Col xs={12} lg={8} className="mb-3 mb-lg-0">
					{/* TODO: replace with a Portfolio Balance Chart */}
					{/* <ChartCard /> */}
					<WalletCard />
				</Col>
				<Col xs={12} lg={4}>
					<ListGroup>
						<ListGroup.Item className="bg-transparent">
							<AccountCard
								color={"primary"}
								title={t("netWorth")}
								value={overview.deposits.total + overview.wallet.total - overview.debts.total}
								type={"netWorth"}
								loading={loading}
							/>
						</ListGroup.Item>
						<ListGroup.Item className="bg-transparent">
							<AccountCard
								color={"secondary"}
								title={t("totalAssets")}
								value={overview.deposits.total + overview.wallet.total}
								type={"wallet"}
								loading={loading}
							/>
						</ListGroup.Item>
						<ListGroup.Item className="bg-transparent">
							<AccountCard
								color={"primary"}
								title={overview.deposits.title}
								value={overview.deposits.total}
								type={"deposits"}
								loading={loading}
								onShowMore={() => onSelectCard(overview.deposits.slug)}
								assets={overview.deposits}
							>
								<AssetTable size={"sm"} balances={overview.deposits.balances.slice(0, 5)} />
							</AccountCard>
						</ListGroup.Item>
						<ListGroup.Item className="bg-transparent">
							<AccountCard
								color={"secondary"}
								title={overview.debts.title}
								value={overview.debts.total}
								type={"debts"}
								loading={loading}
								onShowMore={() => onSelectCard(overview.debts.slug)}
								assets={overview.debts}
							>
								<AssetTable size={"sm"} balances={overview.debts.balances.slice(0, 5)} />
							</AccountCard>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>

			<Styled.RowTitle className={"h4"}>{t("platforms")}</Styled.RowTitle>
			<Platforms />

			<Route path={`${ROUTE_DASHBOARD}/account/:asset`} component={AssetModal} />
		</Page>
	);
};
