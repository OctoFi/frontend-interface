import styled from "styled-components";

export const MarketLink = styled.a`
	color: ${({ theme }) => theme.text1};

	@media (max-width: 991px) {
		flex-basis: 100px;
	}
`;

export const CellText = styled.span`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
	font-weight: 600;

	@media (min-width: 992px) {
		font-weight: 500;
	}
`;
