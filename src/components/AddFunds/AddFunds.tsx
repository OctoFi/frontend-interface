import { Button, Card } from "react-bootstrap";

export interface PureAddFundsProps {
	title?: string;
	value?: string | number;
	label?: string;
	onAddFunds?: () => void;
	dark?: boolean;
}

export const PureAddFunds = ({
	title = "Balance",
	value = "0",
	label = "Add Funds",
	onAddFunds,
	dark = false,
}: PureAddFundsProps) => {
	return (
		<div>
			<Card
				bg={dark ? 'dark text-white' : ''}
				border={dark ? 'secondary' : ''}
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
