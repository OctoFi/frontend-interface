import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import getNetConfig from "../../config";
import { SUPPORTED_WALLETS } from "../../connectors";
import { NetworkContextName } from "../../constants/network";
import usePrevious from "../../hooks/usePrevious";
import { ApplicationModal } from "../../state/application/actions";
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";

import LedgerAccounts from "../LedgerAccounts";
import LedgerPaths from "../LedgerPaths";
import { Modal } from "../Modal/bootstrap";
import WalletSelector from "../WalletSelector";
import * as Styled from "./styleds";

const WALLET_VIEWS = {
	OPTIONS: "options",
	PENDING: "pending",
	LEDGER_PATH: "ledger_select_path",
	LEDGER_ACCOUNT: "ledger_select_account",
};

export const PureWalletModal = () => {
	const { t } = useTranslation();

	// important that these are destructed from the account-specific web3-react context
	const { active, account, connector, activate, error, chainId } = useWeb3React();
	const contextNetwork = useWeb3React(NetworkContextName);
	const [walletView, onSetWalletView] = useState(WALLET_VIEWS.OPTIONS);
	const [, setPendingWallet] = useState<AbstractConnector | undefined>();
	const [isLedger, setIsLedger] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('Connect to Wallet');

	const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
	const toggleWalletModal = useWalletModalToggle();
	const previousAccount = usePrevious(account);
	// close modal when a connection is successful
	const activePrevious = usePrevious(active);
	const connectorPrevious = usePrevious(connector);

	let config = getNetConfig();

	useEffect(() => {
		if (walletView === WALLET_VIEWS.LEDGER_PATH) {
			setModalTitle("Select HD Derivation path");
		} else if (walletView === WALLET_VIEWS.LEDGER_ACCOUNT) {
			setModalTitle("Select Account");
		} else {
			setModalTitle("Connect to Wallet");
		}
	}, [walletView]);

	// close on connection, when logged out before
	useEffect(() => {
		if (account && !previousAccount && walletModalOpen && !isLedger) {
			toggleWalletModal();
		}
	}, [account, previousAccount, toggleWalletModal, walletModalOpen, isLedger]);

	// always reset to options view
	useEffect(() => {
		if (walletModalOpen) {
			// setPendingError(false);
			onSetWalletView(WALLET_VIEWS.OPTIONS);
		}
	}, [walletModalOpen]);

	useEffect(() => {
		if (
			walletModalOpen &&
			((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))
		) {
			onSetWalletView(WALLET_VIEWS.OPTIONS);
		}
	}, [onSetWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

	const tryActivation = async (connector: AbstractConnector | undefined, ledgerConnect = false) => {
		setIsLedger(ledgerConnect);

		Object.keys(SUPPORTED_WALLETS).map((key) => {
			if (connector === SUPPORTED_WALLETS[key].connector) {
				return SUPPORTED_WALLETS[key].name;
			}
			return true;
		});

		// set wallet for pending view
		setPendingWallet(connector);
		onSetWalletView(WALLET_VIEWS.PENDING);

		// if the connector is walletconnect and the user has already tried to connect, manually reset the connector
		if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
			connector.walletConnectProvider = undefined;
		}

		if (ledgerConnect) {
			// onSetWalletView(WALLET_VIEWS.LEDGER_ACCOUNT);
			onSetWalletView(WALLET_VIEWS.LEDGER_PATH);
		}

		connector &&
			activate(connector, undefined, true)
				.then((res) => {
					if (ledgerConnect) {
						onSetWalletView(WALLET_VIEWS.LEDGER_ACCOUNT);
					}
				})
				.catch((error) => {
					if (error instanceof UnsupportedChainIdError) {
						// a little janky...can't use setError because the connector isn't set
						activate(connector);
					} else {
						// setPendingError(true);
					}
				});
	};

	const onHideModal = () => {
		// setPendingError(false);
		setPendingWallet(undefined);
		toggleWalletModal();
	};

	const onGoBack = () => {
		// setPendingError(false);
		onSetWalletView(WALLET_VIEWS.OPTIONS);
		// Sets selected wallet. constant moved to WalletSelector
		// setSelected(undefined);
	};

	if (!contextNetwork.active && !active) {
		return null;
	}

	return (
		<Modal
			show={walletModalOpen}
			onHide={onHideModal}
			dialogClassName={"wallet-modal"}
			backdropClassName={"backdrop"}
			size={"md"}
			centered
		>
			<Modal.Header closeButton>
				{walletView === WALLET_VIEWS.LEDGER_PATH && (
					<button
						className="btn btn-light-primary me-4 d-none d-xl-block"
						onClick={onGoBack}
					>
						Back
					</button>
				)}
				<Modal.Title>
					{modalTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{
					// @ts-ignore
					chainId && chainId !== config?.chainID && (
						<Alert variant="warning">{t("walletConnectNetwork")}</Alert>
					)
				}
				<Styled.Wrapper>
					{/* error?: UnsupportedChainIdError | boolean */}
					{error ? (
						<Styled.UpperSection>
							<Styled.ContentWrapper>
								{error instanceof UnsupportedChainIdError ? (
									<Alert variant="warning">{t("walletConnectNetwork")}</Alert>
								) : (
									<Alert variant="warning">{t("walletConnectError")}</Alert>
								)}
							</Styled.ContentWrapper>
						</Styled.UpperSection>
					) : walletView === WALLET_VIEWS.LEDGER_ACCOUNT ? (
						<LedgerAccounts onDone={() => onSetWalletView(WALLET_VIEWS.OPTIONS)} />
					) : walletView === WALLET_VIEWS.LEDGER_PATH ? (
						<LedgerPaths tryActivation={tryActivation} />
					) : (
						<Styled.UpperSection>
							<Styled.ContentWrapper>
								<WalletSelector tryActivation={tryActivation} />
							</Styled.ContentWrapper>
						</Styled.UpperSection>
					)}
				</Styled.Wrapper>
			</Modal.Body>
		</Modal>
	);
};
