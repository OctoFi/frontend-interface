import SVG from "react-inlinesvg";
import { useTranslation } from "react-i18next";
import AccountWalletIcon from "../../assets/images/account/wallet.svg";
import * as Styled from "./styleds";

export interface WalletConnectStatusProps {
	account?: string | null;
}

export const PureWalletConnectStatus = ({ account }: WalletConnectStatusProps) => {
	const { t } = useTranslation();

	return (
		<div>
			{account ? (
				<Styled.AccountState type={"success"} className={"bg-light-success"}>
					<SVG src={AccountWalletIcon} width={36} height={36} />
					<Styled.AccountStateContent>
						<Styled.AccountStateTitle>{t("wallet.connected")}</Styled.AccountStateTitle>
						<Styled.AccountStateDesc>
							{t("wallet.connectedTo")} <strong>{account}</strong>
						</Styled.AccountStateDesc>
					</Styled.AccountStateContent>
				</Styled.AccountState>
			) : (
				<Styled.AccountState type={"danger"} className={"bg-light-danger"}>
					<SVG src={AccountWalletIcon} width={36} height={36} />
					<Styled.AccountStateContent>
						<Styled.AccountStateTitle className={"mb-0"}>
							{t("wallet.notConnected")}
						</Styled.AccountStateTitle>
					</Styled.AccountStateContent>
				</Styled.AccountState>
			)}
		</div>
	);
};
