import styled from "styled-components";

export const ExplorerLink = styled.a`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	gap: 0.5rem;
	color: ${({ theme }) => theme.text3};
	text-decoration: none;
	font-size: 1rem;
	font-weight: 500;
	line-height: 1.5;
	padding: 0;

	&:hover,
	&:active,
	&:focus {
		text-decoration: underline;
		color: ${({ theme }) => theme.text3};
		outline: none;
	}
`;
