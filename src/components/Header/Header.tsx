import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Settings } from "react-feather";
// import { useTheme } from "../../hooks/useTheme";
import LogoImage from "../../assets/images/logo.svg";
// import BrandLogo from "../BrandLogo";
import WalletSidebar from "../WalletSidebar";

export const Header = () => {
	// const { theme } = useTheme();

	return (
		<Navbar bg="primary" variant="dark" className="py-3">
			<Container fluid>
				{/* <BrandLogo logo={LogoImage} name={"OctoFi"} /> */}
				{/* TODO: remove hardcoded name */}
				<Navbar.Brand href="/">
					<img alt="OctoFi" src={LogoImage} width="30" height="30" className="d-inline-block align-top" />{" "}
					OctoFi
				</Navbar.Brand>

				<Nav className="me-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
				</Nav>
				<div className="d-flex align-items-center">
					{/* color={theme.text2} */}
					<Button as={NavLink} variant="primary" to={"/settings"} isActive={() => false}>
						<Settings size={20} />
					</Button>

					<WalletSidebar />
				</div>
			</Container>
		</Navbar>
	);
};
