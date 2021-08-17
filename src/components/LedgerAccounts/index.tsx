import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useActiveWeb3React } from "../../hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { PureLedgerAccounts } from "./LedgerAccounts";

export interface LedgerAccountsProps {
	onDone?: any;
}

const LedgerAccounts = ({ onDone }: LedgerAccountsProps) => {
	const { connector } = useActiveWeb3React();
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const accountsEthBalance = useETHBalances(accounts);
	const { t } = useTranslation();

	useEffect(() => {
		if (connector?.getAccounts) {
			connector.getAccounts(2).then((acc) => setAccounts(acc));
		}
	}, [connector]);

	const onChangeSelection = (e: any) => {
		setSelectedAccount(e.target.value);
	};

	const onSelectAccount = (e: any) => {
		e.preventDefault();
		if (!selectedAccount) {
			toast.error(t("errors.selectAAccount"));
		}

		if (connector?.setAccount) {
			connector.setAccount(selectedAccount);
			onDone();
		}
	};

	return (
		<PureLedgerAccounts
			accounts={accounts}
			accountsEthBalance={accountsEthBalance}
			onSelectAccount={onSelectAccount}
			onChangeSelection={onChangeSelection}
		/>
	);
};

export default LedgerAccounts;
