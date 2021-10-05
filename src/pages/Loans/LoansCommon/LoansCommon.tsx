import { useTranslation } from "react-i18next";
import { Nav, Tab } from "react-bootstrap";

import { ResponsiveCard } from "../../../components/Card";
// import LendingBalance from "../LendingBalance";
// import BorrowBalance from "../LoansBalance";
import * as Styled from "./styleds";

export const PureLoansCommon = () => {
	const { t } = useTranslation();

	return (
		<ResponsiveCard>
			<Tab.Container defaultActiveKey="deposit">
				<Nav variant="pills" className="mb-4">
					<Nav.Item>
						<Styled.NavLink eventKey="deposit" className="py-3 px-4">
							{t("deposit")}
						</Styled.NavLink>
					</Nav.Item>
					<Nav.Item className="ms-2">
						<Styled.NavLink eventKey="borrow" className="py-3 px-4">
							{t("borrow.title")}
						</Styled.NavLink>
					</Nav.Item>
				</Nav>

				<Tab.Content>
					<Tab.Pane eventKey="deposit">{/* <LendingBalance /> */}</Tab.Pane>
					<Tab.Pane eventKey="borrow">{/* <BorrowBalance /> */}</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</ResponsiveCard>
	);
};
