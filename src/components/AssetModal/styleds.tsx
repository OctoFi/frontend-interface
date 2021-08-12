import styled from "styled-components";

export const Title = styled.h4`
	color: ${({ theme }) => theme.text2};
	margin-bottom: 0;
	font-weight: 500;
	font-size: 1rem;

	@media (max-width: 1199px) {
		font-weight: 700;
	}
`;

export const CloseButton = styled.button`
	width: 16px;
	height: 16px;
	border: none;
	background-color: transparent;
	color: ${({ theme }) => theme.text1};

	@media (max-width: 1199px) {
		display: none;
	}

	&:hover,
	&:active,
	&:focus {
		text-decoration: none;
		outline: none;
		border: none;
		box-shadow: none;
	}
`;
