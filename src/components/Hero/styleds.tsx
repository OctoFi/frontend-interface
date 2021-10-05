import styled from "styled-components";
import { Button } from "react-bootstrap";

export const Hero = styled.section`
	// #f969cd
	background-image: linear-gradient(90deg, #4235d0 0%, ${({ theme }) => theme.primary} 188%);
	padding: 2rem 0 8rem;
	position: relative;

	@media (min-width: 768px) {
		min-height: 75vh;
		padding: 7rem 0 12rem;
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
	bottom: 0;
	width: 100%;

	svg {
		fill: ${({ theme }) => theme.bg1};
	}
`;
