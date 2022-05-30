import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import SVG from "react-inlinesvg";
import { Button } from "react-bootstrap";

import AssetIcon from "../../assets/images/account/assets.svg";
import DebtIcon from "../../assets/images/account/debts.svg";
import DepositsIcon from "../../assets/images/account/deposits.svg";
import NetWorthIcon from "../../assets/images/account/networth.svg";
import WalletIcon from "../../assets/images/account/wallet.svg";
import ArrowRightIcon from "../../assets/images/global/arrow-right.svg";

import useTheme from "../../hooks/useTheme";
import { PureCurrencyText } from "../CurrencyText/CurrencyText";
import * as Styled from "./styleds";

const icons: { [key: string]: string; } = {
	assets: AssetIcon,
	debts: DebtIcon,
	deposits: DepositsIcon,
	netWorth: NetWorthIcon,
	wallet: WalletIcon,
};

export interface PureAccountCardProps {
	type?: 'assets' | 'debts' | 'deposits' | 'netWorth' | 'wallet';
	color?: string;
	title?: string;
	value?: string | number;
	assets?: any;
	onShowMore?: () => void;
	loading?: boolean;
}

export const PureAccountCard = ({
	type = "wallet",
	color = "primary",
	title = "Wallet",
	value = "0",
	assets,
	onShowMore,
	loading = false,
	children,
}: PropsWithChildren<PureAccountCardProps>) => {
	const { t } = useTranslation();
	const theme = useTheme();
	// @ts-ignore
	const themeColor = theme[color];

	const showCardBody = children && assets?.balances?.length > 0;
	const showCardAction = assets?.balances?.length > 5;

	return (
		<Styled.Card>
			<Styled.CardHeader>
				<Styled.CardIcon color={themeColor}>
					<Styled.CardImg src={icons[type]} />
				</Styled.CardIcon>

				<Styled.CardHeaderContent>
					<Styled.Title>{title}</Styled.Title>
					<Styled.Value>{loading ? <Skeleton width={120} /> : <PureCurrencyText value={value} />}</Styled.Value>
				</Styled.CardHeaderContent>
			</Styled.CardHeader>

			{showCardBody && (
				<Styled.CardBody>
					<div className={"d-flex flex-column w-100 flex-grow-1"}>
						<div className={"flex-grow-1 align-self-stretch"}>{children}</div>

						{showCardAction && (
							<div className={"d-flex justify-content-end"}>
								<Button variant={"link"} onClick={onShowMore} className="d-flex align-items-center">
									<span>{t("more")}</span>
									<SVG src={ArrowRightIcon} width={8} height={12} className="ms-3" />
								</Button>
							</div>
						)}
					</div>
				</Styled.CardBody>
			)}
		</Styled.Card>
	);
};
