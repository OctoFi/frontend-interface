import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, Nav, Spinner } from "react-bootstrap";
import { Search } from "react-feather";
import { AppState } from "../../state";
import { InputGroup, InputGroupText, InputGroupFormControl as FormControl } from "../Form";
import NftTab from "./NftWallet";
import WalletTable from "./WalletTable";

export const WalletCard = () => {
	const [query, setQuery] = useState("");
	const loading = useSelector((state: AppState) => state.balances.loading);
	const { t } = useTranslation();

	return (
		<Tab.Container defaultActiveKey={"tokens"}>
			<div className="d-flex flex-column-reverse flex-lg-row align-items-stretch align-items-lg-center justify-content-between mb-4">
				<Nav fill variant="pills">
					<Nav.Item>
						<Nav.Link eventKey="tokens">{t("importList.tokens")}</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="nft">{t("NFT")}</Nav.Link>
					</Nav.Item>
				</Nav>

				<InputGroup className={"w-auto mb-4 mb-lg-0"} bg={"darker"}>
					<InputGroupText>
						<Search />
					</InputGroupText>
					<FormControl
						id="wallet-search"
						placeholder={t("search")}
						value={query}
						onChange={(e: any) => setQuery(e.target.value)}
					/>
				</InputGroup>
			</div>
			<Tab.Content>
				<Tab.Pane eventKey="tokens">
					{loading ? (
						<div className="py-5 w-100 d-flex align-items-center justify-content-center">
							<Spinner animation="border" variant="primary" id="tokens-wallet" />
						</div>
					) : (
						<WalletTable query={query} />
					)}
				</Tab.Pane>

				<Tab.Pane eventKey="nft">
					<NftTab query={query} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};
