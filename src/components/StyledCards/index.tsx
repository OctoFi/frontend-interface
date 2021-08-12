import styled from "styled-components";
import { Box } from "rebass/styled-components";
import { lighten } from "polished";

const StyledCard = styled(Box)<{ padding?: string; border?: string; borderRadius?: string }>`
	width: 100%;
	border-radius: 12px;
	padding: 1.25rem;
	padding: ${({ padding }) => padding};
	border: ${({ border }) => border};
	border-radius: ${({ borderRadius }) => borderRadius};
`;

export default StyledCard;

export const LightCard = styled(StyledCard)`
	border: 1px solid ${({ theme }) => theme.borderColor2};
	background-color: ${({ theme }) => theme.modalBG};
`;

export const LightGreyCard = styled(StyledCard)`
	background-color: ${({ theme }) => lighten(0.1, theme.modalBG)};
`;

export const GreyCard = styled(StyledCard)`
	background-color: ${({ theme }) => theme.bg1};
`;
