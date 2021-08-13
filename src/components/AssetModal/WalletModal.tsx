import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { X as Close } from "react-bootstrap-icons";
import { AppState } from "../../state";
import WalletTable from "../AssetTable/WalletTable";
import { Modal } from "../Modal/bootstrap";
import * as Styled from "./styleds";

export const WalletModal = () => {
	const overview = useSelector((state: AppState) => state.balances.overview);
	const history = useHistory();

	const onHide = () => {
		history.push("/dashboard");
	};

	if (overview.wallet === undefined) {
		onHide();
	}

	const onClickToken = (token) => {
		if (token.metadata.symbol === "ETH") {
			history.push("/coins/ethereum");
		} else {
			history.push(`/coins/${token.metadata.address}`);
		}
	};
	let data = overview.wallet.balances || [];

	return (
		<Modal size={"lg"} show={true} centered={true} className={"assets"} onHide={onHide}>
			<Modal.Header className={"d-flex align-items-center justify-content-between"}>
				<Modal.Title className={"mb-0 font-size-base"}>
					<Styled.Title>Wallet assets</Styled.Title>
				</Modal.Title>

				<Styled.CloseButton onClick={onHide}>
					<Close />
				</Styled.CloseButton>
			</Modal.Header>
			<Modal.Body className={"py-3"}>
				<WalletTable balances={data} onClickToken={onClickToken} />
			</Modal.Body>
		</Modal>
	);
};
