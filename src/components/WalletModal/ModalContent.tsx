import { Row, Col, Form, Button } from "react-bootstrap";
import { UnsupportedChainIdError } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { SUPPORTED_WALLETS, injected } from "../../connectors";
import LedgerAccounts from "../LedgerAccounts";
import NetworkSelector from "../NetworkSelector";
import UIButton from "../UI/Button";
import WalletOption from "../WalletOption";
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

export interface ModalContentProps {
	error?: UnsupportedChainIdError | boolean;
	account?: any;
	walletView?: any;
	onSetWalletView?: any;
	onUpdateNetwork?: any;
	networks?: any;
	selectedNetwork?: any;
	onConnectLedger?: any;
	pendingError?: any;
	setPendingError?: any;
	setSelected?: any;
}

export const ModalContent = ({
	error,
	account,
	walletView,
	onSetWalletView,
	onUpdateNetwork,
	networks,
	selectedNetwork,
	onConnectLedger,
	pendingError,
	setPendingError,
	setSelected,
}: ModalContentProps) => {
	const { t } = useTranslation();

	// get wallets user can switch too, depending on device/browser
	// function getOptions() {
	// 	const isMetamask = window.ethereum && window.ethereum.isMetaMask;
	// 	return Object.keys(SUPPORTED_WALLETS).map((key) => {
	// 		const option = SUPPORTED_WALLETS[key];

	// 		// check for mobile options
	// 		if (isMobile) {
	// 			if (!window.web3 && !window.ethereum && option.mobile) {
	// 				return (
	// 					<WalletOption
	// 						onClick={() => {
	// 							setSelected(key);
	// 							setPendingError(false);
	// 							option.connector !== connector && !option.href && tryActivation(option.connector);
	// 						}}
	// 						id={`connect-${key}`}
	// 						selected={selected}
	// 						key={key}
	// 						error={pendingError}
	// 						active={option.connector && option.connector === connector}
	// 						link={option.href}
	// 						name={option.name}
	// 						type={key}
	// 						supportedNetworks={option.supportedNetworks}
	// 						selectedNetwork={selectedNetwork}
	// 					/>
	// 				);
	// 			}
	// 			return null;
	// 		}

	// 		// overwrite injected when needed
	// 		if (option.connector === injected) {
	// 			// don't show injected if there's no injected provider
	// 			if (!(window.web3 || window.ethereum)) {
	// 				if (option.name === "MetaMask") {
	// 					return (
	// 						<WalletOption
	// 							id={`connect-${key}`}
	// 							key={key}
	// 							selected={selected}
	// 							name={"Install Metamask"}
	// 							error={pendingError}
	// 							link={"https://metamask.io/"}
	// 							type={"metamask"}
	// 							supportedNetworks={option.supportedNetworks}
	// 							selectedNetwork={selectedNetwork}
	// 						/>
	// 					);
	// 				} else {
	// 					return null; //dont want to return install twice
	// 				}
	// 			}
	// 			// don't return metamask if injected provider isn't metamask
	// 			else if (option.name === "MetaMask" && !isMetamask) {
	// 				return null;
	// 			}
	// 			// likewise for generic
	// 			else if (option.name === "Injected" && isMetamask) {
	// 				return null;
	// 			}
	// 		}

	// 		// return rest of options
	// 		return (
	// 			!isMobile &&
	// 			!option.mobileOnly && (
	// 				<WalletOption
	// 					id={`connect-${key}`}
	// 					onClick={() => {
	// 						setSelected(key);
	// 						setPendingError(false);
	// 						option.connector === connector
	// 							? setWalletView(WALLET_VIEWS.ACCOUNT)
	// 							: key === "ledger"
	// 							? setWalletView(WALLET_VIEWS.LEDGER_PATH)
	// 							: !option.href && tryActivation(option.connector);
	// 					}}
	// 					key={key}
	// 					error={pendingError}
	// 					selected={selected}
	// 					active={option.connector === connector}
	// 					link={option.href}
	// 					name={option.name}
	// 					type={key}
	// 					supportedNetworks={option.supportedNetworks}
	// 					selectedNetwork={selectedNetwork}
	// 				/>
	// 			)
	// 		);
	// 	});
	// }

	if (error) {
		return (
			<Styled.UpperSection>
				<Styled.ContentWrapper>
					{error instanceof UnsupportedChainIdError ? (
						<h5>Please connect to the appropriate Ethereum network.</h5>
					) : (
						<p>{t("walletConnectError")}</p>
					)}
				</Styled.ContentWrapper>
			</Styled.UpperSection>
		);
	}

	// if (account && walletView === WALLET_VIEWS.ACCOUNT) {
	// 	return <AccountDetails ENSName={ENSName} onOpenOptions={() => onSetWalletView(WALLET_VIEWS.OPTIONS)} />;
	// }

	if (walletView === WALLET_VIEWS.LEDGER_ACCOUNT) {
		return <LedgerAccounts onDone={() => onSetWalletView(WALLET_VIEWS.ACCOUNT)} />;
	}

	// if (walletView === WALLET_VIEWS.LEDGER_PATH) {
	//     return (
	//         <Styled.UpperSection>
	//             <Styled.LedgerContentWrapper>
	//                 <Row className={"row-paddingless"}>
	//                     {LedgerPaths.map((item, index) => {
	//                         return (
	//                             <Col xs={12} md={6} key={`hd-path-${index}`}>
	//                                 <Form.Check
	//                                     type={"radio"}
	//                                     id={`hd-path-${index}`}
	//                                     className={"d-flex align-items-center py-3"}
	//                                 >
	//                                     <Form.Check.Input
	//                                         type={"radio"}
	//                                         name={"hd-path"}
	//                                         checked={item.path === selectedPath}
	//                                         onChange={() => setSelectedPath(item.path)}
	//                                     />
	//                                     <Form.Check.Label className={"d-flex flex-column pl-2 wallet-modal__label"}>
	//                                         <div className={"font-weight-bold mb-1"}>{item.path}</div>
	//                                         <div className={"font-size-sm"}>{item.label}</div>
	//                                     </Form.Check.Label>
	//                                 </Check>
	//                             </Col>
	//                         );
	//                     })}

	//                     <Col xs={12} md={6} key="hd-path-custom">
	//                         <Form.Check
	//                             type={"radio"}
	//                             id="hd-path-custom"
	//                             className={"d-flex align-items-center mb-3 pt-3 pt-xl-0"}
	//                         >
	//                             <Form.Check.Input
	//                                 type={"radio"}
	//                                 name={"hd-path"}
	//                                 checked={selectedPath === "custom"}
	//                                 onChange={() => setSelectedPath("custom")}
	//                             />
	//                             <Form.Check.Label className={"d-flex flex-column pl-2 pt-1 wallet-modal__label"}>
	//                                 <div className={"font-weight-bold"}>Or Add Custom path</div>
	//                             </Form.Check.Label>
	//                         </Check>
	//                     </Col>
	//                     {selectedPath === "custom" && (
	//                         <Col xs={12}>
	//                             <Form.Control
	//                                 placeholder={"m/44'/60'/0'/0"}
	//                                 onChange={(e) => setCustomPath(e.target.value)}
	//                                 value={customPath}
	//                                 className={"mb-3"}
	//                             />
	//                         </Col>
	//                     )}

	//                     <Col xs={12} className={"d-flex flex-column flex-lg-row-reverse mt-5 mt-xl-4"}>
	//                         <UIButton className={"ms-2"} onClick={onConnectLedger}>
	//                             Connect to Wallet
	//                         </UIButton>
	//                         <Button
	//                             variant="link"
	//                             onClick={() => {
	//                                 setPendingError(false);
	//                                 onSetWalletView(WALLET_VIEWS.ACCOUNT);
	//                                 setSelected(undefined);
	//                             }}
	//                         >
	//                             Cancel
	//                         </Button>
	//                     </Col>
	//                 </Row>
	//             </Styled.LedgerContentWrapper>
	//         </Styled.UpperSection>
	//     );
	// }

	return (
		<Styled.UpperSection>
			<Styled.SectionHeader>
				<Styled.SectionNumber>1</Styled.SectionNumber>
				<Styled.SectionTitle>Choose Network</Styled.SectionTitle>
			</Styled.SectionHeader>
			<Styled.ContentWrapper>
				<NetworkSelector networks={networks} selected={selectedNetwork} onUpdateNetwork={onUpdateNetwork} />
			</Styled.ContentWrapper>
			<Styled.SectionHeader>
				<Styled.SectionNumber>2</Styled.SectionNumber>
				<Styled.SectionTitle>Choose Wallet</Styled.SectionTitle>
			</Styled.SectionHeader>
			<Styled.ContentWrapper>{/* <Styled.OptionGrid>{getOptions()}</Styled.OptionGrid> */}</Styled.ContentWrapper>
		</Styled.UpperSection>
	);
};
