import { Button } from "react-bootstrap";
import { X } from "react-feather";

export type PureDisconnectAccountProps = {
	label: string;
	onLogout?: () => void;
};

export const PureDisconnectAccount = ({ label, onLogout }: PureDisconnectAccountProps) => {
	return (
		<Button onClick={onLogout} variant="light" className="d-inline-flex gap-2 flex-nowrap align-items-center">
			<X size={24} />
			<span>{label}</span>
		</Button>
	);
};
