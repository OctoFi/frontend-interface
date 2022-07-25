import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { isMobile } from "react-device-detect";
import { SUPPORTED_WALLETS, injected } from "../../connectors";
// import WalletOption from "../WalletOption";
import { PureWalletSelector } from "./WalletSelector";

const WalletSelector = ({ tryActivation }: { tryActivation: any; }) => {
	const { connector, chainId } = useWeb3React();
	const [selected, setSelected] = useState<string | undefined>(undefined);
	const [pendingError, setPendingError] = useState<boolean>(false);
	const [wallets, setWallets] = useState<Array<any>>([]);
	// TODO: temporary. try to remove requirement for selectedNetwork in this file
	const selectedNetwork = 'ETH';

	const onSelectWallet = (key: string) => {
		const wallet = SUPPORTED_WALLETS[key];
		setSelected(key);
		setPendingError(false);
		console.log(key);

		if (!wallet.href) {
			if (wallet.connector === connector) {
				console.log('User chose the currently selected connector');
			} else {
				console.log('New connector chosen');
				console.log(wallet.connector);
				tryActivation(wallet.connector, key === "ledger");
			}
		} else {
			console.log("Wallet href used");
		}
	};

	// get wallets user can switch to, depending on device/browser
	useEffect(() => {
		const isMetaMaskInstalled = window.ethereum && window.ethereum.isMetaMask;
		const notWeb3 = !window.web3 && !window.ethereum;
		// TODO: does this logic statement make sense
		const isInjectedProviderFound = !(window.web3 || window.ethereum);

		const items = Object.keys(SUPPORTED_WALLETS).map((key) => {
			const option = SUPPORTED_WALLETS[key];
			// TODO: what is logic diff b/w disabled/active
			const disabled = !option.supportedNetworks?.includes(selectedNetwork || "");
			const active = option.connector && option.connector === connector;
			// TODO: fix
			const error = pendingError;
			const loading = false;

			return { key, option, disabled, active, error, loading };
		});

		// Used to be within WalletOption. Needs changed if used in this file
		// const disabled = useMemo(() => {
		//     return supportedNetworks?.includes(selectedNetwork || "");
		// }, [supportedNetworks, selectedNetwork]);

		const mobileItems = items.filter(item => item.option.mobile);
		const notMobileOnlyItems = items.filter(item => !item.option.mobileOnly);
		const injectedItems = items.filter(item => item.option.connector === injected);

		if (isMobile) {
			// if (notWeb3) {
			setWallets(mobileItems);
			// }
		}
		else {
			// setWallets(items);
			// Exclude mobileOnly items
			setWallets(notMobileOnlyItems);
		}

		// Replace or remove items based on installed Injected provider
		// const withInstallLink = injectedItems.map(item => {
		// 	// Replace item with Install Link if no injected provider is found
		// 	if (isInjectedProviderFound) {
		// 		if (item.option.name === "MetaMask") {
		// 			item.option.href = 'https://metamask.io/download/';
		// 		}
		// 		return item;
		// 	}
		// 	// Remove MetaMask if an Injected provider is found that is not MetaMask
		// 	else if (item.option.name === "MetaMask" && !isMetaMaskInstalled) {
		// 		return null;
		// 	}
		// 	// Hide Injected item if MetaMask is installed
		// 	else if (item.option.name === "Injected" && isMetaMaskInstalled) {
		// 		return null;
		// 	} else {
		// 		return item;
		// 	}
		// });

		return () => {
			setWallets([]);
		};
	}, [chainId]);

	return <PureWalletSelector wallets={wallets} selected={selected} onSelectWallet={onSelectWallet} />;
};

export default WalletSelector;
