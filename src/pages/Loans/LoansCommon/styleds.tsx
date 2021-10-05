import styled from "styled-components";
import { Nav } from "react-bootstrap";

export const NavLink = styled(Nav.Link)`
	background-color: ${({ theme }) => theme.primaryLight} !important;
	color: ${({ theme }) => theme.primary};
	font-weight: 500;

	&:hover {
		color: ${({ theme }) => theme.primary};
	}

	&.active {
		background-color: ${({ theme }) => theme.primary} !important;
		color: ${({ theme }) => theme.text1};
	}
`;
