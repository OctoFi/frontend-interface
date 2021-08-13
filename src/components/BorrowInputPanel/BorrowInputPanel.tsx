import React from "react";
import { Token } from "@uniswap/sdk";

import { tokenAmountInUnits, unitsInTokenAmount } from "../../utils/spot/tokens";
import CurrencyLogo from "../Logo/CurrencyLogo";
import NumericalInput from "../NumericalInput";
import { RowBetween } from "../Row";
import * as Styled from "./styleds";

export default class BorrowInputPanel extends React.Component {
	state = {
		valueStr: this.props.value
			? tokenAmountInUnits(this.props.value, this.props.decimals, this.props.valueFixedDecimals)
			: "",
	};

	_updateValue = (value) => {
		const newValue = unitsInTokenAmount(value || "0", this.props.decimals);
		const invalidValue = this.props.min && newValue.isLessThan(this.props.min);
		if (invalidValue) {
			return;
		}

		this.props.onUserInput(newValue);
		this.setState({
			valueStr: value,
		});
	};

	static getDerivedStateFromProps = (props, state) => {
		const { decimals, value, valueFixedDecimals } = props;
		const { valueStr } = state;

		if (!value) {
			return {
				valueStr: "",
			};
		} else if (value && !unitsInTokenAmount(valueStr || "0", decimals).eq(value)) {
			return {
				valueStr: tokenAmountInUnits(value, decimals, valueFixedDecimals),
			};
		} else {
			return null;
		}
	};

	render() {
		const {
			label = "Input",
			disable = false,
			selected,
			hideInput = false,
			id,
			showBalance = true,
			balanceText,
			token = undefined,
		} = this.props;
		const { valueStr } = this.state;

		const currency = token ? new Token(1, token.address, token.decimals, token.symbol, token.name) : undefined;

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
					<Styled.InputRow
						style={hideInput ? { padding: "0", borderRadius: "0.42rem" } : {}}
						selected={disable}
					>
						<Styled.CurrencySelect selected={!!selected} className="open-currency-select-button">
							<Styled.Aligner>
								{token && <CurrencyLogo currency={currency} size={24} />}
								<Styled.TokenName className="token-symbol-container" active={Boolean(selected)}>
									{(selected && selected?.length > 20
										? (
												selected?.slice(0, 4) +
												"..." +
												selected?.slice(selected?.length - 5, selected?.length)
										  ).toUpperCase()
										: selected.toUpperCase()) || `Select`}
								</Styled.TokenName>
							</Styled.Aligner>
						</Styled.CurrencySelect>

						{!hideInput && (
							<Styled.InputContainer>
								<NumericalInput className="pl-3 " value={valueStr} onUserInput={this._updateValue} />
							</Styled.InputContainer>
						)}
					</Styled.InputRow>
					{selected && showBalance && <Styled.BalanceRow>{balanceText()}</Styled.BalanceRow>}
				</Styled.Container>
			</Styled.InputPanel>
		);
	}
}
