import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoSizer from "react-virtualized-auto-sizer";
import escapeStringRegex from "escape-string-regexp";
import BigNumber from "bignumber.js";

import getNetConfig from "../../config";
import { useAllBalances } from "../../contexts/Balances";
import { useAllTokenDetails } from "../../contexts/Tokens";
import { useActiveWeb3React } from "../../hooks";
import useTheme from "../../hooks/useTheme";
import { isAddress } from "../../utils";
import { formatEthBalance, formatTokenBalance } from "../../utils/cross";
import Column from "../Column";
import { FormControl } from "../Form";
import Modal from "../Modal";
import { PaddedColumn, Separator } from "../SearchModal/styleds";
import CurrencyList from "./CurrencyList";

const config = getNetConfig();

export interface CurrencySelectModalProps {
	isOpen?: any;
	onDismiss?: any;
	onTokenSelect?: any;
	urlAddedTokens?: any;
	hideETH?: any;
	selfUseAllToken?: any;
}

export const CurrencySelectModal = ({
	isOpen,
	onDismiss,
	onTokenSelect,
	urlAddedTokens,
	hideETH,
	selfUseAllToken,
}: CurrencySelectModalProps) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const fixedList = useRef();
	const [searchQuery, setSearchQuery] = useState("");

	let allTokens = useAllTokenDetails(),
		useTokens = {};
	if (selfUseAllToken.length > 0) {
		for (let obj in allTokens) {
			if (selfUseAllToken.includes(obj)) continue;
			useTokens[obj] = allTokens[obj];
		}
		allTokens = useTokens;
	}

	const { account } = useActiveWeb3React();

	const allBalances = useAllBalances();

	const tokenList = useMemo(() => {
		return Object.keys(allTokens).map((k) => {
			let balance;
			// only update if we have data
			if (
				k === config.symbol &&
				allBalances[account] &&
				allBalances[account][k] &&
				allBalances[account][k].value
			) {
				balance = formatEthBalance(new BigNumber(allBalances[account][k].value));
			} else if (allBalances[account] && allBalances[account][k] && allBalances[account][k].value) {
				balance = formatTokenBalance(new BigNumber(allBalances[account][k].value), allTokens[k].decimals);
			}
			// console.log(allTokens[k].decimals)
			// console.log(balance)
			return {
				name: allTokens[k].name,
				symbol: allTokens[k].symbol,
				address: k,
				balance: balance,
				isSwitch: allTokens[k].isSwitch,
			};
		});
	}, [allBalances, allTokens, account]);

	const filteredTokenList = useMemo(() => {
		const list = tokenList.filter((tokenEntry) => {
			const inputIsAddress = searchQuery.slice(0, 2) === "0x";

			// check the regex for each field
			const regexMatches = Object.keys(tokenEntry).map((tokenEntryKey) => {
				// if address field only search if input starts with 0x.
				if (tokenEntryKey === "address") {
					return (
						inputIsAddress &&
						typeof tokenEntry[tokenEntryKey] === "string" &&
						!!tokenEntry[tokenEntryKey].match(new RegExp(escapeStringRegex(searchQuery), "i"))
					);
				}
				return (
					typeof tokenEntry[tokenEntryKey] === "string" &&
					!!tokenEntry[tokenEntryKey].match(new RegExp(escapeStringRegex(searchQuery), "i"))
				);
			});
			return regexMatches.some((m) => m);
		});
		// If the user has not inputted anything, preserve previous sort
		if (searchQuery === "") return list;
		return list.sort((a, b) => {
			return a.symbol.toLowerCase() === searchQuery.toLowerCase() ? -1 : 1;
		});
	}, [tokenList, searchQuery]);

	const inputRef = useRef();

	function _onTokenSelect(address) {
		console.log(address);
		setSearchQuery("");
		onTokenSelect(address);
		onDismiss();
	}

	function onInput(event) {
		const input = event.target.value;
		const checksummedInput = isAddress(input);
		setSearchQuery(checksummedInput || input);
	}

	function clearInputAndDismiss() {
		setSearchQuery("");
		onDismiss();
	}

	return (
		<Modal isOpen={isOpen} onDismiss={clearInputAndDismiss} maxHeight={80} minHeight={80}>
			<Column style={{ width: "100%", flex: "1 1", minHeight: "100px" }}>
				<PaddedColumn gap="14px">
					<FormControl
						size={"lg"}
						style={{
							backgroundColor: theme.bg1,
							color: theme.text1,
						}}
						type="text"
						id="token-search-input"
						placeholder={t("tokenSearchPlaceholder")}
						value={searchQuery}
						ref={inputRef}
						onChange={onInput}
					/>
				</PaddedColumn>
				<Separator />

				<div style={{ flex: "1" }}>
					<AutoSizer disableWidth>
						{({ height }) => (
							<CurrencyList
								height={height}
								currencies={filteredTokenList}
								onCurrencySelect={_onTokenSelect}
								urlAddedTokens={urlAddedTokens}
								fixedListRef={fixedList}
								showETH={!hideETH}
							/>
						)}
					</AutoSizer>
				</div>
			</Column>
		</Modal>
	);
};
