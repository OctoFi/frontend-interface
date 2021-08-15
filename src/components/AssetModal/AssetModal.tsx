import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { X as Close } from "react-bootstrap-icons";

import { ROUTE_DASHBOARD } from "../../constants/routes";
import { AppState } from "../../state";
import AssetTable from "../AssetTable";
import { Modal } from "../Modal/bootstrap";
import * as Styled from "./styleds";

export const AssetModal = () => {
	const history = useHistory();
	const overview = useSelector((state: AppState) => state.balances.overview);
	const { asset } = useParams();

	const onHide = () => history.push(ROUTE_DASHBOARD);

	if (overview[asset] === undefined) {
		onHide();
	}

	let data = overview[asset] ? overview[asset].balances : [];

	return (
		<Modal size={"lg"} show={true} centered={true} className={"assets"} onHide={onHide}>
			<Modal.Header className={"d-flex align-items-center justify-content-between"}>
				<Modal.Title className={"mb-0 fs-6"}>
					<Styled.Title>{overview[asset].title || "Assets"}</Styled.Title>
				</Modal.Title>

				<Styled.CloseButton onClick={onHide}>
					<Close />
				</Styled.CloseButton>
			</Modal.Header>
			<Modal.Body className={"py-3"}>
				<AssetTable balances={data} />
			</Modal.Body>
		</Modal>
	);
};
