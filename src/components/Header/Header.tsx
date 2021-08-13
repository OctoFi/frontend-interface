import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import LogoImage from "../../assets/images/logo.svg";
import BrandLogo from "../BrandLogo";
import Navigation from "../Navigation";

export const Header = () => {
	return (
		<Navbar bg="primary" variant="dark" className="py-3">
			<Container fluid>
				<Navbar.Brand as={NavLink} to="/">
					<BrandLogo logo={LogoImage} name="OctoFi" />
				</Navbar.Brand>

				<Navigation />
			</Container>
		</Navbar>
	);
};
