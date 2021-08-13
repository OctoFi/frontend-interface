import styled from "styled-components";

export const InputPanel = styled.div`
	${({ theme }) => theme.flexColumnNoWrap};
	position: relative;
	z-index: 1;
`;

export const InputRow = styled.div<{ selected?: boolean }>`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	padding: ${({ selected }) => (selected ? "0.75rem 0" : "0.75rem 0")};
`;

export const Logo = styled.img<{ size?: number; margin?: boolean }>`
	width: ${({ size }) => (size ? `${size}px` : "30px")};
	height: ${({ size }) => (size ? `${size}px` : "30px")};
	border-radius: ${({ size }) => (size ? `${size}px` : "30px")};
	border: 2px solid ${({ theme }) => theme.text1};
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.075);
	margin-right: ${({ margin }) => (margin ? "10px" : 0)};
	background-color: ${({ theme }) => theme.text1};
`;

export const LogoDiv = styled.div<{ size?: number; margin?: boolean }>`
	width: ${({ size }) => (size ? `${size}px` : "30px")};
	height: ${({ size }) => (size ? `${size}px` : "30px")};
	border-radius: ${({ size }) => (size ? `${size}px` : "30px")};
	border: 2px solid ${({ theme }) => theme.text1};
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.075);
	margin-right: ${({ margin }) => (margin ? "10px" : 0)};
	background-color: ${({ theme }) => theme.text1};
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	svg {
		width: 30px;
		height: 30px;
		border-radius: 30px;
	}
`;

export const LabelRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	color: ${({ theme }) => theme.text1};
	font-size: 0.75rem;
	line-height: 1rem;
	padding: 0;
`;

export const Label = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 400;
	font-size: 0.875rem;
	padding: 0;

	@media (min-width: 768px) {
		padding: 0 1.5rem;
	}
`;

export const Aligner = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const TokenName = styled.span<{ active?: boolean }>`
	margin-right: auto;
	padding-left: ${({ active }) => (active ? "0.75rem" : "0")};
	font-size: 1rem;
`;

export const CurrencySelect = styled.button<{ reverse?: boolean }>`
	align-items: center;
	height: 56px;
	font-size: 1rem;
	font-weight: 700;
	background-color: ${({ theme }) => theme.bg1};
	color: ${({ theme }) => theme.text1};
	border-bottom-left-radius: ${({ reverse }) => (reverse ? "0" : `1.125rem`)};
	border-top-left-radius: ${({ reverse }) => (reverse ? "0" : `1.125rem`)};
	border-bottom-right-radius: ${({ reverse }) => (reverse ? "1.125rem" : `0`)};
	border-top-right-radius: ${({ reverse }) => (reverse ? "1.125rem" : `0`)};
	box-shadow: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: ${({ reverse }) => (reverse ? ".625rem 1.875rem .625rem 1.5rem" : `.625rem 0.625rem .625rem 1.5rem`)};

	&:focus,
	&:hover {
		outline: none;
	}
`;
