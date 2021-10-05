import { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import getNetConfig from "../../config";
import { chainList } from "../../config/coinbase/nodeConfig";
import { SUPPORTED_WALLETS } from "../../connectors";
import LedgerPaths from "../../constants/ledgerPaths";
import { NetworkContextName } from "../../constants/network";
import useENSName from "../../hooks/useENSName";
import usePrevious from "../../hooks/usePrevious";
import { ApplicationModal } from "../../state/application/actions";
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
// import { isTransactionRecent, useAllTransactions } from "../../state/transactions/hooks";
// import { TransactionDetails } from "../../state/transactions/reducer";

// import AccountDetails from "../AccountDetails";
import { Modal } from "../Modal/bootstrap";
import { ModalContent } from "./ModalContent";
import * as Styled from "./styleds";

// TODO: duplicated, move to constants
const WALLET_VIEWS = {
	OPTIONS: "options",
	OPTIONS_SECONDARY: "options_secondary",
	ACCOUNT: "account",
	PENDING: "pending",
	LEDGER_PATH: "ledger_select_path",
	LEDGER_ACCOUNT: "ledger_select_account",
};

// we want the latest one to come first, so return negative if a is after b
// function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
// 	return b.addedTime - a.addedTime;
// }

export const PureWalletModal = () => {
	// important that these are destructed from the account-specific web3-react context
	const { active, account, connector, activate, error, chainId } = useWeb3React();
	const [selectedPath, setSelectedPath] = useState<string>(LedgerPaths[0].path);
	const [customPath, setCustomPath] = useState<string>("");
	const [selected, setSelected] = useState<string | undefined>(undefined);
	const [chainChanged, setChainChanged] = useState(false);
	const [networks, setNetworks] = useState([]);
	const [usedChain] = useState(chainId);

	let config = getNetConfig();

	const { ENSName } = useENSName(account ?? undefined);

	const contextNetwork = useWeb3React(NetworkContextName);

	// const allTransactions = useAllTransactions();

	// const sortedRecentTransactions = useMemo(() => {
	// 	const txs = Object.values(allTransactions);
	// 	return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
	// }, [allTransactions]);

	// const pendingTransactions = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
	// const confirmedTransactions = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash);

	const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

	const [, setPendingWallet] = useState<AbstractConnector | undefined>();
	const [isLedger, setIsLedger] = useState<boolean>(false);

	// @ts-ignore
	const [selectedNetwork, setSelectedNetwork] = useState<string>(config.symbol);

	const [pendingError, setPendingError] = useState<boolean>(false);

	const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
	const toggleWalletModal = useWalletModalToggle();

	const previousAccount = usePrevious(account);

	// close on connection, when logged out before
	useEffect(() => {
		if (account && !previousAccount && walletModalOpen && !isLedger) {
			toggleWalletModal();
		}
	}, [account, previousAccount, toggleWalletModal, walletModalOpen, isLedger]);

	// always reset to account view
	useEffect(() => {
		if (walletModalOpen) {
			setPendingError(false);
			setWalletView(WALLET_VIEWS.ACCOUNT);
		}
	}, [walletModalOpen]);

	useEffect(() => {
		setChainChanged(true);
	}, [chainId]);

	useEffect(() => {
		// @ts-ignore
		setNetworks(chainList[config.env]);
	}, [config]);

	// close modal when a connection is successful
	const activePrevious = usePrevious(active);
	const connectorPrevious = usePrevious(connector);
	useEffect(() => {
		if (
			walletModalOpen &&
			((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))
		) {
			setWalletView(WALLET_VIEWS.ACCOUNT);
		}
	}, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

	if (!contextNetwork.active && !active) {
		return null;
	}

	const onConnectLedger = () => {
		let path = selectedPath;
		if (path === "custom") {
			path = customPath;
		}

		const ledger = SUPPORTED_WALLETS.ledger;
		tryActivation(ledger.connector(path), true);
	};

	const onUpdateNetwork = (item: any) => {
		// @ts-ignore
		if (item.symbol === config?.symbol || !item.isSwitch) {
			return;
		}
		setSelectedNetwork(item.symbol);
		localStorage.setItem(config.ENV_NODE_CONFIG, item.label);
		config = getNetConfig();

		if (item?.chainID !== 1 && window.ethereum) {
			const networkDetails = {
				chainId: `0x${item?.chainID?.toString(16)}`,
				chainName: `${item.name} Mainnet`,
				nativeCurrency: {
					name: item.name,
					symbol: item.symbol,
					decimals: 18,
				},
				rpcUrls: [item.rpc],
			};

			// @ts-ignore
			window?.ethereum?.request({
				method: "wallet_addEthereumChain",
				params: [networkDetails],
			});
		}
	};

	const tryActivation = async (connector: AbstractConnector | undefined, ledgerConnect = false) => {
		setIsLedger(ledgerConnect);
		Object.keys(SUPPORTED_WALLETS).map((key) => {
			if (connector === SUPPORTED_WALLETS[key].connector) {
				return SUPPORTED_WALLETS[key].name;
			}
			return true;
		});

		setPendingWallet(connector); // set wallet for pending view
		setWalletView(WALLET_VIEWS.PENDING);

		// if the connector is walletconnect and the user has already tried to connect, manually reset the connector
		if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
			connector.walletConnectProvider = undefined;
		}

		connector &&
			activate(connector, undefined, true)
				.then((res) => {
					// if(ledgerConnect) {
					setWalletView(WALLET_VIEWS.LEDGER_ACCOUNT);
					// }
				})
				.catch((error) => {
					if (error instanceof UnsupportedChainIdError) {
						activate(connector); // a little janky...can't use setError because the connector isn't set
					} else {
						setPendingError(true);
					}
				});
	};

	return (
		<Modal
			show={walletModalOpen}
			onHide={() => {
				setPendingError(false);
				setPendingWallet(undefined);
				toggleWalletModal();

				if (chainChanged && usedChain !== chainId) {
					window.location.reload();
				}
			}}
			dialogClassName={walletView !== WALLET_VIEWS.LEDGER_PATH ? "wallet-modal" : "wallet-modal--ledger"}
			backdropClassName={"backdrop"}
			size={"md"}
			centered
		>
			<Modal.Header closeButton>
				{walletView === WALLET_VIEWS.LEDGER_PATH && (
					<button
						className={"btn btn-light-primary me-4 d-none d-xl-block"}
						onClick={() => {
							setPendingError(false);
							setWalletView(WALLET_VIEWS.ACCOUNT);
							setSelected(undefined);
						}}
					>
						Back
					</button>
				)}
				<Modal.Title>
					{walletView === WALLET_VIEWS.LEDGER_PATH
						? "Select HD Derivation path"
						: walletView === WALLET_VIEWS.LEDGER_ACCOUNT
						? "Select Account"
						: account && walletView === WALLET_VIEWS.ACCOUNT
						? "Account"
						: "Connect to Wallet"}
				</Modal.Title>
				{account && walletView === WALLET_VIEWS.ACCOUNT && (
					<Button
						variant="outline-primary"
						size="sm"
						className={"ms-auto me-2 d-none d-xl-block"}
						onClick={() => {
							setWalletView(WALLET_VIEWS.OPTIONS);
						}}
					>
						Change
					</Button>
				)}
			</Modal.Header>
			<Modal.Body>
				{
					// @ts-ignore
					chainId && chainId !== config?.chainID && (
						<Alert variant="warning">Please connect to the appropriate network.</Alert>
					)
				}
				<Styled.Wrapper>
					<ModalContent
						error={error}
						account={account}
						walletView={walletView}
						onSetWalletView={setWalletView}
						onUpdateNetwork={onUpdateNetwork}
						networks={networks}
						selectedNetwork={selectedNetwork}
						onConnectLedger={onConnectLedger}
						setPendingError={setPendingError}
						pendingError={pendingError}
						setSelected={setSelected}
					/>
				</Styled.Wrapper>
			</Modal.Body>
		</Modal>
	);
};
