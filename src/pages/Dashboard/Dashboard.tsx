import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useActiveWeb3React } from "../../hooks";
import { emitter } from "../../lib/helper";
import { AppState } from "../../state";
import { fetchBalances, fetchTransformedBalances } from "../../state/balances/actions";
import { useMemoTokenBalances } from "../../state/balances/hooks";
import Page from "../../components/Page";
import AccountCard from "../../components/AccountCard";
import AssetModal from "../../components/AssetModal";
import { WalletModal } from "../../components/AssetModal/WalletModal";
import AssetTable from "../../components/AssetTable";
// import WalletTable from "../../components/AssetTable/WalletTable";
import WalletCard from "../../components/WalletCard";
import ChartCard from "../../components/ChartCard";
import Platforms from "../../components/Platforms";
import * as Styled from "./styleds";

export const Dashboard = () => {
	const { t } = useTranslation();
	const { account } = useActiveWeb3React();
	const overview = useSelector((state: AppState) => state.balances.overview);
	const loading = useSelector((state: AppState) => state.balances.loading);
	const balances = useSelector((state: AppState) => state.balances.data);
	const { ETH } = useSelector((state: AppState) => state.currency.currenciesRate);
	const dispatch = useDispatch();
	const walletBalances = useMemoTokenBalances();
	const history = useHistory();

	useEffect(() => {
		if (account) {
			dispatch(fetchBalances(account));
		}
	}, [account, dispatch]);

	useEffect(() => {
		dispatch(fetchTransformedBalances(balances, walletBalances, ETH));
	}, [balances, walletBalances, ETH, dispatch]);

	// const onClickToken = (token: any) => {
	// 	if (token.metadata.symbol === "ETH") {
	// 		history.push("/coins/ethereum");
	// 	} else {
	// 		history.push(`/coins/${token.metadata.address}`);
	// 		// history.push(`/coins/contract/${token.metadata.address}`);
	// 	}
	// };

	const onSelectCard = (asset: string) => {
		emitter.emit("open-modal", {
			action: () => {
				history.push("/dashboard");
				emitter.emit("close-modal");
			},
		});
		if (asset === "wallet") {
			history.push("/dashboard/assets");
		} else {
			history.push(`/dashboard/account/${asset}`);
		}
	};

	return (
		<Page title={undefined} networkSensitive={false}>
			<Row className="mb-3">
				<Col xs={12} lg={8} className="mb-3 mb-lg-0">
					<div className="mb-3">
						{/* TODO: replace with a Portfolio Balance Chart */}
						{/* <ChartCard /> */}
					</div>
					{/* <WalletCard /> */}
					{/* <WalletTable
						balances={overview.wallet.balances}
						size={"sm"}
						onClickToken={onClickToken}
						loading={!overview}
						show={overview}
					/> */}
				</Col>
				<Col xs={12} lg={4}>
					<AccountCard
						color={"primary"}
						title={t("netWorth")}
						value={overview.deposits.total + overview.wallet.total - overview.debts.total}
						type={"netWorth"}
						show={true}
						loading={loading}
					/>

					<AccountCard
						color={"secondary"}
						title={t("totalAssets")}
						value={overview.deposits.total + overview.wallet.total}
						type={"wallet"}
						show={true}
						loading={loading}
					/>

					{/*
					<AccountCard
						color={"primary"}
						title={overview.wallet.title}
						value={overview.wallet.total}
						type={overview.wallet.slug}
						show={true}
						loading={loading}
						onShowMore={() => onSelectCard(overview.wallet.slug)}
						assets={overview.wallet}
					>
						<WalletTable
							balances={overview.wallet.balances.slice(0, 5)}
							size={"sm"}
							onClickToken={onClickToken}
						/>
					</AccountCard>
					*/}

					<AccountCard
						color={"primary"}
						title={overview.deposits.title}
						value={overview.deposits.total}
						type={overview.deposits.slug}
						show={true}
						loading={loading}
						onShowMore={() => onSelectCard(overview.deposits.slug)}
						assets={overview.deposits}
					>
						<AssetTable size={"sm"} balances={overview.deposits.balances.slice(0, 5)} />
					</AccountCard>

					<AccountCard
						color={"secondary"}
						title={overview.debts.title}
						value={overview.debts.total}
						type={overview.debts.slug}
						show={true}
						loading={loading}
						onShowMore={() => onSelectCard(overview.debts.slug)}
						assets={overview.debts}
					>
						<AssetTable size={"sm"} balances={overview.debts.balances.slice(0, 5)} />
					</AccountCard>
				</Col>
			</Row>

			<Styled.RowTitle className={"h4"}>{t("platforms")}</Styled.RowTitle>
			<Platforms />

			{/* <Route path={"/dashboard/assets"} component={WalletModal} /> */}
			{/* <Route path={"/dashboard/account/:asset"} component={AssetModal} /> */}
		</Page>
	);
};
