import { Button, Card } from "react-bootstrap";
import { useDarkModeManager } from "../../state/user/useDarkModeManager";

export interface PureAddFundsProps {
	title?: string;
	value?: string | number;
	label?: string;
	onAddFunds?: () => void;
}

export const PureAddFunds = ({
	title = "Balance",
	value = "0",
	label = "Add Funds",
	onAddFunds,
}: PureAddFundsProps) => {
	const [darkMode] = useDarkModeManager();

	return (
		<div>
			<Card
				bg={darkMode ? 'dark text-white' : ''}
				border={darkMode ? 'secondary' : ''}
				className="border rounded-0 rounded-top p-2 text-center"
			>
				<p className="m-0 fs-6">{title}</p>
				<p className="m-0 fs-4 fw-bold">{value}</p>
			</Card>
			<div className="d-grid gap-2">
				<Button variant="primary" size="lg" className="rounded-0 rounded-bottom" onClick={onAddFunds}>
					{label}
				</Button>
			</div>
		</div>
	);
};
