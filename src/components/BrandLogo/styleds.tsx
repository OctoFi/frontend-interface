import styled from "styled-components";
import { Link } from "react-router-dom";

export const CustomLink = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none !important;
	position: relative;
	margin-right: 0;
`;

export const Logo = styled.img`
	width: 35px;
	height: 25px;
	margin-right: 6px;
`;
