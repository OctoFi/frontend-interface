import styled from "styled-components";

export const Box = styled.div`
	border-radius: 12px;
	background-color: ${({ theme }) => theme.bg1};
	display: flex;
	align-items: stretch;
	flex-direction: column;
	margin-bottom: 12px;
`;

export const TxnBox = styled.a`
	padding: 8px 12px;
	border-radius: 12px;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	text-decoration: none;
	outline: none;

	&:focus,
	&:active,
	&:hover {
		text-decoration: none;
		color: ${({ theme }) => theme.text2};
		outline: none;
	}
`;

export const EmptyText = styled.span`
	padding: 20px 10px;
	color: ${({ theme }) => theme.text3};
	font-size: 0.75rem;
	font-weight: 400;
	text-align: center;
`;
