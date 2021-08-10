import styled from "styled-components";
import SVG from "react-inlinesvg";

export const ImageContainer = styled.div`
	width: 5rem;
	height: 5rem;
	min-width: 5rem;
	min-height: 5rem;
	border-radius: 50%;
	margin: 0 auto 1rem;
	padding: 1rem;
	background: ${({ theme }) => theme.primaryLight || "lightgray"};
`;

export const Icon = styled(SVG)`
	width: 100%;
	height: 100%;
`;

export const Title = styled.h2`
	color: ${({ theme }) => theme.text1};
	font-size: 1.25rem;
	font-weight: 600;
`;
