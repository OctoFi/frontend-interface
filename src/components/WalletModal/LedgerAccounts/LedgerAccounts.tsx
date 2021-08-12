import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { useActiveWeb3React } from "../../hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { shortenAddress } from "../../utils";
import * as Styled from "./styleds";

export interface LedgerAccountsProps {
	onDone?: any;
}

export const LedgerAccounts = ({ onDone }: LedgerAccountsProps) => {
	const { connector } = useActiveWeb3React();
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const accountsEthBalance = useETHBalances(accounts);
	const { t } = useTranslation();

	useEffect(() => {
		if (connector?.getAccounts) {
			connector?.getAccounts(2).then((acc) => {
				setAccounts(acc);
			});
		}
	}, [connector]);

	const changeSelectedAccount = (e) => {
		setSelectedAccount(e.target.value);
	};

	const selectLedgerAccount = (e) => {
		e.preventDefault();
		if (!selectedAccount) {
			toast.error(t("errors.selectAAccount"));
		}

		if (connector?.setAccount) {
			connector?.setAccount(selectedAccount);
			onDone();
		}
	};

	return (
		<Styled.UpperSection>
			<Styled.ContentWrapper>
				<Form onSubmit={selectLedgerAccount}>
					<Row>
						<Form.Group as={Col} xs={12}>
							<Form.Label>Select default Address</Form.Label>
							<Styled.Select
								as={"select"}
								size={5}
								className={"custom-select"}
								htmlSize={5}
								custom
								onChange={changeSelectedAccount}
							>
								{accounts.map((acc) => {
									return (
										<Styled.Option key={acc} value={acc}>
											{shortenAddress(acc)}&nbsp;&nbsp;&nbsp;
											{accountsEthBalance?.[acc]?.toFixed(6) || 0} ETH
										</Styled.Option>
									);
								})}
							</Styled.Select>
						</Form.Group>
						<Form.Group as={Col} xs={12} className={"d-flex align-items-center justify-content-center"}>
							<Button type={"submit"} variant={"primary"} style={{ minWidth: 125, height: 56 }}>
								Select Account
							</Button>
						</Form.Group>
					</Row>
				</Form>
			</Styled.ContentWrapper>
		</Styled.UpperSection>
	);
};
