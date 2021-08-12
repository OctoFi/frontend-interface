import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useAllTokenDetails } from "../../contexts/Tokens";
import { useActiveWeb3React } from "../../hooks";
import CurrencySearchModal from "../BridgeCurrencySelectModal";
import TokenLogo from "../Logo/CrossTokenLogo";
import { RowBetween } from "../Row";
import * as Styled from "./styleds";

export interface BridgeInputPanelProps {
	value?: any;
	onUserInput?: any;
	onMax?: any;
	showMaxButton?: any;
	label?: any;
	onCurrencySelect?: any;
	currency?: any;
	disableCurrencySelect?: any;
	hideInput?: any;
	otherCurrency?: any;
	id?: any;
	showCommonBases?: any;
	withoutMargin?: any;
	errorMessage?: any;
	disableTokenSelect?: any;
	selectedTokenAddress?: any;
	isSelfSymbol?: any;
	isSelfLogo?: any;
	isSelfName?: any;
	selfUseAllToken: any;
}

export const BridgeInputPanel = ({
	value,
	onUserInput,
	onMax,
	showMaxButton,
	label = "Input",
	onCurrencySelect,
	currency,
	disableCurrencySelect = false,
	hideInput = false,
	otherCurrency,
	id,
	showCommonBases,
	withoutMargin = false,
	errorMessage,
	disableTokenSelect,
	selectedTokenAddress = "",
	isSelfSymbol,
	isSelfLogo,
	isSelfName,
	selfUseAllToken = [],
}: BridgeInputPanelProps) => {
	const { t } = useTranslation();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalIsOpenTime, setModalIsOpenTime] = useState(1);
	const { account } = useActiveWeb3React();

	let allTokens = useAllTokenDetails();

	const handleDismissSearch = useCallback(() => {
		setModalIsOpen(false);
	}, [setModalIsOpen]);

	return (
		<Styled.InputPanel id={id} withoutMargin={withoutMargin}>
			<div>
				{!hideInput && (
					<Styled.LabelRow>
						<RowBetween>
							<Styled.Label>{label}</Styled.Label>
						</RowBetween>
					</Styled.LabelRow>
				)}
				<Styled.InputRow style={hideInput ? { padding: "0", borderRadius: "0.42rem" } : {}}>
					{!hideInput && (
						<Styled.InputContainer>
							<Styled.NumericalInput
								type="number"
								min="0"
								step="0.000000000000000001"
								error={!!errorMessage}
								placeholder="0.0"
								value={isNaN(value) ? "" : value}
								onChange={(e) => {
									onUserInput(e.target.value);
								}}
								onKeyPress={(e) => {
									const charCode = e.which ? e.which : e.keyCode;

									// Prevent 'minus' character
									if (charCode === 45) {
										e.preventDefault();
										e.stopPropagation();
									}
								}}
							/>
							{account && currency && showMaxButton && (
								<Styled.BalanceMax onClick={onMax}>{t("max")}</Styled.BalanceMax>
							)}
						</Styled.InputContainer>
					)}
					<Styled.CurrencySelect
						className="open-currency-select-button"
						onClick={() => {
							if (!disableTokenSelect) {
								if (modalIsOpenTime) {
									setModalIsOpenTime(0);
									setTimeout(() => {
										setModalIsOpenTime(1);
									}, 2000);
									setModalIsOpen(true);
								}
							}
						}}
					>
						<Styled.Aligner>
							{isSelfSymbol ? (
								<>
									{selectedTokenAddress &&
										(isSelfLogo ? (
											<Styled.CurrencyLogoContainer>
												<TokenLogo address={isSelfLogo} size={"100%"} />
											</Styled.CurrencyLogoContainer>
										) : (
											<Styled.CurrencyLogoContainer>
												<TokenLogo
													address={allTokens[selectedTokenAddress].symbol}
													size={"100%"}
												/>
											</Styled.CurrencyLogoContainer>
										))}
									{isSelfSymbol ? (
										<div className="d-flex align-items-stretch flex-column flex-grow-1 text-align-left">
											<Styled.TokenSymbol>{isSelfSymbol}</Styled.TokenSymbol>
											<Styled.TokenName>
												{isSelfName ? isSelfName : allTokens[selectedTokenAddress].name}
											</Styled.TokenName>
										</div>
									) : (
										t("selectToken")
									)}
								</>
							) : (
								<>
									{selectedTokenAddress && (
										<Styled.CurrencyLogoContainer>
											<TokenLogo
												address={
													allTokens[selectedTokenAddress] &&
													allTokens[selectedTokenAddress].symbol
														? allTokens[selectedTokenAddress].symbol
														: ""
												}
												size={"100%"}
											/>
										</Styled.CurrencyLogoContainer>
									)}
									{allTokens[selectedTokenAddress] && allTokens[selectedTokenAddress].symbol ? (
										<div className="d-flex align-items-stretch flex-column flex-grow-1 text-align-left">
											<Styled.TokenSymbol>
												{allTokens[selectedTokenAddress].symbol}
											</Styled.TokenSymbol>
											<Styled.TokenName>{allTokens[selectedTokenAddress].name}</Styled.TokenName>
										</div>
									) : (
										t("selectToken")
									)}
								</>
							)}
							{!disableCurrencySelect && <Styled.CustomDropDown />}
						</Styled.Aligner>
					</Styled.CurrencySelect>
				</Styled.InputRow>
			</div>
			{!disableCurrencySelect && onCurrencySelect && (
				<CurrencySearchModal
					isOpen={modalIsOpen}
					onDismiss={handleDismissSearch}
					onTokenSelect={onCurrencySelect}
					selectedCurrency={currency}
					selfUseAllToken={selfUseAllToken}
					isSelfSymbol={isSelfSymbol}
					otherSelectedCurrency={otherCurrency}
					showCommonBases={showCommonBases}
				/>
			)}
		</Styled.InputPanel>
	);
};
