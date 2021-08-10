import { useState } from "react";
import { Button, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Wallet } from "react-bootstrap-icons";
import { Copy } from "react-feather";
import { useTranslation } from "react-i18next";

import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { shortenAddress } from "../../utils";
import AddFundsButton from "../AddFunds";

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
									<Button
										onClick={toggleConnectModal}
										variant="light"
										className="text-muted bg-transparent border-0"
									>
										{account && shortenAddress(account)}

										<Copy size={16} className="ms-1" />
									</Button>
								</OverlayTrigger>
							</div>

							<AddFundsButton />
						</>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
