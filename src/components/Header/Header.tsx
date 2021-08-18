import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { ROUTE_DEFAULT } from "../../constants/routes";
import LogoImage from "../../assets/images/logo.svg";
import BrandLogo from "../BrandLogo";
import Navigation from "../Navigation";

export interface PureHeaderProps {
	dark?: boolean;
}

export const PureHeader = ({ dark = false }: PureHeaderProps) => {
	return (
		<Navbar variant={dark ? "dark" : "light"} className="py-4">
			<Container fluid={false}>
				<Navbar.Brand as={NavLink} to={ROUTE_DEFAULT}>
					<BrandLogo logo={LogoImage} name="OctoFi" />
				</Navbar.Brand>

				<Navigation />
			</Container>
		</Navbar>
	);
};
