import React from "react";
import { Button, Card } from "react-bootstrap";
import EthereumLogo from "../../assets/images/networks/ethereumMainnet.svg";
import * as Styled from "./styleds";

export interface PureWrongNetworkProps {
	title: string;
	message: string;
	label: string;
	onChangeNetwork?: () => void;
}

export const PureWrongNetwork = ({ title, message, label, onChangeNetwork }: PureWrongNetworkProps) => {
	return (
		<Card>
			<Card.Body>
				<div className="text-center">
					<Styled.ImageContainer>
						<Styled.Icon src={EthereumLogo} />
					</Styled.ImageContainer>
					<Styled.Title>{title}</Styled.Title>
					<p>{message}</p>
					<Button onClick={onChangeNetwork}>{label}</Button>
				</div>
			</Card.Body>
		</Card>
	);
};
