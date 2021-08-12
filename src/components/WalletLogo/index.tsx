import React from "react";
import { PureWalletLogo } from "./WalletLogo";

import MetaMask from "../../assets/images/wallet/metamask.svg";
import WalletConnect from "../../assets/images/wallet/walletConnect.svg";
import Ledger from "../../assets/images/wallet/ledger.svg";
import Trezor from "../../assets/images/wallet/trezor.svg";
import Portis from "../../assets/images/wallet/portis.svg";
import Torus from "../../assets/images/wallet/torus.svg";
import Coinbase from "../../assets/images/wallet/coinbase.svg";
import TrustWallet from "../../assets/images/wallet/trustWallet.svg";
import Blank from "../../assets/images/wallet/blank.svg";

export interface WalletLogoProps {
	type: string;
}

const WalletLogo = ({ type }: WalletLogoProps) => {
	let Icon = null;
	switch (type) {
		case "injected":
		case "metamask": {
			Icon = MetaMask;
			break;
		}
		case "walletConnect": {
			Icon = WalletConnect;
			break;
		}
		case "ledger": {
			Icon = Ledger;
			break;
		}
		case "trezor": {
			Icon = Trezor;
			break;
		}
		case "trustWallet": {
			Icon = TrustWallet;
			break;
		}
		case "portis": {
			Icon = Portis;
			break;
		}
		case "torus": {
			Icon = Torus;
			break;
		}
		case "coinbase": {
			Icon = Coinbase;
			break;
		}
		case "coinbase_mobile": {
			Icon = Coinbase;
			break;
		}
		case "blank": {
			Icon = Blank;
			break;
		}
		default: {
			Icon = MetaMask;
		}
	}

	return <PureWalletLogo src={Icon} alt={type} />;
};

export default WalletLogo;
