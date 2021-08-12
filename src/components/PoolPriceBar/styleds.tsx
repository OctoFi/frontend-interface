import styled from "styled-components";
import { Text } from "rebass";

export const PriceRow = styled.div`
	${({ theme }) => theme.flexRowNoWrap};
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const Label = styled(Text)`
	font-size: 0.875rem;
`;

export const Content = styled(Text)`
	font-size: 0.875rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
