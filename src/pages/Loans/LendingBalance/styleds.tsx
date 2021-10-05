import styled from "styled-components";

export const LogoContainer = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 32px;
	background-color: ${({ theme }) => theme.text1};

	@media (max-width: 991px) {
		width: 24px;
		height: 24px;
		border-radius: 24px;
	}
`;

export const Symbol = styled.span`
	color: ${({ theme }) => theme.text1};
	font-size: 1rem;
	margin-right: 10px;
	font-weight: 700;
`;

export const Name = styled.span`
	font-weight: 400;
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;

	@media (max-width: 991px) {
		font-size: 0.875rem;
		font-weight: 400;
	}
`;

export const CellText = styled.span`
	font-weight: 500;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.text1};

	&.fs-6 {
		font-size: 1rem;
	}

	@media (max-width: 991px) {
		font-weight: 700;

		&.label {
			font-weight: 500;
		}
	}
`;
