import styled from "styled-components";
import { Form } from "react-bootstrap";
import { lighten } from "polished";

export const UpperSection = styled.div`
	position: relative;

	h5 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		font-weight: 400;
	}

	h5:last-child {
		margin-bottom: 0;
	}

	h4 {
		margin-top: 0;
		font-weight: 500;
	}
`;

export const ContentWrapper = styled.div`
	background-color: ${({ theme }) => theme.modalBG};
	margin-bottom: 1rem;
	border-bottom-left-radius: 0.42rem;
	border-bottom-right-radius: 0.42rem;
`;

export const Select = styled(Form.Control)`
	background-color: ${({ theme }) => theme.bg1};
	border-radius: 12px;
	border: 1px solid ${({ theme }) => theme.text3};
	overflow: hidden;

	&:focus {
		box-shadow: none;
		outline: none;
		border: 1px solid ${({ theme }) => theme.text3};
	}

	/* width */
	::-webkit-scrollbar {
		width: 3px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: none;
		background-color: transparent;
		border-radius: 10px;
		padding: 0 6px;
		margin: 0 6px;
		border-right: 1px solid ${({ theme }) => theme.text1};
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.text1};
		border-radius: 10px;
		width: 4px !important;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => lighten(0.08, theme.text1)};
	}
`;

export const Option = styled.option`
	padding: 10px 18px;
	border-radius: 12px;

	@media (max-width: 576px) {
		padding: 10px 8px;
	}

	&:checked {
		background-color: ${({ theme }) => theme.primary};
	}
`;
