import styled from "styled-components";

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
