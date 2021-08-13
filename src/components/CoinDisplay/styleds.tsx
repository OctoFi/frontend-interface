import styled from "styled-components";
import Img from "../UI/Img";

export const CoinIcon = styled(Img)`
	width: 1.5rem;
	height: 1.5rem;

	@media (min-width: 992px) {
		width: 2rem;
		height: 2rem;
	}
`;

export const CoinName = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	text-transform: capitalize;

	@media (min-width: 768px) {
		font-size: 1rem;
	}
`;

export const CoinSymbol = styled.span`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.text3};
	text-transform: uppercase;

	@media (min-width: 768px) {
		font-size: 0.875rem;
	}
`;
