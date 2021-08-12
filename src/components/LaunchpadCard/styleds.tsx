import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../UI/Img";

export const Wrapper = styled(Link)`
	width: 100%;
	border-radius: 12px;
	border: 1px solid ${({ theme }) => theme.borderColor2};
	background-color: ${({ theme }) => theme.bg1};
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	transition: 0.3s ease border-color;

	&:not(:last-child) {
		margin-bottom: 20px;
	}

	&:hover {
		border-color: ${({ theme }) => theme.primary};
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		outline: none;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}
`;

// export const CenterRow = styled(Row)`
// 	justify-content: center;
// `;

// export const StartDateText = styled.span`
// 	font-weight: 700;
// 	font-size: 0.75rem;
// 	color: ${({ theme }) => theme.text1};
// `;

export const TokenName = styled.span`
	font-size: 1rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text1};
`;

export const Pair = styled.span`
	font-weight: 400;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.text3};
`;

export const LockDuration = styled.span`
	font-weight: 400;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.text3};
`;

export const Label = styled.span<{ align?: string }>`
	font-size: 0.75rem;
	font-weight: 400;
	color: ${({ theme }) => theme.text3};
	display: flex;
	text-align: ${({ align }) => align || "center"};
`;

export const Value = styled.span<{ align?: string }>`
	font-size: 1rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text1};
	display: flex;
	text-align: ${({ align }) => align || "center"};
`;

export const ResultProgress = styled.div`
	background-color: ${({ theme }) => theme.primaryLight};
	height: 5px;
	border: none;
	width: 100%;
	border-radius: 20px;
`;

export const ResultProgressBar = styled.div`
	background-color: ${({ theme }) => theme.primary};
	border-radius: 20px;
`;

export const LogoContainer = styled.div`
	width: 32px;
	height: 32px;
	min-width: 32px;
	border-radius: 32px;
	margin-right: 12px;
	position: relative;
	overflow: hidden;
`;

export const Logo = styled(Img)`
	width: 100%;
	height: 100%;
	border: 1px solid ${({ theme }) => theme.text1};
	border-radius: 320px;
`;
