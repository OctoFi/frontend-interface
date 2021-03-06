import styled from "styled-components";
import { Table } from "react-bootstrap";
import { Jazzicon } from "@ukstv/jazzicon-react";
import Card from "../../components/Card";

export const CustomCard = styled(Card)`
	.card-body {
		padding: 0 0 0.5rem 0;
	}
`;

export const BoxHeader = styled.div`
	display: flex;
	align-items: center;
`;

export const BoxTitle = styled.h4`
	color: ${({ theme }) => theme.text1};
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5;
	margin: 0;

	@media (min-width: 768px) {
		font-size: 1.25rem;
	}
`;

export const VoteContent = styled.div`
	line-height: 1.5;

	p {
		font-weight: 400;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;

		@media (min-width: 768px) {
			font-size: 1.35rem;
		}
	}
`;

export const TokenValue = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	padding-left: 11px;
	color: ${({ theme }) => theme.text1};

	@media (min-width: 768px) {
		font-size: 1rem;
		font-weight: 700;
	}
`;

export const AuthorLink = styled.a`
	color: ${({ theme }) => theme.primary};
	font-weight: 700;
	font-size: 0.875rem;

	@media (min-width: 768px) {
		font-size: 1rem;
	}

	&:focus,
	&:active {
		outline: none;
	}
`;

export const InfoText = styled.span<{ fontWeight?: number }>`
	font-size: 0.875rem;
	font-weight: ${({ fontWeight }) => fontWeight || 700};
	color: ${({ theme }) => theme.text1};

	@media (min-width: 768px) {
		font-size: 1rem;
		font-weight: 700;
	}
`;

export const ResultRow = styled.div`
	display: flex;
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 40px;
	}
`;

export const ResultTitle = styled.span`
	font-size: 0.875rem;
	font-weight: 400;
	margin: 0;
	color: ${({ theme }) => theme.text1};

	@media (min-width: 768px) {
		font-weight: 500;
	}
`;

export const ResultProgress = styled.div`
	background-color: ${({ theme }) => theme.primaryLight};
	height: 5px;
	border: none;
	width: 100%;
	border-radius: 12px;
`;

export const ResultProgressBar = styled.div`
	background-color: ${({ theme }) => theme.primary};
	border-radius: 12px;
`;

export const CustomTable = styled(Table)`
	margin-bottom: 0;

	td {
		border: 0;
		border-bottom: 1px solid ${({ theme }) => theme.borderColor};
		border-radius: 0 !important;
		vertical-align: middle;
		background: transparent !important;

		&:first-child,
		&:last-child {
			border-left: 0;
			border-right: 0;
		}

		&:last-child {
			width: 200px;
			text-align: right;
		}
	}

	tr:last-child td {
		border-bottom: 0;

		&:first-child {
			border-bottom-left-radius: 12px !important;
		}
		&:last-child {
			border-bottom-right-radius: 12px !important;
		}
	}
`;

export const Thead = styled.thead`
	height: 1px;
	opacity: 0;
	pointer-events: none;
	visibility: hidden;
	display: none;
`;

export const ShowMoreWrap = styled.div`
	border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export const Logo = styled.img<{ size: number | string }>`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	border-radius: ${({ size }) => size}px;
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.075);
	display: none;

	@media (min-width: 768px) {
		display: initial;
	}
`;

export const ModifiedJazzicon = styled(Jazzicon)`
	width: 24px;
	height: 24px;
	margin-right: 10px;

	@media (min-width: 768px) {
		width: 32px;
		height: 32px;
		margin-right: 15px;
	}
`;

export const Wrapper = styled.div`
	position: relative;
	transition: 0.3s ease all;
	width: 100%;

	&:not(:last-child) {
		margin-bottom: 1.875rem;
	}
`;

export const InfoDesc = styled.span`
	font-size: 0.75rem;
	font-weight: 400;
	margin: 0;
	color: ${({ theme }) => theme.text1};

	@media (min-width: 768px) {
		font-size: 0.875rem;
		font-weight: 500;
	}
`;
