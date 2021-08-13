import { PropsWithChildren } from "react";
import useTheme from "../../hooks/useTheme";
import { PureAccountCard } from "./AccountCard";

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
	const theme = useTheme();
	// @ts-ignore
	const themeColor = theme[color];

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
