import { Button } from "react-bootstrap";
import styled from "styled-components";

export const Container = styled.div`
	padding-right: 1.5rem;
	height: 100%;
`;

export const Wrapper = styled.div`
	border: 1px solid ${({ theme }) => theme.bg1};
	background-color: ${({ theme }) => theme.modalBG};
	box-shadow: 0 0 5px transparent;
	padding: 1.25rem;
	border-radius: 20px;
	position: relative;
	transition: 0.3s ease all;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: 768px) {
		padding: 1.875rem;
	}

	&:hover {
		background-color: ${({ theme }) => theme.bg1};
		border-color: ${({ theme }) => theme.primary};
		box-shadow: ${({ theme }) => `0 5px 15px ${theme.primary}20`};
	}
`;

export const Details = styled.span`
	text-decoration: underline;
	color: ${({ theme }) => theme.primary};
	font-weight: 700;
	font-size: 1rem;
	margin-right: 0.75rem;
`;

export const Price = styled.span`
	font-weight: 400;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.text3};
	margin-bottom: 0.375rem;
	display: block;

	@media (min-width: 768px) {
		color: ${({ theme }) => theme.text1};
		margin-bottom: 0.625rem;
	}
`;

export const CurrentPrice = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 700;
	font-size: 1.25rem;

	@media (min-width: 768px) {
		font-size: 1.375rem;
	}
`;

export const PriceDiff = styled.span<{ type?: string }>`
	color: ${({ theme, type }) => (type === "asc" ? theme.green1 : theme.tertiary)};
	font-weight: 700;
	font-size: 0.875rem;

	@media (min-width: 768px) {
		font-size: 1rem;
	}
`;

export const DetailsButton = styled(Button)`
	background-color: ${({ theme }) => theme.bg1};
	border: none;
	// color: ${({ theme }) => theme.primary};
	transition: 0.4s ease all;
`;
