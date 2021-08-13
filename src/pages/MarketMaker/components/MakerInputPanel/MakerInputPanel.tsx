import React, { useEffect, useState } from "react";

import { ZERO } from "../../constants";
import { toAbsoluteUrl } from "../../lib/helper";
import { tokenAmountInUnits, unitsInTokenAmount } from "../../utils/spot/tokens";
import { Input as NumericalInput } from "../../../../components/NumericalInput";
import { RowBetween } from "../../../../components/Row";
import * as Styled from './styleds';

export const MakerInputPanel = ({
	value,
	onUserInput,
	label = "Input",
	disable = false,
	selected,
	hideInput = false,
	id,
	decimals,
	valueFixedDecimals,
	min = ZERO,
	showBalance = true,
	balanceText,
}) => {
	const [valueStr, setValueStr] = useState(value ? tokenAmountInUnits(value, decimals, valueFixedDecimals) : "");

	const _updateValue = (value) => {
		const newValue = unitsInTokenAmount(value || "0", decimals);
		const invalidValue = min && newValue.isLessThan(min);
		if (invalidValue) {
			return;
		}

		onUserInput(newValue);
		setValueStr(value);
	};

	useEffect(() => {
		setValueStr(value ? tokenAmountInUnits(value, decimals, valueFixedDecimals) : "");
	}, [value]);

	return (
		<Styled.InputPanel id={id}>
			<Styled.Container>
				{!hideInput && (
					<Styled.LabelRow>
						<RowBetween>
							<Styled.Label>{label}</Styled.Label>
						</RowBetween>
					</Styled.LabelRow>
				)}

				<Styled.InputRow style={hideInput ? { padding: "0", borderRadius: "0.42rem" } : {}} selected={disable}>
					<Styled.CurrencySelect selected={!!selected} className="open-currency-select-button">
						{selected && <Styled.Logo src={toAbsoluteUrl(`/${selected.icon}`)} />}
						<Styled.Aligner>
							<Styled.TokenName className="token-symbol-container" active={Boolean(selected)}>
								{(selected && selected?.symbol?.length > 20
									? selected?.symbol?.slice(0, 4) +
									  "..." +
									  selected?.symbol
											?.slice(selected?.symbol?.length - 5, selected?.symbol?.length)
											.toUpperCase()
									: selected.symbol?.toUpperCase()) || `Select`}
							</Styled.TokenName>
						</Styled.Aligner>
					</Styled.CurrencySelect>

					{!hideInput && (
						<Styled.InputContainer>
							<NumericalInput
								className="pl-3"
								value={valueStr}
								onUserInput={_updateValue}
							/>
						</Styled.InputContainer>
					)}
				</Styled.InputRow>

				{selected && showBalance && <Styled.BalanceRow>{balanceText ? balanceText() : null}</Styled.BalanceRow>}
			</Styled.Container>
		</Styled.InputPanel>
	);
}
