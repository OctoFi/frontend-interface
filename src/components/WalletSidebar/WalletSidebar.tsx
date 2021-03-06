import { useState } from "react";
import { Button, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Wallet } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useWalletModalToggle } from "../../state/application/hooks";
import { useIsDarkMode } from "../../state/user/hooks";
import { shortenAddress } from "../../utils";
import AddFunds from "../AddFunds";
import CopyButton from "../CopyButton";
import DisconnectAccount from "../DisconnectAccount";
import ProfileAddress from "../ProfileAddress";
import TransakButton from "../TransakButton";
import ViewOnExplorer from "../ViewOnExplorer";
import WalletConnectorName from "../WalletConnectorName";

export const WalletSidebar = () => {
	const darkMode = useIsDarkMode();
	const { account } = useActiveWeb3React();
	const toggleConnectModal = useWalletModalToggle();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);
	const { t } = useTranslation();

	return (
		<>
			<Button onClick={toggleShow}>
				<Wallet size={20} />
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end" className={darkMode ? "bg-dark" : "bg-light"}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Wallet</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{!account ? (
						<div className="d-grid">
							<Button variant={"primary"} onClick={toggleConnectModal}>
								{t("menu.connect")}
							</Button>
						</div>
					) : (
						<div className="d-grid gap-3">
							<WalletConnectorName />
							<ProfileAddress />
							<OverlayTrigger placement={"top"} overlay={<Tooltip id={"copy-tooltip"}>Copy</Tooltip>}>
								<CopyButton toCopy={account}>{account && shortenAddress(account)}</CopyButton>
							</OverlayTrigger>
							<AddFunds />
							<ViewOnExplorer />
							<DisconnectAccount />
							<TransakButton />
						</div>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
