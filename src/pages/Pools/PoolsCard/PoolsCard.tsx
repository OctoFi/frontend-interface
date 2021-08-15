import { useState } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { useTranslation } from "react-i18next";
import { ResponsiveCard } from "../../../components/Card";
import { InputGroup, InputGroupText, InputGroupFormControl as FormControl } from "../../../components/Form";
import PoolsTab from "../PoolsTab";

export interface PoolsCardProps {
	onInvest?: () => void;
	onAddLiquidity?: (T: any, Y: any) => void;
	onRemoveLiquidity?: (T: any, Y: any) => void;
}

export const PoolsCard = ({ onInvest, onAddLiquidity, onRemoveLiquidity }: PoolsCardProps) => {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");

	const onSearch = (e: any) => {
		setQuery(e.target.value);
	};

	return (
		<ResponsiveCard>
			<div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between">
				<hgroup>
					<h3 className="fs-5">{t("pools.title")}</h3>
					<h4 className="fs-6 fw-normal text-muted">{t("pools.description")}</h4>
				</hgroup>

				<div className="card-toolbar d-flex flex-column-reverse flex-lg-row">
					<Button size="lg" onClick={onInvest} className="fs-5 px-4 me-0 me-lg-3 mt-3 mt-lg-0">
						{t("invest")} ETH
					</Button>

					<InputGroup bg={"darker"} size="lg">
						<InputGroupText>
							<Search size={20} />
						</InputGroupText>
						<FormControl id="PoolsSearch" placeholder={t("search")} onChange={onSearch} />
					</InputGroup>
				</div>
			</div>

			<div className="mt-4">
				<Tab.Container defaultActiveKey={"Uniswap"}>
					<Nav fill variant="pills">
						<Nav.Item>
							<Nav.Link eventKey="Uniswap" className="fs-6 py-3 text-white">
								Uniswap
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Balancer" className="fs-6 py-3 text-white">
								Balancer
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Curve" className="fs-6 py-3 text-white">
								Curve
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Yearn" className="fs-6 py-3 text-white">
								yEarn
							</Nav.Link>
						</Nav.Item>
					</Nav>

					<Tab.Content>
						<Tab.Pane eventKey="Uniswap">
							<PoolsTab
								type={"Uniswap"}
								onAddLiquidity={onAddLiquidity}
								onRemoveLiquidity={onRemoveLiquidity}
								query={query}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="Balancer">
							<PoolsTab
								type={"Balancer"}
								onAddLiquidity={onAddLiquidity}
								onRemoveLiquidity={onRemoveLiquidity}
								query={query}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="Curve">
							<PoolsTab
								type={"Curve"}
								onAddLiquidity={onAddLiquidity}
								onRemoveLiquidity={onRemoveLiquidity}
								query={query}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey="Yearn">
							<PoolsTab
								type={"Yearn"}
								onAddLiquidity={onAddLiquidity}
								onRemoveLiquidity={onRemoveLiquidity}
								query={query}
							/>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</div>
		</ResponsiveCard>
	);
};
