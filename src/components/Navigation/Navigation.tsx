import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Nav, NavDropdown } from "react-bootstrap";
import { navigation } from "../../constants/routes";
import * as Styled from "./styleds";

export const Navigation = () => {
	const { t } = useTranslation();

	return (
		<Nav className="me-auto ms-4">
			{navigation.map((route, index) => {
				if (route.path) {
					return (
						<Nav.Link
							as={Styled.HeaderItem}
							to={route.path}
							key={index}
							activeClassName={"active"}
							exact
							className="me-3"
							disabled={route.disabled}
						>
							{t(`menu.${route.title}`)}
						</Nav.Link>
					);
				} else if (route.routes) {
					return (
						<NavDropdown title={t(`menu.${route.title}`)} id={`dropdown-${index}`} key={index} align="end">
							{route.routes.map((item: any, index) => {
								return (
									<NavDropdown.Item
										as={Link}
										to={item.path}
										disabled={item.disabled}
										key={`${route.title}-${index}`}
									>
										{t(`menu.${item.title}`)}
									</NavDropdown.Item>
								);
							})}
						</NavDropdown>
					);
				} else {
					return false;
				}
			})}
		</Nav>
	);
};
