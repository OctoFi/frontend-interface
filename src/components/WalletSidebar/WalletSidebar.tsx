import { useState } from "react";
import { Button, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Wallet } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

// import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { shortenAddress } from "../../utils";
import AddFundsButton from "../AddFunds";
import CopyButton from "../CopyButton";
import DisconnectAccount from "../DisconnectAccount";
import ProfileAddress from "../ProfileAddress";
import ViewOnExplorer from "../ViewOnExplorer";
import WalletConnectorName from "../WalletConnectorName";

export const WalletSidebar = () => {
	// const { account } = useActiveWeb3React();
	const account = "0x73F29805198cCE93015bC960F47885CF6268ce85";
	// const toggleConnectModal = useWalletModalToggle();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const { t } = useTranslation();

	const toggleConnectModal = () => alert("coming soon");

	return (
		<>
			<Button variant="primary" onClick={toggleShow} className="me-2">
				<Wallet size={20} />
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Wallet</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{!account ? (
						<Button variant={"primary"} onClick={toggleConnectModal}>
							{t("menu.connect")}
						</Button>
					) : (
						<>
							<div className="mb-2 text-end">
								<OverlayTrigger placement={"top"} overlay={<Tooltip id={"copy-tooltip"}>Copy</Tooltip>}>
									<CopyButton toCopy={account}>{account && shortenAddress(account)}</CopyButton>
								</OverlayTrigger>
							</div>

							<AddFundsButton />

							<div className="mt-2">
								<WalletConnectorName />
								<ProfileAddress />
								<ViewOnExplorer />
								<DisconnectAccount />
							</div>
						</>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
