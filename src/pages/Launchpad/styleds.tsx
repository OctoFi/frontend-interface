import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import Card from "../../components/Card";
import { InputGroupText, InputGroupFormControl } from "../../components/Form";

export const CustomCard = styled(Card)`
	padding: 20px;

	@media (max-width: 767px) {
		padding: 0;
	}
`;

export const FormControl = styled(InputGroupFormControl)`
	border: none !important;
	padding-left: 20px;
	padding-right: 12px;
`;

export const GroupText = styled(InputGroupText)`
	border: none !important;
	color: ${({ theme }) => theme.text4};
`;

export const Title = styled.h2`
	line-height: 1.5rem;
	font-size: 1.25rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text1};
	margin-top: 0;
	margin-bottom: 1.5rem;
`;

export const CreateNew = styled(Link)`
	height: 2rem;
	max-height: 2rem;
	min-height: 2rem;
	min-width: 116px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.primaryLight};
	color: ${({ theme }) => theme.primary};
	border-radius: 12px;
	text-decoration: none;
	outline: none;
	padding: 5px 16px;
	font-size: 0.875rem;
	font-weight: 400;
	transition: 0.4s ease all;
	will-change: background-color, color;

	&:hover,
	&:focus {
		background-color: ${({ theme }) => theme.primary};
		color: ${({ theme }) => theme.bg1};
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		outline: none;
		box-shadow: none;
	}
`;

export const CustomNav = styled(Nav)`
	margin-bottom: 12px;
	min-width: 100%;
	overflow: auto;
	margin-left: -30px !important;
	margin-right: -30px !important;

	@media (min-width: 768px) {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
`;

export const CustomNavItem = styled(Nav.Item)`
	padding: 0 5px 10px;

	@media (max-width: 767px) {
		padding: 0 5px 10px;
	}

	&:first-child {
		@media (max-width: 767px) {
			padding-left: 30px;
		}
	}
	&:last-child {
		@media (max-width: 767px) {
			padding-right: 30px;
		}
	}
`;

export const CustomNavTitle = styled.span`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.text1};
	font-weight: 400;
	margin-top: 1rem;
	display: block;

	@media (max-width: 767px) {
		font-size: 0.75rem;
	}
`;

export const CustomNavLink = styled(Nav.Link)`
	color: ${({ theme }) => theme.text1};
	background-color: transparent;
	padding: 12px 12px;
	min-height: 56px;
	font-size: 0.875rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: 0.3s ease all;

	@media (max-width: 767px) {
		padding: 6px 8px;
		font-size: 0.75rem;
	}

	svg {
		opacity: 0.5;
	}

	&:hover {
		color: ${({ theme }) => theme.success};

		svg {
			opacity: 1;
		}
	}

	&.active {
		color: ${({ theme }) => theme.success} !important;
		background-color: transparent !important;

		svg {
			opacity: 1;
		}
	}
`;

export const Description = styled.p`
	margin-top: 0;
	margin-bottom: 57px;
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 17px;
	color: ${({ theme }) => theme.text1};
`;
