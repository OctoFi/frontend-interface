import styled from "styled-components";

export const Wrapper = styled.section`
	margin-top: 1.5rem;
	margin-bottom: 1.25rem;

	@media (min-width: 576px) {
		margin-top: 3.5rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 576px) {
		h2 {
			font-size: 1.75rem;
			margin-bottom: 1.25rem;
		}
	}
`;

export const TableWrap = styled.div`
	.table {
		position: relative;
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 0.5rem;

		thead th {
			border-bottom-color: ${({ theme }) => theme.borderColor2} !important;
			color: ${({ theme }) => theme.text1};
			font-weight: 500;
			padding: 1.5rem 1rem;
		}

		tbody td {
			border-bottom-color: ${({ theme }) => theme.borderColor};
			color: ${({ theme }) => theme.text1};
			cursor: pointer;
			padding: 1rem;
			vertical-align: middle;
		}
	}
`;

export const GotoMarketContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 0.5rem;
	padding-bottom: 1rem;
`;
