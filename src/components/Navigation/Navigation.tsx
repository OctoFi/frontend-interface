import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { routes } from "../../constants/headerRoutes";
import * as Styled from "./styleds";

export const Navigation = () => {
	const { t } = useTranslation();

	return (
		<Navbar bg="light" variant="light" sticky="top">
			<Container>
				<Nav className="mx-auto">
					{Object.keys(routes).map((key, index) => {
						// @ts-ignore
						const r = routes[key];
						if (r.hasOwnProperty("path")) {
							return (
								<Nav.Link
									as={Styled.HeaderItem}
									to={r.path}
									key={index}
									activeClassName={"active"}
									exact
								>
									{t(`menu.${r.title}`)}
								</Nav.Link>
							);
						} else {
							return (
								<NavDropdown title={t(`menu.${r.title}`)} id={`dropdown-${index}`} key={index}>
									{Object.values(r.routes).map((item: any, index) => {
										return (
											<NavDropdown.Item as={Link} to={item.path} key={`${r.title}-${index}`}>
												{t(`menu.${item.title}`)}
											</NavDropdown.Item>
										);
									})}
								</NavDropdown>
							);
							// return <HeaderDropdown title={r.title} items={r.routes} key={index} />;
						}
					})}
				</Nav>
			</Container>
		</Navbar>
	);
};
