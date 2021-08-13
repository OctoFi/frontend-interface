import { InputGroup as Group, Form } from "react-bootstrap";
import styled from "styled-components";

export const InputGroupText = styled(Group.Text)`
	background-color: ${({ theme }) => theme.bg1};
	border-color: ${({ theme }) => theme.borderColor2};
	color: ${({ theme }) => theme.text2};
`;

export const FormControl = styled(Form.Control)`
	background-color: ${({ theme }) => theme.bg1};
	border-color: ${({ theme }) => theme.borderColor2};
	color: ${({ theme }) => theme.text2};

	&:focus {
		color: ${({ theme }) => theme.text2};
	}
`;

export const InputGroupFormControl = styled(FormControl)``;

export const InputGroup = styled(Group)`
	${InputGroupText} {
		background-color: ${({ theme, bg }) => (bg === "darker" ? theme.bg1 : theme.modalBG)};
	}

	${InputGroupFormControl} {
		background-color: ${({ theme, bg }) => (bg === "darker" ? theme.bg1 : theme.modalBG)};
	}
`;
