import styled from "styled-components";
import { ReactComponent as DropDown } from "../../assets/images/cross/dropdown.svg";

export const InputRow = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 0.75rem 0;

	@media (min-width: 992px) {
		padding: 3px 0;
	}

	@media (max-width: 380px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

export const CurrencyLogoContainer = styled.div`
	width: 32px;
	height: 32px;

	@media (max-width: 991px) {
		width: 24px;
		height: 24px;
	}
`;

export const Label = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 400;
	font-size: 0.875rem;
	padding: 0;

	@media (min-width: 768px) {
		padding: 0 1.25rem;
	}
`;

export const CurrencySelect = styled.button`
	align-items: center;
	height: 56px;
	font-size: 0.875rem;
	font-weight: 500;
	background-color: ${({ theme }) => theme.primaryLight};
	color: ${({ theme }) => theme.primary};
	border-radius: 12px;
	box-shadow: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	border: none;
	min-width: 116px;
	width: 116px;
	transition: 0.3s ease all;

	@media (min-width: 768px) {
		height: 80px;
		min-width: 178px;
		width: 178px;
		padding: 0.25rem 0.625rem;
		font-size: 1rem;
		font-weight: 500;
	}

	@media (min-width: 992px) {
		min-width: 255px;
		width: 255px;
		padding: 4px 1.5rem;
		font-size: 1rem;
		font-weight: 500;
	}

	@media (max-width: 380px) {
		width: 100%;
	}

	&:focus,
	&:hover {
		background-color: ${({ theme }) => theme.primary};
		color: #202020;
		outline: none;
	}
`;

export const LabelRow = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	color: ${({ theme }) => theme.text1};
	font-size: 0.75rem;
	line-height: 1rem;
	padding: 0;
`;

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	flex: 1;
`;

export const Aligner = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-align: left;
`;

export const CustomDropDown = styled(DropDown)`
	margin-top: 4px;
	margin-left: 4px;
	height: 24px;
	width: 24px;

	@media (max-width: 991px) {
		margin-top: 0;
	}

	@media (max-width: 576px) {
		margin-left: 4px;
		height: 16px;
		width: 16px;
	}
`;

export const InputPanel = styled.div<{ withoutMargin?: boolean }>`
	display: flex;
	flex-flow: column nowrap;
	position: relative;
	z-index: 1;
	margin-bottom: ${({ withoutMargin }) => (withoutMargin ? "0.5rem" : "1rem")};

	@media (min-width: 768px) {
		margin-bottom: ${({ withoutMargin }) => (withoutMargin ? "0.5rem" : "1.75rem")};
	}
`;

export const TokenSymbol = styled.span`
	margin-right: auto;
	padding-left: 0.875rem;
	font-size: 0.875rem;
	line-height: 18px;
	display: block;
	margin-bottom: 3px;

	@media (min-width: 768px) {
		padding-left: 1rem;
		font-size: 1rem;
		line-height: 21px;
	}
`;

export const TokenName = styled.span`
	margin-right: auto;
	padding-left: 0.875rem;
	font-size: 0.75rem;
	line-height: 15px;
	margin-bottom: 3px;
	display: none;

	@media (min-width: 768px) {
		padding-left: 1rem;
		font-size: 0.875rem;
		line-height: 18px;
		display: block;
	}
`;

export const BalanceMax = styled.button`
	background-color: ${({ theme }) => theme.primaryLight};
	border: none;
	border-radius: 10px;
	font-size: 1rem;
	padding: 0.25rem 0.625rem;
	height: 32px;
	max-height: 32px;
	font-weight: 500;
	cursor: pointer;
	color: ${({ theme }) => theme.primary};
	position: absolute;
	bottom: calc(100% + 10px);
	right: 0;
	transition: all ease 0.3s;

	@media (min-width: 768px) {
		height: 40px;
		max-height: 40px;
		padding: 0.5rem;
		top: 8px;
		right: 8px;
	}

	&:hover {
		background-color: ${({ theme }) => theme.primary};
		color: ${({ theme }) => theme.bg1};
	}

	&:focus {
		outline: none;
	}
`;

export const NumericalInput = styled.input<{ align?: any; error?: boolean }>`
	color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
	width: 0;
	position: relative;
	font-family: inherit;
	outline: none;
	flex: 1 1 auto;
	background-color: ${({ theme }) => theme.bg1};
	text-align: ${({ align }) => align && align};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-appearance: textfield;
	border-radius: 12px;
	height: 56px;
	font-size: 1rem;
	font-weight: 500;
	padding: 1rem 20px;
	border: none;
	margin-right: 40px;

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

	@media (min-width: 768px) {
		padding-right: 4.5625rem;
	}

	@media (max-width: 767px) {
		margin-right: 24px;
	}

	@media (max-width: 576px) {
		margin-right: 16px;
	}

	@media (max-width: 380px) {
		margin-right: 0;
		margin-bottom: 12px;
	}
`;
