import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { ROUTE_DASHBOARD } from "../../constants/routes";
import { AppState } from "../../state";
import defiSdk from "../../utils/getDefiSdk";
import AssetTable from "../../components/AssetTable";
import Card from "../../components/Card";
import Page from "../../components/Page";
import ValueCard from "../../components/ValueCard";

export const Platform = () => {
	const { platform } = useParams();
	const history = useHistory();
	const balances = useSelector((state: AppState) => state.balances.transformedBalance);
	const [selectedPlatform, setSelectedPlatform] = useState();
	const [totalAssets, setTotalAssets] = useState(0);
	const [totalDebts, setTotalDebts] = useState(0);

	useEffect(() => {
		defiSdk.getProtocolNames().then((protocols) => {
			if (!protocols.includes(platform)) {
				history.push(ROUTE_DASHBOARD);
			}
		});
	}, [platform]);

	useEffect(() => {
		const plat = balances.find((item: any) => {
			return item.metadata.name === platform;
		});
		if (plat) {
			setSelectedPlatform(plat);
			const temp = {
				assets: 0,
				debts: 0,
			};
			plat.balances.forEach((balance) => {
				if (balance.metadata.type === "Debt") {
					temp.debts += balance.total;
				} else {
					temp.assets += balance.total;
				}
			});
			setTotalAssets(temp.assets);
			setTotalDebts(temp.debts);
		}
	}, [balances, platform]);

	return (
		<Page title={platform} networkSensitive={true}>
			<Row>
				<Col xs={12} md={4}>
					<ValueCard title={"Supplied Total"} value={totalAssets} type={"assets"} />
				</Col>
				<Col xs={12} md={4}>
					<ValueCard title={"Borrowed Total"} value={totalDebts} type={"debts"} />
				</Col>
				<Col xs={12} md={4}>
					<ValueCard title={"Net"} value={selectedPlatform ? selectedPlatform.total : 0} type={"netWorth"} />
				</Col>
			</Row>
			<Row>
				{selectedPlatform &&
					selectedPlatform.balances.map((asset) => {
						let data = asset.balances || [];
						return (
							<Col xs={12}>
								<Card
									header={true}
									title={asset.metadata.type}
									table={true}
									marginTop={20}
									style={{ marginBottom: 10 }}
								>
									<AssetTable balances={data} />
								</Card>
							</Col>
						);
					})}
			</Row>
		</Page>
	);
};
