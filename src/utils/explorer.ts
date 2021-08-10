
import { ChainId } from "@uniswap/sdk";

const EXPLORER_PREFIXES: { [chainId in ChainId]: string } = {
    1: "",
    3: "ropsten.",
    4: "rinkeby.",
    5: "goerli.",
    42: "kovan.",
};

// TODO: make generic
export function getExplorerLink(
    chainId: ChainId,
    data: string,
    type: "transaction" | "token" | "address" | "block"
): string {
    const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[1]}etherscan.io`;

    switch (type) {
        case "transaction": {
            return `${prefix}/tx/${data}`;
        }
        case "token": {
            return `${prefix}/token/${data}`;
        }
        case "block": {
            return `${prefix}/block/${data}`;
        }
        case "address":
        default: {
            return `${prefix}/address/${data}`;
        }
    }
}