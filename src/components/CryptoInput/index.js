import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import dompurify from "dompurify";

import EUR from "../../assets/images/currencies/EU.svg";
import CurrencySelectModal from "../CurrencySelectModal";
import { Input as NumericalInput } from "../NumericalInput";
import { RowBetween } from "../Row";
import * as Styled from "./styleds";

export default function CryptoInput({
	value,
	onUserInput,
	label = "Input",
	onSelect,
	disable = false,
	selected,
	id,
	currencies,
	type,
	disableCurrencySelect = false,
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const { t } = useTranslation();

	const handleDismissSearch = useCallback(() => {
		setModalOpen(false);
	}, [setModalOpen]);

	const iconHTML = useMemo(() => {
		if ("icon" in selected) {
			return dompurify.sanitize(selected.icon);
		}
		return "";
	}, [selected]);

	const onChooseCurrency = () => {
		if (!disableCurrencySelect) {
			setModalOpen(true);
		}
	};

	return (
		<Styled.InputPanel id={id}>
			<Styled.LabelRow>
				<RowBetween>
					<Styled.Label>{label}</Styled.Label>
				</RowBetween>
			</Styled.LabelRow>

			<Styled.InputRow selected={disable}>
				<Styled.CurrencySelect
					selected={!!selected}
					className="open-currency-select-button"
					onClick={onChooseCurrency}
				>
					<Styled.Aligner>
						{selected ? (
							selected.symbol === "EUR" ? (
								<Styled.Logo src={EUR} alt={selected.symbol} />
							) : selected.hasOwnProperty("image") ? (
								<Styled.Logo src={selected.image.small} alt={selected.symbol} />
							) : (
								<Styled.LogoDiv dangerouslySetInnerHTML={{ __html: iconHTML }} />
							)
						) : null}
						<Styled.TokenName
							className="token-symbol-container"
							active={Boolean(selected && selected.symbol)}
						>
							{(selected && selected.symbol && selected.symbol.length > 20
								? selected.symbol.slice(0, 4) +
								  "..." +
								  selected.symbol.slice(selected.symbol.length - 5, selected.symbol.length)
								: selected?.symbol) || t("selectToken")}
						</Styled.TokenName>
					</Styled.Aligner>
				</Styled.CurrencySelect>

				<NumericalInput
					value={value}
					onUserInput={(val) => {
						onUserInput(val, type);
					}}
				/>
			</Styled.InputRow>

			{!disableCurrencySelect && onSelect && (
				<CurrencySelectModal
					isOpen={modalOpen}
					onDismiss={handleDismissSearch}
					onCurrencySelect={onSelect}
					selectedCurrency={selected}
					currencies={currencies}
					type={type}
				/>
			)}
		</Styled.InputPanel>
	);
}
