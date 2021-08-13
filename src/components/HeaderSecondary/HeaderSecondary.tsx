import React from "react";
import { NavLink } from "react-router-dom";
import { Settings } from "react-feather";
import { Container, Navbar, Button } from "react-bootstrap";
import { ROUTE_SETTINGS } from "../../constants/routes";
import WalletSidebar from "../WalletSidebar";

export const HeaderSecondary = () => {
	return (
		<Navbar bg="light" variant="light" sticky="top" as="div" role="toolbar">
			<Container fluid>
				<div className="d-flex align-items-center ms-auto">
					<Button as={NavLink} variant="light" to={ROUTE_SETTINGS}>
						<Settings size={20} />
					</Button>

					<WalletSidebar />
				</div>
			</Container>
		</Navbar>
	);
};
