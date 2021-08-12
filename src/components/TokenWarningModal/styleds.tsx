import styled from "styled-components";
import { AlertTriangle } from "react-feather";
import { transparentize } from "polished";

export const Wrapper = styled.div<{ error: boolean }>`
	background: ${({ theme }) => transparentize(0.6, theme.bg1)};
	padding: 0.75rem;
	border-radius: 0.42rem;
`;

export const WarningIcon = styled(AlertTriangle)`
	stroke: ${({ theme }) => theme.red1};
`;

export const Title = styled.h3`
	font-size: 1.25rem;
	font-weight: 700;
`;
