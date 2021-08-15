import styled from "styled-components";
import { Button } from "react-bootstrap";

export const Hero = styled.section`
	// #f969cd
	background-image: linear-gradient(90deg, #4235d0 0%, ${({ theme }) => theme.primary} 188%);
	padding: 1rem 0 6rem;
	position: relative;
	margin: -2rem -1rem 0;
	min-height: 40vh;

	@media (min-width: 768px) {
		min-height: 75vh;
		padding: 5rem 0 12rem;
	}
`;

export const Image = styled.img`
	width: 320px;
	height: auto;
`;

export const Title = styled.h1`
	margin-top: 1rem;
	font-size: 1.875rem;
	margin-bottom: 1.5rem;

	@media (min-width: 768px) {
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}
`;

export const CtaButton = styled(Button)`
	padding: 0.875rem 1.5rem;
	font-weight: 500;
`;

export const WavePosition = styled.div`
	position: absolute;
	bottom: -1px;
	width: 100%;

	svg {
		fill: ${({ theme }) => theme.bg1};
	}
`;
