import { Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

import { ROUTE_COIN_DETAILS } from "../../../constants/routes";
import CurrencyText from "../../CurrencyText";
import CoinDisplay from "../../CoinDisplay";
import * as Styled from "./styleds";

export type PureWalletTableProps = {
	data: any;
	loading?: boolean;
};

export const PureWalletTable = ({ data, loading = false }: PureWalletTableProps) => {
	const { t } = useTranslation();
	const history = useHistory();

	const rowEvents = {
		onClick: (e: any, row: any) => {
			if (row.metadata.symbol === "ETH") {
				history.push(`${ROUTE_COIN_DETAILS}/ethereum`);
			} else {
				// TODO: verify correct
				history.push(`${ROUTE_COIN_DETAILS}/${row.metadata.address}`);
				// history.push(`${ROUTE_COIN_DETAILS}/contract/${row.metadata.address}`);
			}
		},
	};

	const columns = [
		{
			dataField: "token",
			text: t("token"),
			formatter: (cellContent: any, row: any) => {
				const isLoading = row.loading || false;

				return (
					<>
						{isLoading ? (
							<Skeleton width={"100%"} height={"100%"} circle />
						) : (
							<CoinDisplay
								currency={row.balance.currency}
								name={row.metadata.name}
								symbol={row.metadata.symbol}
							/>
						)}
					</>
				);
			},
		},
		{
			dataField: "balance",
			text: t("balanceTitle"),
			formatter: (cellContent: any, row: any) => {
				const isLoading = row.loading || false;

				return (
					<>
						{isLoading ? (
							<Skeleton width={80} height={24} />
						) : (
							<span>{row.balance ? row.balance.toSignificant(6) : 0}</span>
						)}
					</>
				);
			},
		},
		{
			dataField: "value",
			text: t("totalValue"),
			formatter: (cellContent: any, row: any) => {
				const isLoading = row.loading || false;

				return (
					<>
						{isLoading ? (
							<div className={"d-flex align-items-center"}>
								<Skeleton width={24} height={24} className={"mr-2"} />
								<Skeleton width={80} height={24} />
							</div>
						) : (
							<CurrencyText value={row.balanceUSD} />
						)}
					</>
				);
			},
		},
	];

	if (loading) {
		return (
			<div className="py-5 w-100 d-flex align-items-center justify-content-center">
				<Spinner animation="border" variant="primary" id="tokens-wallet" />
			</div>
		);
	}

	return (
		<Styled.TableWrap>
			<BootstrapTable
				keyField="id"
				bordered={false}
				striped
				hover
				data={data}
				columns={columns}
				rowEvents={rowEvents}
			></BootstrapTable>
		</Styled.TableWrap>
	);
};
