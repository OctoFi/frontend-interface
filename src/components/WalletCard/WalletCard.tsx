import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Nav } from "react-bootstrap";
import { Search } from "react-feather";
import { InputGroup, InputGroupText, InputGroupFormControl as FormControl } from "../Form";
import NftTab from "./NftWallet";
import WalletTable from "./WalletTable";

export const WalletCard = () => {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");

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
					<WalletTable query={query} />
				</Tab.Pane>

				<Tab.Pane eventKey="nft">
					<NftTab query={query} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
};
