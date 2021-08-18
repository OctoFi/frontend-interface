import styled from "styled-components";

export const PresaleCount = styled.div`
	font-weight: bold;
	font-size: 1.25rem;
	line-height: 1.5rem;
	color: ${({ theme }) => theme.text1};
`;

export const NoPresale = styled.span`
	font-size: 0.875rem;
	font-weight: 400;
	padding: 2rem 0 1rem;
	display: block;
`;
