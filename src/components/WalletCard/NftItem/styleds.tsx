import { Link } from "react-router-dom";
import styled from "styled-components";

export const Item = styled(Link)`
	min-width: 8rem;
	max-width: 10rem;
	display: block;
	margin-bottom: 1rem;
	text-decoration: none;
`;

export const Thumbnail = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 12px;
`;

export const Name = styled.h3`
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	font-size: 0.875rem;
	margin-top: 0.5rem;
	text-align: center;
`;

export const Description = styled.p`
	color: ${({ theme }) => theme.text1};
	font-size: 0.75rem;

	@media (min-width: 992px) {
		font-size: 0.875rem;
	}
`;

export const CollectionLogo = styled.img`
	width: 1.5rem;
	height: auto;
	border-radius: 50%;
`;
