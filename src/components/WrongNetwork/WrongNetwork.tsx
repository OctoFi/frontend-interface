import React from "react";
import { Button, Card } from "react-bootstrap";
import EthereumLogo from "../../assets/images/networks/ethereumMainnet.svg";
// import { useWalletModalToggle } from "../../state/application/hooks";
// import DefaultCard from "../Card";
import * as Styled from "./styleds";

export const WrongNetwork = () => {
	// const toggleWalletModal = useWalletModalToggle();
	// TODO: add action
	const toggleWalletModal = () => {
		alert("Coming Soon");
	};

	return (
		// <DefaultCard></DefaultCard>
		<Card>
			<Card.Body>
				<div className="d-flex flex-column align-items-center">
					<Styled.ImageContainer>
						<Styled.Icon src={EthereumLogo} />
					</Styled.ImageContainer>
					<Styled.Title>Wrong Network</Styled.Title>
					<p>Please connect to the Ethereum network to continue.</p>
					<Button onClick={toggleWalletModal}>Change Network</Button>
				</div>
			</Card.Body>
		</Card>
	);
};
