import { Network } from "./index";

export declare enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    BSC = 56,
    BSC_TESTNET = 97,
    POLYGON = 137,
    FUJI = 43113,
    AVALANCHE = 43114,
}

export const EXPLORER_URL: { [chainId in ChainId]: string } = {
    [Network.Mainnet]: "https://etherscan.io",
    [Network.Ropsten]: "https://ropsten.etherscan.io",
    [Network.Rinkeby]: "https://rinkeby.etherscan.io",
    [Network.Kovan]: "https://kovan.etherscan.io",
    [Network.Goerli]: "https://goerli.etherscan.io",
    [Network.BSC]: "https://bscscan.com",
    [Network.BSC_Testnet]: "https://testnet.bscscan.com",
    [Network.Polygon]: "https://polygonscan.com",
    [Network.Avalanche]: "https://cchain.explorer.avax.network",
    [Network.Fuji]: "https://explorer.avax-test.network",
};

export const EXPLORER_URL_TX: { [chainId in ChainId]: string } = {
    [Network.Mainnet]: "/tx/",
    [Network.Ropsten]: "/tx/",
    [Network.Rinkeby]: "/tx/",
    [Network.Kovan]: "/tx/",
    [Network.Goerli]: "/tx/",
    [Network.BSC]: "/tx/",
    [Network.BSC_Testnet]: "/tx/",
    [Network.Polygon]: "/tx/",
    [Network.Avalanche]: "/tx/",
    [Network.Fuji]: "/tx/",
};

export const EXPLORER_URL_TOKEN: { [chainId in ChainId]: string } = {
    [Network.Mainnet]: "/token/",
    [Network.Ropsten]: "/token/",
    [Network.Rinkeby]: "/token/",
    [Network.Kovan]: "/token/",
    [Network.Goerli]: "/token/",
    [Network.BSC]: "/token/",
    [Network.BSC_Testnet]: "/token/",
    [Network.Polygon]: "/token/",
    [Network.Avalanche]: "/tokens/",
    [Network.Fuji]: "/tokens/",
};

export const EXPLORER_URL_BLOCK: { [chainId in ChainId]: string } = {
    [Network.Mainnet]: "/block/",
    [Network.Ropsten]: "/block/",
    [Network.Rinkeby]: "/block/",
    [Network.Kovan]: "/block/",
    [Network.Goerli]: "/block/",
    [Network.BSC]: "/block/",
    [Network.BSC_Testnet]: "/block/",
    [Network.Polygon]: "/block/",
    [Network.Avalanche]: "/blocks/",
    [Network.Fuji]: "/blocks/",
};

export const EXPLORER_URL_ADDRESS: { [chainId in ChainId]: string } = {
    [Network.Mainnet]: "/address/",
    [Network.Ropsten]: "/address/",
    [Network.Rinkeby]: "/address/",
    [Network.Kovan]: "/address/",
    [Network.Goerli]: "/address/",
    [Network.BSC]: "/address/",
    [Network.BSC_Testnet]: "/address/",
    [Network.Polygon]: "/address/",
    [Network.Avalanche]: "/address/",
    [Network.Fuji]: "/address/",
};
