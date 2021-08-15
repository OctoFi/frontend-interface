import React, { useCallback, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Token } from "@uniswap/sdk";
import { TokenWarningCard } from "./TokenWarningCard";
import * as Styled from "./styleds";

export interface TokenWarningModalProps {
	isOpen: boolean;
	tokens: Token[];
	onConfirm: () => void;
}

export const TokenWarningModal = ({ isOpen, tokens, onConfirm }: TokenWarningModalProps) => {
	const [understandChecked, setUnderstandChecked] = useState(false);
	const toggleUnderstand = useCallback(() => setUnderstandChecked((uc) => !uc), []);
	const handleDismiss = useCallback(() => null, []);

	return (
		<Modal show={isOpen} backdrop="static" centered={true} onHeight={handleDismiss}>
			<Modal.Header className={"px-5"}>
				<Modal.Title className={"d-flex align-items-center"}>
					<Styled.WarningIcon />
					<Styled.Title className={"fw-bolder fs-5 text-danger mb-0 ml-4"}>
						Token imported
					</Styled.Title>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={"px-5"}>
				<p className={"text-danger fw-normal"}>
					Anyone can create an ERC20 token on Ethereum with <em>any</em> name, including creating fake
					versions of existing tokens and tokens that claim to represent projects that do not have a token.
				</p>
				<p className={"text-danger fw-normal"}>
					This interface can load arbitrary tokens by token addresses. Please take extra caution and do your
					research when interacting with arbitrary ERC20 tokens.
				</p>
				<p className={"text-danger fw-normal"}>
					If you purchase an arbitrary token, <strong>you may be unable to sell it back.</strong>
				</p>
				{tokens.map((token) => {
					return <TokenWarningCard key={token.address} token={token} />;
				})}

				<div className={"d-flex align-items-center justify-content-between pt-4 pb-2"}>
					<Form.Check
						custom
						type={"checkbox"}
						id={`understand-checkbox`}
						label={`I Understand`}
						checked={understandChecked}
						onChange={toggleUnderstand}
					/>
					<Button
						disabled={!understandChecked}
						className={"px-4 py-2 fw-bold"}
						onClick={onConfirm}
						variant={"danger"}
					>
						Continue
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};
