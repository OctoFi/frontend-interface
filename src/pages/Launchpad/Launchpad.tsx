import { useState } from "react";
import { useTranslation } from "react-i18next";
import SVG from "react-inlinesvg";
import { Row, Col, Tab } from "react-bootstrap";

import SearchIcon from "../../assets/images/search.svg";
import Upcoming from "../../assets/images/launchpad/upcoming.svg";
import Live from "../../assets/images/launchpad/live.svg";
import Failed from "../../assets/images/launchpad/failed.svg";
import Success from "../../assets/images/launchpad/success.svg";
import { usePresales } from "../../hooks/usePresale";
import Page from "../../components/Page";
import { InputGroup } from "../../components/Form";
import PresaleTab from "./PresaleTab";
import * as Styled from "./styleds";

export const Launchpad = () => {
	const [query, setQuery] = useState("");
	const { t } = useTranslation();
	const presales = usePresales();

	return (
		<Page title={""} networkSensitive={true}>
			<Row>
				<Col xs={{ span: 12, offset: 0 }} md={{ span: 6, offset: 3 }}>
					<Styled.CustomCard>
						<Styled.Title>{t("launchpad.title")}</Styled.Title>

						<div className={"d-flex align-items-stretch flex-column mb-3"}>
							<div className="align-self-end mb-3">
								<Styled.CreateNew to={"/launchpad/new"}>{t("launchpad.createNew")}</Styled.CreateNew>
							</div>
							<InputGroup bg={"darker"}>
								<Styled.FormControl
									id={"launchpad-search"}
									value={query}
									onChange={(e: any) => setQuery(e.target.value)}
									placeholder={t("launchpad.searchPlaceholder")}
								/>
								<Styled.GroupText>
									<SVG src={SearchIcon} />
								</Styled.GroupText>
							</InputGroup>
						</div>

						<Tab.Container defaultActiveKey={"upcoming"}>
							<Styled.CustomNav
								fill
								variant="pills"
								className={"d-flex flex-row align-items-center flex-nowrap"}
							>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="upcoming">
										<SVG src={Upcoming} width={24} height={24} />
										<Styled.CustomNavTitle>Upcoming</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="live">
										<SVG src={Live} width={24} height={24} />
										<Styled.CustomNavTitle>Live</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="success">
										<SVG src={Success} width={24} height={24} />
										<Styled.CustomNavTitle>Success</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="failed">
										<SVG src={Failed} width={24} height={24} />
										<Styled.CustomNavTitle>Failed</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
							</Styled.CustomNav>

							<Styled.Description>{t("launchpad.blockNumberWarning")}</Styled.Description>

							<Tab.Content className={"bg-transparent"}>
								<Tab.Pane eventKey="upcoming">
									<PresaleTab state={0} presales={presales} query={query} />
								</Tab.Pane>
								<Tab.Pane eventKey="live">
									<PresaleTab state={1} presales={presales} query={query} />
								</Tab.Pane>
								<Tab.Pane eventKey="success">
									<PresaleTab state={2} presales={presales} query={query} />
								</Tab.Pane>
								<Tab.Pane eventKey="failed">
									<PresaleTab state={3} presales={presales} query={query} />
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Styled.CustomCard>
				</Col>
			</Row>
		</Page>
	);
};
