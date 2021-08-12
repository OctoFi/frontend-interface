import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
	background-color: ${({ theme }) => theme.modalBG};
	border-radius: 12px;
	border: 1px solid ${({ theme }) => theme.borderColor2};
`;

export interface PureCustomCardProps {
	header?: any;
	body?: any;
	children?: any;
}

export const PureCustomCard = ({ header, body, children }: PureCustomCardProps) => {
	return (
		<StyledCard>
			{header && <Card.Header>{header}</Card.Header>}
			<Card.Body>{children || body}</Card.Body>
		</StyledCard>
	);
};
