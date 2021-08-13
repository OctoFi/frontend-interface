import styled from "styled-components";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { Nav, ListGroup } from "react-bootstrap";

import Img from "../../components/UI/Img";

export const Item = ListGroup.Item;

export const ListItem = styled(Item)`
	border: 1px solid ${({ theme }) => theme.borderColor2} !important;
	background-color: transparent;
	color: ${({ theme }) => theme.text1};
	display: flex;
	align-items: center;
	border-radius: 12px !important;
	margin-bottom: 6px;
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
	color: currentColor;
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

	&:hover {
		color: ${({ theme }) => theme.success};

		${SVG} {
			opacity: 1;
		}
	}

	${SVG} {
		opacity: 0.5;
	}

	&.active {
		color: ${({ theme }) => theme.success} !important;
		background-color: transparent !important;

		${SVG} {
			opacity: 1;
		}
	}
`;

export const Description = styled.p`
	margin-top: 0;
	margin-bottom: 57px;
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.6;
	color: ${({ theme }) => theme.text1};
`;

export const IconButton = styled(Link)`
	width: 40px;
	height: 40px;
	border-radius: 12px;
	border: none;
	background-color: transparent;
	transition: 0.3s ease all;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	&:hover {
		background-color: ${({ theme }) => theme.primaryLight};
	}
`;

// export const InnerCard = styled(Card)`
//     transition: 0.3s ease border-color;
//     background-color: ${({ theme }) => theme.bg1};

//     .card-body {
//       padding: 12px 16px;
//       display: flex;
//       align-items: center;
//     }

//   &:hover {
//     border-color: ${({ theme }) => theme.primary};
//   }
// `

// export const InnerBody = styled.span`
//   font-size: 0.75rem;
//   font-weight: 400;
//   color: ${({ theme }) => theme.text3};
//   line-height: 1.6;
// `

// export const CheckContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: .875rem;
//   color: ${({ theme }) => theme.success};
// `

// export const NoticeCard = styled(Card)`
//   background-image: linear-gradient(-345.39deg, #a890fe -17.91%, #0891B2 68.92%);
//   border: none;

//   .card-body {
//     padding: 18px 16px;
//   }
// `

// export const InvertText = styled.span<{ size?: string }>`
//   font-size: ${({ size }) => size === 'lg' ? '1.125rem' : "0.875rem"};
//   font-weight: 400;
//   color: ${({ theme }) => theme.bg1};
//   line-height: 1.6;
// `

export const TokenName = styled.span`
	font-size: 1.25rem;
	font-weight: 700;
	margin-top: 10px;
	color: ${({ theme }) => theme.text1};
`;

export const ExternalLink = styled.a.attrs(() => {
	return {
		target: "_blank",
		rel: "noreferrer noopener",
	};
})`
	cursor: pointer;
	margin-bottom: 6px;
	height: 32px;
	padding: 0 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	background-color: ${({ theme }) => theme.bg1};
	text-decoration: none;
	color: ${({ theme }) => theme.text1};
	transition: 0.3s ease all;

	&:hover {
		background-color: ${({ theme }) => theme.text1};
		color: ${({ theme }) => theme.modalBG};
	}

	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
		outline: none;
		box-shadow: none;
	}
`;

export const LinkText = styled.span`
	font-size: 0.75rem;
	color: currentColor;
	font-weight: 500;
	margin-right: 6px;
`;

export const DetailsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 40px;
	height: 40px;
	margin-bottom: 10px;
`;

export const DetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const DetailsTitle = styled.span`
	color: ${({ theme }) => theme.primary};
	font-size: 1.25rem;
	font-weight: 500;
	margin-bottom: 6px;
`;

export const DetailsTitleSimple = styled(DetailsTitle)`
	color: ${({ theme }) => theme.text1};
`;

export const DetailsLabel = styled.span`
	color: ${({ theme }) => theme.text3};
	font-size: 0.75rem;
	font-weight: 400;
`;

export const RowCard = styled(Card)`
	transition: 0.3s ease border-color;
	background-color: ${({ theme }) => theme.modalBG};

	& .card-body {
		padding: 12px 16px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	&:hover {
		border-color: ${({ theme }) => theme.primary};
	}
`;

export const RowTitle = styled.h3`
	margin-top: 0.75rem;
	margin-bottom: 1rem;
	font-weight: 700;
	color: ${({ theme }) => theme.text1};
	font-size: 1.25rem;
`;

export const RowDesc = styled.p`
	margin: 0 1rem 2rem;
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.6;
	color: ${({ theme }) => theme.text3};
`;

export const TokenWrapper = styled.div`
	background-color: ${({ theme }) => theme.bg1};
	padding: 0 1.125rem;
	height: 56px;
	border-radius: 12px;
	display: flex;
	align-items: center;
`;

export const StyledTokenName = styled.span`
	font-weight: 700;
	margin-right: auto;
	font-size: 1rem;
	color: ${({ theme }) => theme.text1};
`;

export const LogoContainer = styled.div`
	width: 48px;
	height: 48px;
	min-width: 48px;
	border-radius: 48px;
	margin-right: 16px;
	position: relative;
	overflow: hidden;
`;

export const Logo = styled(Img)`
	width: 100%;
	height: 100%;
	border: 1px solid ${({ theme }) => theme.text1};
	border-radius: 320px;
`;

export const CircleBarPosition = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
