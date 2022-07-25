import { NETWORK_NAME } from "../../constants";

export const errorsBuySell = {
	ethLack: "You don’t have enough ETH...",
	zrxLack: "You don’t have enough ZRX to pay fees...",
};

export const errorsWallet = {
	mmLoading: "Please wait while we load your wallet",
	mmConnect: "Click to Connect MetaMask",
	mmLocked: "MetaMask Locked",
	mmNotInstalled: "MetaMask not installed",
	mmGetExtension: "Get Chrome Extension ",
	mmWrongNetwork: `Wrong network: switch to ${NETWORK_NAME}`,
};

// Receives an string with an error JSON object an returns the JSON Object or null if does not exist
export const getErrorResponseFrom0xConnectErrorMessage = (str) => {
	const firstOpen = str.indexOf("{");
	const lastClose = str.lastIndexOf("}") + 1;
	let candidate;
	if (lastClose <= firstOpen) {
		return null;
	}
	try {
		candidate = str.substring(firstOpen, lastClose);
		return JSON.parse(candidate);
	} catch (e) {
		return null;
	}
};
