import styled from "styled-components";
import { Form } from "react-bootstrap";
import { lighten } from "polished";

export const ContentWrapper = styled.div`
	background-color: ${({ theme }) => theme.modalBG};
	border-radius: 12px;
	color: ${({ theme }) => theme.text1};
	padding: 1rem;
`;

export const Select = styled(Form.Select)`
	background-color: ${({ theme }) => theme.bg1};
	border: 1px solid ${({ theme }) => theme.text3};
	border-radius: 12px;
	color: ${({ theme }) => theme.text1};
	overflow: hidden;
`;

export const Option = styled.option`
	padding: 0.5rem 1rem;
	border-radius: 12px;

	&:checked {
		background-color: ${({ theme }) => theme.primary};
	}
`;
