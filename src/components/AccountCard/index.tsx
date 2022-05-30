import { PropsWithChildren } from "react";
import useTheme from "../../hooks/useTheme";
import { PureAccountCard } from "./AccountCard";

import AssetIcon from "../../assets/images/account/assets.svg";
import DebtIcon from "../../assets/images/account/debts.svg";
import DepositsIcon from "../../assets/images/account/deposits.svg";
import NetWorthIcon from "../../assets/images/account/networth.svg";
import WalletIcon from "../../assets/images/account/wallet.svg";

const icons: { [key: string]: string; } = {
	assets: AssetIcon,
	debts: DebtIcon,
	deposits: DepositsIcon,
	netWorth: NetWorthIcon,
	wallet: WalletIcon,
};

export type AccountCardProps = {
	color?: string;
	title: string;
	value: string | number;
	type?: string;
	assets?: any;
	onShowMore?: () => void;
	loading?: boolean;
};

const AccountCard = ({
	color,
	title,
	value,
	type = "wallet",
	assets,
	onShowMore,
	loading = false,
	children,
}: PropsWithChildren<AccountCardProps>) => {
	const theme = useTheme();
	// @ts-ignore
	const themeColor = theme[color];

	return (
		<PureAccountCard
			icon={icons[type]}
			color={themeColor}
			title={title}
			value={value}
			assets={assets}
			onShowMore={onShowMore}
			loading={loading}
		>
			{children}
		</PureAccountCard>
	);
};

export default AccountCard;
