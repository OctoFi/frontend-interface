import { Container, Navbar } from "react-bootstrap";
import { ButtonToolbar } from "./ButtonToolbar";

export const PureToolbar = () => {
	return (
		<Navbar sticky="top" as="div" role="toolbar">
			<Container fluid={false}>
				<ButtonToolbar />
			</Container>
		</Navbar>
	);
};
