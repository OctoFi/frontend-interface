// import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";

import NftItem from "../NftItem";
import { NavLink } from "react-router-dom";
import { ROUTE_NFT_MARKETPLACE } from "../../../constants/routes";

export interface PureNftWalletProps {
	items?: any;
}

export const PureNftWallet = ({ items }: PureNftWalletProps) => {
	// const { t } = useTranslation();

	if (items.length === 0) {
		return (
			<div className="text-center pt-4">
				<h4>Empty</h4>
				<p>Find the most popular NFTs from OpenSea using our NFT Marketplace.</p>
				<Button as={NavLink} to={ROUTE_NFT_MARKETPLACE} variant="primary" size="lg">
					Go to Marketplace
				</Button>
			</div>
		);
	}

	return (
		<Row className="justify-content-start">
			{items.map((item: any) => {
				return (
					<Col key={`nft-${item.id}`}>
						<NftItem item={item} />
					</Col>
				);
			})}
		</Row>
	);
};
