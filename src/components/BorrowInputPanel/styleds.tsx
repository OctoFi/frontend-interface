import styled from "styled-components";

export const InputRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	padding: 0.625rem 0 0;

	@media (min-width: 768px) {
		padding-top: 0.75rem;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 34px;

	@media (min-width: 768px) {
		margin-bottom: 36px;
	}
`;

export const Label = styled.span`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
	font-weight: 400;
	padding: 0;

	@media (min-width: 768px) {
		padding: 0 1rem;
		font-weight: 700;
	}
`;

export const InputContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	flex: 1;
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
	justify-content: center;

	@media (min-width: 768px) {
		justify-content: space-between;
	}
`;

export const InputPanel = styled.div`
	${({ theme }) => theme.flexColumnNoWrap};
	position: relative;
	border-radius: 0.42rem;
`;

export const TokenName = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	margin-left: 15px;

	@media (min-width: 768px) {
		font-size: 1rem;
		margin-right: auto;
	}
`;

export const CurrencySelect = styled.button`
	align-items: center;
	height: 56px;
	font-size: 0.875rem;
	font-weight: 500;
	background-color: ${({ theme }) => theme.bg1};
	color: ${({ theme }) => theme.text1};
	border-bottom-left-radius: 12px;
	border-top-left-radius: 12px;
	box-shadow: none;
	outline: none;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: 0.875rem 0.625rem;
	min-width: 116px;
	width: 116px;
	text-align: center;

	@media (min-width: 768px) {
		min-width: 116px;
		width: 116px;
		padding: 0.625rem 1rem;
		font-size: 1rem;
		font-weight: 700;
		text-align: left;
	}

	&:focus,
	&:hover {
		background-color: ${({ theme }) => theme.bg1};
		outline: none;
	}
`;

export const BalanceRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	margin-top: 10px;
	color: ${({ theme }) => theme.text1};
	opacity: 0.5;
	font-size: 0.75rem;
	font-weight: 400;
	line-height: 1rem;
	padding: 0;

	@media (min-width: 768px) {
		padding: 0 1rem;
	}
`;
