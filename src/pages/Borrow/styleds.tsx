import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const BorrowTableWrap = styled.div`
	.table {
		border-collapse: separate;
		border-spacing: 0 0;

		thead th {
			background-color: ${({ theme }) => theme.borderColor2};
			color: ${({ theme }) => theme.text1};
			font-size: 0.75rem;
			font-weight: 400;
			text-overflow: ellipsis;
			white-space: nowrap;
			min-height: 56px;
			padding: 1rem 1.5rem;

			&:focus {
				outline: none;
			}

			&:first-child {
				border-top-left-radius: 12px;
				border-bottom-left-radius: 12px;
			}

			&:last-child {
				border-top-right-radius: 12px;
				border-bottom-right-radius: 12px;
			}
		}

		th,
		td {
			vertical-align: middle;

			&:last-child {
				text-align: left;
			}
		}

		td {
			border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
			padding: 1.25rem 1.5rem;
		}
	}
`;

export const CustomLink = styled(Link)`
	text-decoration: none;
	display: inline-flex;
	margin-right: 20px;

	&:last-child {
		margin-right: 0;
	}

	@media (max-width: 991px) {
		margin-right: 0;

		&:not(:last-child) {
			margin-bottom: 14px;
		}
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		outline: none;
		box-shadow: none;
	}
`;

export const PoolsButton = styled(Button)`
	border-radius: 12px;
	background-color: ${({ theme }) => theme.bg1};
	padding: 6px 20px;
	max-height: 40px;
	min-height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	font-size: 1rem;
	font-family: inherit;
	font-weight: 500;
	border: none;
	outline: none;
	text-decoration: none;

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		outline: none;
		box-shadow: none;
	}
`;

export const TradeButton = styled(PoolsButton)<{ variant: string }>`
	color: ${({ theme, variant }) => (variant ? variant : theme.primary)} !important;
	margin-left: 8px;

	@media (max-width: 991px) {
		width: 100%;
		margin-bottom: 0.5rem;
	}

	&:not(:disabled):hover {
		color: ${({ theme }) => theme.bg1} !important;
		background-color: ${({ theme, variant }) => (variant ? variant : theme.primary)};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
