import styled from "styled-components";

export const InputRow = styled.div<{ selected: boolean }>`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	padding: 0.75rem 0;

	@media (max-width: 1199px) {
		padding: 1rem 0 0.75rem;
	}
`;

export const CurrencySelect = styled.button<{ selected: boolean }>`
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
	padding: 0.5rem 0.625rem;
	min-width: 116px;
	width: 116px;
	text-align: left;

	@media (min-width: 768px) {
		min-width: 178px;
		width: 178px;
		padding: 0.625rem 1.5rem;
		font-size: 1rem;
		font-weight: 700;
	}

	&:focus,
	&:hover {
		background-color: ${({ theme }) => theme.bg1};
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
`;

export const InputPanel = styled.div<{ hideInput?: boolean }>`
	${({ theme }) => theme.flexColumnNoWrap};
	position: relative;
	z-index: 1;
	margin-bottom: 1rem;

	@media (min-width: 768px) {
		margin-bottom: 1.75rem;
	}
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

export const TokenName = styled.span`
	margin-right: auto;
	padding-left: 0.625rem;
	font-size: 1rem;
	text-align: left;

	@media (min-width: 768px) {
		padding-left: 0.75rem;
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

	${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-right: 0.5rem;
    `};
`;

export const Balance = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	font-size: 0.875rem;
	padding: 0;
`;
