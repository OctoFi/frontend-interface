import styled from "styled-components";
import Img from "../UI/Img";

export const Wrapper = styled.button`
	display: flex;
	align-items: center;
	background-color: transparent;
	border: none;
	cursor: pointer;

	&:hover,
	&:active,
	&:focus {
		outline: none;
		text-decoration: none;
		box-shadow: none;
	}
`;

export const LogoContainer = styled.div`
	width: 32px;
	height: 32px;
	min-width: 32px;
	border-radius: 32px;
	margin-right: 20px;
	position: relative;
	overflow: hidden;
	box-shadow: 0 0 0 1pt ${({ theme }) => theme.text1};
`;

export const Logo = styled(Img)`
	width: 100%;
	height: 100%;
`;

export const Name = styled.span`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
	font-weight: 400;
	text-align: left;
`;

export const Overlay = styled.div<{ selected?: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => `${theme.bg1}cd`};
	opacity: ${({ selected }) => (selected ? 1 : 0)};
	transition: 0.3s ease all;
	z-index: 2;
`;
