import styled from "styled-components";

export const CustomInput = styled.input<{
	error?: boolean;
	fontSize?: string;
	align?: string;
	noBorder?: boolean;
	reverse?: boolean;
	size?: string;
}>`
	color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
	width: 0;
	position: relative;
	font-weight: 500;
	font-family: inherit;
	outline: none;
	border: none;
	flex: 1 1 auto;
	background-color: ${({ theme }) => theme.bg1};
	font-size: 1rem;
	text-align: ${({ align }) => align && align};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	height: ${({ size }) => (size === "sm" ? "48px" : "56px")};
	border-bottom-right-radius: ${({ reverse }) => (reverse ? "0" : `1.125rem`)};
	border-top-right-radius: ${({ reverse }) => (reverse ? "0" : `1.125rem`)};
	border-bottom-left-radius: ${({ reverse }) => (reverse ? "1.125rem" : `0`)};
	border-top-left-radius: ${({ reverse }) => (reverse ? "1.125rem" : `0`)};
	padding-right: 0.625rem;
	padding-left: 0.625rem;
	// padding-left: ${({ noBorder, reverse }) => (reverse ? "1.375rem" : noBorder ? "0.625rem" : `1.5rem`)};
	-webkit-appearance: textfield;
	// border-left: ${({ theme, noBorder }) => (noBorder ? "none" : `3px solid ${theme.modalBG}`)};

	::-webkit-search-decoration {
		-webkit-appearance: none;
	}

	[type="number"] {
		-moz-appearance: textfield;
	}

	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.text3};
	}
`;
