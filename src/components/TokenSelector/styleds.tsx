import styled from "styled-components";
import { ReactComponent as DropDown } from "../../assets/images/dropdown.svg";

export const InputRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
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

export const CurrencySelect = styled.button`
	align-items: center;
	height: 56px;
	font-size: 0.875rem;
	font-weight: 500;
	background-color: ${({ theme }) => theme.bg1};
	color: ${({ theme }) => theme.text1};
	border-radius: 12px;
	box-shadow: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: 0.875rem 0.625rem;
	min-width: 116px;
	width: 100%;

	@media (min-width: 768px) {
		min-width: 178px;
		width: 100%;
		padding: 0.625rem 1.5rem;
		font-size: 1rem;
		font-weight: 700;
	}

	&:focus,
	&:hover {
		background-color: ${({ theme }) => theme.bg4};
		outline: none;
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

export const Aligner = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const CustomDropDown = styled(DropDown)`
	margin: 0 0.25rem 0 0.5rem;
	height: 35%;

	path {
		stroke: ${({ theme }) => theme.text1};
		stroke-width: 1.5px;
	}
`;

export const InputPanel = styled.div`
	${({ theme }) => theme.flexColumnNoWrap};
	position: relative;
	z-index: 1;
`;

export const TokenName = styled.span<{ active?: boolean }>`
	margin-right: auto;
	padding-left: ${({ active }) => (active ? "0.625rem" : "0")};
	font-size: 1rem;

	@media (min-width: 768px) {
		padding-left: ${({ active }) => (active ? "0.75rem" : "0")};
	}
`;

export const Balance = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	font-size: 0.875rem;
	padding: 0;
`;
