import styled from "styled-components";
import { darken } from "polished";

export const FancyButton = styled.button`
	color: ${({ theme }) => theme.text1};
	align-items: center;
	height: 40px;
	border-radius: 12px;
	font-size: 1rem;
	width: auto;
	min-width: 3.5rem;
	border: 1px solid ${({ theme }) => theme.borderColor2};
	outline: none;
	background: ${({ theme }) => theme.bg1};

	&:hover,
	&:focus {
		// border: 1px solid ${({ theme }) => theme.text3};
		border: 1px solid ${({ theme }) => theme.primary};
	}
`;

export const Option = styled(FancyButton)`
	background-color: ${({ active, theme }) => active && theme.primary};
	color: ${({ active, theme }) => (active ? theme.bg1 : theme.text1)};
	margin-right: 8px;

	&:hover {
		cursor: pointer;
	}
`;

export const Input = styled.input`
	background: ${({ theme }) => theme.bg1};
	font-size: 16px;
	width: auto;
	outline: none;
	height: 40px;
	color: ${({ theme, color }) => (color === "red" ? theme.red1 : theme.text1)};
	text-align: right;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`;

export const OptionCustom = styled(FancyButton)`
	height: 40px;
	position: relative;
	padding: 0 0.75rem;
	flex: 1;
	border: ${({ theme, active, warning }) => active && `1px solid ${warning ? theme.red1 : theme.primary}`};

	&:hover {
		border: ${({ theme, active, warning }) =>
			active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary)}`};
	}

	input {
		width: 100%;
		height: 100%;
		border: 0px;
		border-radius: 2rem;
	}
`;

export const SlippageEmojiContainer = styled.span`
	color: ${({ theme }) => theme.warning};
	${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  `}
`;
