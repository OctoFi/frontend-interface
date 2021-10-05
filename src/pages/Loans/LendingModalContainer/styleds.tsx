import styled from "styled-components";
import { TYPE } from "../../../theme";

export const Title = styled.h4`
	font-size: 1.25rem;
	font-weight: 500;
	margin-top: 0;
	margin-bottom: 2.25rem;
`;

export const SummaryRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.text3};
	font-size: 1rem;
	font-weight: 500;
`;

export const TypeBlack = styled(TYPE.Black)`
	font-size: 0.75rem;

	@media (min-width: 768px) {
		font-size: 1rem;
	}
`;

export const CustomButton = styled.button`
	height: 56px;
	min-height: 56px;
	min-width: 250px;
`;
