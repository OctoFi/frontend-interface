import BootstrapTable from "react-bootstrap-table-next";
import * as Styled from "./styleds";

export type WalletTableProps = {
	query: string;
	// entities: any;
	// columns: any;
};

// columns={TokensColumns} entities={filteredTokensData}
export const WalletTable = ({ query }: WalletTableProps) => {
	return (
		<Styled.WalletTableWrap>
			<BootstrapTable
				wrapperClasses="table-responsive d-none d-lg-block"
				bordered={false}
				classes="table table-head-custom table-vertical-center overflow-hidden"
				bootstrap4
				remote
				keyField="id"
				data={entities === null ? [] : entities}
				columns={columns}
			></BootstrapTable>
		</Styled.WalletTableWrap>
	);
};
