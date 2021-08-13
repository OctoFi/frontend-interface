import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

import Page from "../../components/Page";
import ExchangeIcon from "../../components/Icons/Exchange";
// import TransactionHistory from "../../components/TransactionHistory";
import * as Styled from "./styleds";

export const History = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("transactionHistory")}>
			<Styled.CustomCard
				header={
					<Styled.Header className={"d-flex align-items-center justify-content-between"}>
						<Styled.Title>{t("history")}</Styled.Title>
						{account && transactions && (
							<CSVLink data={transactions} filename={`${account}_${blockNumber}__defi_dashboard.csv`}>
								<Button variant={"outline-primary"}>{t("download", { file: "CSV" })}</Button>
							</CSVLink>
						)}
					</Styled.Header>
				}
			>
				{account ? (
					<>{/* <TransactionHistory /> */}</>
				) : (
					<div className="d-flex flex-column align-items-center justify-content-center py-5 px-4">
						<ExchangeIcon size={48} fill={"#6993FF"} color={"#6993FF"} />
						<h5 className="text-primary font-weight-bolder mb-3 mt-5">{t("wallet.notConnected")}</h5>
						<span className="text-muted font-weight-light font-size-lg">{t("errors.walletConnect")}</span>
					</div>
				)}
			</Styled.CustomCard>
		</Page>
	);
};
