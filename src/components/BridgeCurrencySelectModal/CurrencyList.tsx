import React, { useCallback } from "react";
import { FixedSizeList } from "react-window";
import { ETHER, Token } from "@uniswap/sdk";
import { useActiveWeb3React } from "../../hooks";
import useTheme from "../../hooks/useTheme";
import getNetConfig from "../../config";
import { INITIAL_TOKENS_CONTEXT } from "../../contexts/Tokens";
import { CurrencyRow } from "./CurrencyRow";

const config = getNetConfig();

function currencyKey(currency) {
	return currency instanceof Token ? currency.address : currency === ETHER ? "ETHER" : "";
}

export interface CurrencyListProps {
	height?: any;
	currencies?: any;
	onCurrencySelect?: any;
	showETH?: any;
	urlAddedTokens?: any;
	fixedListRef?: any;
}

const CurrencyList = ({
	height,
	currencies,
	onCurrencySelect,
	showETH,
	urlAddedTokens,
	fixedListRef,
}: CurrencyListProps) => {
	const { chainId } = useActiveWeb3React();
	const theme = useTheme();

	const Row = useCallback(
		({ data, index, style }) => {
			const currency = data[index];
			const address = currency.address;

			const urlAdded = urlAddedTokens && urlAddedTokens.hasOwnProperty(address);
			const customAdded =
				address !== config.symbol &&
				INITIAL_TOKENS_CONTEXT[chainId] &&
				!INITIAL_TOKENS_CONTEXT[chainId].hasOwnProperty(address) &&
				!urlAdded;

			if (!showETH && address === config.symbol) {
				return null;
			}

			const handleSelect = () => onCurrencySelect(address);

			return (
				<CurrencyRow
					style={style}
					currency={currency}
					urlAdded={urlAdded}
					userAdded={customAdded}
					onSelect={handleSelect}
				/>
			);
		},
		[chainId, onCurrencySelect, theme.text1]
	);

	const itemKey = useCallback((index, data) => currencyKey(data[index]), []);

	return (
		<FixedSizeList
			height={height}
			ref={fixedListRef}
			width="100%"
			itemData={currencies}
			itemCount={currencies.length}
			itemSize={56}
			itemKey={itemKey}
		>
			{Row}
		</FixedSizeList>
	);
};

export default CurrencyList;
