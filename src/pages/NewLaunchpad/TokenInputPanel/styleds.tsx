import styled from "styled-components";

export const InputPanel = styled.div`
	${({ theme }) => theme.flexColumnNoWrap}
	position: relative;
	z-index: 1;
	width: 100%;
	margin-bottom: 2.75rem;

	@media (max-width: 767px) {
		margin-bottom: 1.5rem;
	}
`;

export const ContainerRow = styled.div<{ error?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 1.25rem;
	border: 1px solid ${({ error, theme }) => (error ? theme.red1 : theme.bg1)};
	transition: border-color 300ms ${({ error }) => (error ? "step-end" : "step-start")},
		color 500ms ${({ error }) => (error ? "step-end" : "step-start")};
	background-color: ${({ theme }) => theme.bg1};
	padding: 1rem;
	height: 56px;
`;

export const InputContainer = styled.div`
	flex: 1;
`;

export const Input = styled.input<{ error?: boolean }>`
	font-size: 1rem;
	outline: none;
	border: none;
	flex: 1 1 auto;
	background-color: ${({ theme }) => theme.bg1};
	transition: color 300ms ${({ error }) => (error ? "step-end" : "step-start")};
	color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 500;
	width: 100%;
	::placeholder {
		color: ${({ theme }) => theme.text1};
	}
	padding: 0px;
	-webkit-appearance: textfield;

	::-webkit-search-decoration {
		-webkit-appearance: none;
	}

	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.text1};
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
