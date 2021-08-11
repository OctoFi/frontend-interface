import { ChainId, EXPLORER_URL, EXPLORER_URL_TX, EXPLORER_URL_TOKEN, EXPLORER_URL_BLOCK, EXPLORER_URL_ADDRESS } from "../constants/explorer";

export function getExplorerLink(
    chainId: ChainId,
    data: string,
    type: "transaction" | "token" | "address" | "block" | "default"
): string {
    const prefix = EXPLORER_URL[chainId] || EXPLORER_URL[1];
    const segmentTx = EXPLORER_URL_TX[chainId] || EXPLORER_URL_TX[1];
    const segmentToken = EXPLORER_URL_TOKEN[chainId] || EXPLORER_URL_TOKEN[1];
    const segmentBlock = EXPLORER_URL_BLOCK[chainId] || EXPLORER_URL_BLOCK[1];
    const segmentAddress = EXPLORER_URL_ADDRESS[chainId] || EXPLORER_URL_ADDRESS[1];

    switch (type) {
        case "transaction": {
            return prefix + segmentTx + data;
        }
        case "token": {
            return prefix + segmentToken + data;
        }
        case "address": {
            return prefix + segmentAddress + data;
        }
        case "block": {
            return prefix + segmentBlock + data;
        }
        default: {
            return prefix;
        }
    }
}