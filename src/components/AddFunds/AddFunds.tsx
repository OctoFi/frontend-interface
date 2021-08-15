import { Button, Card } from "react-bootstrap";

export interface PureAddFundsProps {
	title?: string;
	balance?: string | number;
	label?: string;
	onAddFunds?: () => void;
}

export const PureAddFunds = ({
	title = "Total Balance",
	balance = "0",
	label = "Add Funds",
	onAddFunds,
}: PureAddFundsProps) => {
	return (
		<div>
			<Card className="border rounded-top p-2 text-center">
				<p className="m-0 fs-6">{title}</p>
				<p className="m-0 fs-4 fw-bold">{balance}</p>
			</Card>
			<div className="d-grid gap-2">
				<Button variant="primary" size="lg" className="rounded-0 rounded-bottom" onClick={onAddFunds}>
					{label}
				</Button>
			</div>
		</div>
	);
};
