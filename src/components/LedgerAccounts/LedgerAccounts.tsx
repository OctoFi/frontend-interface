import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { shortenAddress } from "../../utils";
import * as Styled from "./styleds";

export interface PureLedgerAccountsProps {
	accounts: any;
	accountsEthBalance?: any;
	onSelectAccount?: (T: any) => void;
	onChangeSelection?: (T: any) => void;
}

export const PureLedgerAccounts = ({
	accounts,
	accountsEthBalance,
	onSelectAccount,
	onChangeSelection,
}: PureLedgerAccountsProps) => {
	const { t } = useTranslation();

	return (
		<Styled.ContentWrapper>
			<Form onSubmit={onSelectAccount}>
				<Form.Group>
					<Form.Label htmlFor="address">{t("selectDefaultAddress")}</Form.Label>
					<Styled.Select size="lg" htmlSize={5} onChange={onChangeSelection} id="address">
						{accounts.map((acct: any) => {
							const address = shortenAddress(acct);
							const balance = accountsEthBalance?.[acct]?.toFixed(6) || 0;

							return (
								<Styled.Option key={acct} value={acct}>
									{address}&nbsp;&nbsp;&nbsp;{balance} ETH
								</Styled.Option>
							);
						})}
					</Styled.Select>
				</Form.Group>

				<Form.Group className="d-flex justify-content-center mt-3">
					<Button type={"submit"} variant="primary" size="lg">
						{t("selectAccount")}
					</Button>
				</Form.Group>
			</Form>
		</Styled.ContentWrapper>
	);
};
