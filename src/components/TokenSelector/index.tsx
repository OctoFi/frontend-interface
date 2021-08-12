import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useActiveWeb3React } from "../../hooks";
import { useCurrencyBalance } from "../../state/wallet/hooks";
import CurrencyLogo from "../Logo/CurrencyLogo";
import DoubleCurrencyLogo from "../Logo/DoubleLogo";
import CurrencySearchModal from "../SearchModal/CurrencySearchModal";
import { RowBetween } from "../Row";
import * as Styled from "./styleds";

export interface TokenSelectorProps {
	showMaxButton?: boolean;
	label?: string;
	onCurrencySelect: () => void;
	currency?: any;
	disableCurrencySelect?: boolean;
	pair?: any;
	hideInput?: boolean;
	otherCurrency?: any;
	id?: string;
	showCommonBases?: boolean;
}

export default function TokenSelector({
	showMaxButton,
	label = "Input",
	onCurrencySelect,
	currency,
	disableCurrencySelect = false,
	pair = null, // used for double token logo
	hideInput = false,
	otherCurrency,
	id,
	showCommonBases,
}: TokenSelectorProps) {
	const { t } = useTranslation();
	const [modalOpen, setModalOpen] = useState(false);
	const { account } = useActiveWeb3React();
	const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);

	const handleDismissSearch = useCallback(() => {
		setModalOpen(false);
	}, [setModalOpen]);

	return (
		<Styled.InputPanel id={id}>
			<div>
				{!hideInput && (
					<Styled.LabelRow>
						<RowBetween>
							<Styled.Label>{label}</Styled.Label>
							{account && showMaxButton && (
								<Styled.Balance>
									{!!currency && selectedCurrencyBalance
										? t("balance", { balanceInput: selectedCurrencyBalance?.toSignificant(6) })
										: " -"}
								</Styled.Balance>
							)}
						</RowBetween>
					</Styled.LabelRow>
				)}
				<Styled.InputRow style={hideInput ? { padding: "0", borderRadius: "0.42rem" } : {}}>
					<Styled.CurrencySelect
						id="open-currency-select-button"
						onClick={() => {
							if (!disableCurrencySelect) {
								setModalOpen(true);
							}
						}}
					>
						<Styled.Aligner>
							{pair ? (
								<DoubleCurrencyLogo
									currency0={pair.token0}
									currency1={pair.token1}
									size={24}
									margin={true}
								/>
							) : currency ? (
								<CurrencyLogo currency={currency} size={24} />
							) : null}
							{pair ? (
								<Styled.TokenName className="pair-name-container">
									{pair?.token0.symbol}:{pair?.token1.symbol}
								</Styled.TokenName>
							) : (
								<Styled.TokenName
									className="token-symbol-container"
									active={Boolean(currency && currency.symbol)}
								>
									{(currency && currency.symbol && currency.symbol.length > 20
										? currency.symbol.slice(0, 4) +
										  "..." +
										  currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
										: currency?.symbol) || t("selectToken")}
								</Styled.TokenName>
							)}
							{!disableCurrencySelect && <Styled.CustomDropDown />}
						</Styled.Aligner>
					</Styled.CurrencySelect>
				</Styled.InputRow>
			</div>
			{!disableCurrencySelect && onCurrencySelect && (
				<CurrencySearchModal
					isOpen={modalOpen}
					onDismiss={handleDismissSearch}
					onCurrencySelect={onCurrencySelect}
					selectedCurrency={currency}
					otherSelectedCurrency={otherCurrency}
					showCommonBases={showCommonBases}
				/>
			)}
		</Styled.InputPanel>
	);
}
