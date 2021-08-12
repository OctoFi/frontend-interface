import { ChainId, Token } from "@uniswap/sdk";

export const LAUNCHPAD_WETH_ADDRESS = process.env.REACT_APP_LAUNCHPAD_WETH || "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const LAUNCHPAD_WETH_TOKEN = new Token(ChainId.MAINNET, LAUNCHPAD_WETH_ADDRESS, 18, "ETH", "Ethereum");

export const LAUNCHPAD_WHITELIST_CONTRACTS =
    !process.env.REACT_APP_PRESALE_WHITELIST_CONTRACTS
        ? []
        : process.env.REACT_APP_PRESALE_WHITELIST_CONTRACTS
            ?.split(',')
            ?.map(address => address?.toLowerCase());

export const presaleAddresses = {
    'generator': process.env.REACT_APP_PRESALE_GENERATOR,
    'factory': process.env.REACT_APP_PRESALE_FACTORY,
    'settings': process.env.REACT_APP_PRESALE_SETTINGS
};

export const LOCK_DURATION = {
    2678400: "1 Month",
    2592000: "1 Month",
    5356800: "2 Months",
    8035200: "3 Months",
    15552000: "6 Months",
    15897600: "6 Months",
    31536000: "1 Year",
    9999999999: "Max: 266 Years",
}
