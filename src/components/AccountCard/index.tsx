import { PureAccountCard } from "./AccountCard";

import { PropsWithChildren, useContext } from "react";
import { ThemeContext } from "styled-components";

import AssetIcon from "../../assets/images/account/assets.svg";
import DebtIcon from "../../assets/images/account/debts.svg";
import DepositsIcon from "../../assets/images/account/deposits.svg";
import NetWorthIcon from "../../assets/images/account/networth.svg";
import WalletIcon from "../../assets/images/account/wallet.svg";

const icons: any = {
	assets: AssetIcon,
	debts: DebtIcon,
	deposits: DepositsIcon,
	netWorth: NetWorthIcon,
	wallet: WalletIcon,
};

export type AccountCardProps = {
	color?: any;
	type?: string;
	title: string;
	value: string | number;
	assets?: any;
	onShowMore?: any;
	loading?: boolean;
	show?: boolean;
	className?: string | undefined;
};

function AccountCard({
	color = "primary",
	type = "wallet",
	title,
	value,
	assets,
	onShowMore,
	loading = false,
	show,
	className,
	children,
}: PropsWithChildren<AccountCardProps>) {
	const theme = useContext(ThemeContext);
	// @ts-ignore
	const themeColor = theme[color];
	const showCardBody = children && assets?.balances?.length > 0;
	const showCardAction = assets?.balances?.length > 5;

	if (!show) {
		return null;
	}

	return (
		<PureAccountCard
			className={className}
			icon={icons[type]}
			color={themeColor}
			title={title}
			value={value}
			onShowMore={onShowMore}
			loading={loading}
			assets={assets}
		/>
	);
}

export default AccountCard;
