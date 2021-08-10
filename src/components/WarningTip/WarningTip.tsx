import { Alert, Button } from "react-bootstrap";

export interface PureWarningTipProps {
	message: string;
	show?: boolean;
	onDismiss?: () => void;
}

export const PureWarningTip = ({ message, show = true, onDismiss }: PureWarningTipProps) => {
	return (
		<Alert show={show} variant="warning">
			<div className="d-flex justify-content-between align-items-center">
				<p className="mb-0">{message}</p>

				<Button onClick={onDismiss} variant="warning">
					Agree
				</Button>
			</div>
		</Alert>
	);
};
