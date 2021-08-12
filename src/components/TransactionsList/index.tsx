import { useTranslation } from "react-i18next";
import { getExplorerLink } from "../../utils";
import * as Styled from "./styleds";

const TransactionsList = ({ transactions }) => {
	const { t } = useTranslation();

	return (
		<Styled.Box>
			{transactions && transactions?.length > 0 ? (
				transactions.map((txn) => {
					return (
						<Styled.TxnBox
							href={txn?.hash ? getExplorerLink(1, txn?.hash, "transaction") : "#"}
							target={"_blank"}
							rel={"noreferrer noopener"}
						>
							{txn?.hash ? txn?.hash?.slice(0, 6) + "..." + txn?.hash?.slice(-4) : "-"} 🡕
						</Styled.TxnBox>
					);
				})
			) : (
				<Styled.EmptyText>{t("errors.noRecentTransaction")}</Styled.EmptyText>
			)}
		</Styled.Box>
	);
};

export default TransactionsList;
