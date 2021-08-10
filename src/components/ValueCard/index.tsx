import { PureValueCard } from "./ValueCard";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { ThemeContext } from "styled-components";

import AssetIcon from "../../assets/images/account/assets.svg";
import DebtIcon from "../../assets/images/account/debts.svg";
import NetWorthIcon from "../../assets/images/account/networth.svg";

const icons: any = {
	assets: AssetIcon,
	debts: DebtIcon,
	netWorth: NetWorthIcon,
};

export type ValueCardProps = {
	color?: any;
	value: string;
	title: string;
	type: string;
	show?: boolean;
	loading?: boolean;
};

function ValueCard({ value, title, type, color = "primary", show = true, loading = false }: ValueCardProps) {
	const theme = useContext(ThemeContext);
	// @ts-ignore
	const themeColor = theme[color];

	if (loading) {
		return <Spinner animation="border" variant="primary" />;
	}

	if (!show) {
		return null;
	}

	return <PureValueCard value={value} title={title} image={icons[type] || icons["assets"]} color={themeColor} />;
}

export default ValueCard;
