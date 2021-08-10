import { Button } from "react-bootstrap";
import SVG from "react-inlinesvg";
import GasStationOutlined from "../../assets/images/local_gas_station_outlined.svg";

export interface GasIndicatorProps {
	gas?: string | number;
	onClick?: () => void;
}

export const GasIndicator = ({ gas = 0, onClick }: GasIndicatorProps) => {
	return (
		<Button variant="light" onClick={onClick} className="d-inline-flex align-items-center text-success fw-bold">
			<SVG src={GasStationOutlined} />
			<span className="ms-1">{gas}</span>
		</Button>
	);
};
