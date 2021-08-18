import styled from "styled-components";

export const Title = styled.h2`
	color: ${({ theme }) => theme.text1};
	font-size: 1.25rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0;
`;

export const Content = styled.p`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
`;
