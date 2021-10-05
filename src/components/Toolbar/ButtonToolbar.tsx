import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { RefreshCw, Settings } from "react-feather";
import { ArrowRepeat, Eye, EyeSlash, Gear } from "react-bootstrap-icons";
import { Button, ButtonGroup } from "react-bootstrap";
import { ROUTE_SETTINGS } from "../../constants/routes";
import WalletSidebar from "../WalletSidebar";

export const ButtonToolbar = () => {
	const [view, setView] = useState(true);
	const onRefresh = () => alert("Easily refresh your wallet balance and site data. Coming soon");
	const onToggleView = () => setView(!view);

	return (
		<ButtonGroup aria-label="Button toolbar" size="lg" className="ms-auto">
			<Button onClick={onToggleView}>{view ? <Eye size={24} /> : <EyeSlash size={24} />}</Button>

			<Button as={NavLink} to={ROUTE_SETTINGS}>
				<Gear size={24} />
			</Button>

			<Button onClick={onRefresh}>
				<ArrowRepeat size={24} />
			</Button>

			<WalletSidebar />
		</ButtonGroup>
	);
};
