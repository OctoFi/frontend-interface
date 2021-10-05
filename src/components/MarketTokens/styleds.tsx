import styled from "styled-components";

export const CellText = styled.span`
	font-weight: 500;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.text1};

	@media (max-width: 991px) {
		font-weight: 600;
	}
`;

export const ExploreTableWrap = styled.div`
	.table {
		position: relative;
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 0.5rem;

		thead th {
			// background-color: ${({ theme }) => theme.bg5};
			border-bottom-color: ${({ theme }) => theme.borderColor2} !important;
			color: ${({ theme }) => theme.text1};
			font-weight: 500;
			padding: 1.5rem 1rem;
			vertical-align: middle;
			text-overflow: ellipsis;
			white-space: nowrap;

			&:last-child {
				text-align: right;
			}
		}

		tbody td {
			border-bottom-color: ${({ theme }) => theme.borderColor};
			color: ${({ theme }) => theme.text1};
			cursor: pointer;
			padding: 1rem;
			vertical-align: middle;

			&:last-child {
				text-align: right;
			}
		}

		tr:not(:last-child) td {
			border-bottom: 1px solid ${({ theme }) => theme.borderColor};
		}
	}
`;
