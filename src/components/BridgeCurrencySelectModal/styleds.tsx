import styled from "styled-components";
import { RowBetween } from "../Row";

export const BalanceText = styled(Text)`
	white-space: nowrap;
	overflow: hidden;
	max-width: 5rem;
	text-overflow: ellipsis;
`;

export const MenuItem = styled(RowBetween)`
	padding: 4px 20px;
	height: 56px;
	display: grid;
	grid-template-columns: auto minmax(auto, 1fr) auto;
	grid-gap: 16px;
	cursor: ${({ disabled }) => !disabled && "pointer"};
	pointer-events: ${({ disabled }) => disabled && "none"};
	opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};

	&:hover {
		background-color: ${({ theme, disabled }) => !disabled && theme.bg1};
	}
`;
