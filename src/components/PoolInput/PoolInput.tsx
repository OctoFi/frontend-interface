import React from "react";
import { Currency, Pair } from "@uniswap/sdk";

import { useActiveWeb3React } from "../../hooks";
import { usePoolBalance } from "../../state/pools/hooks";
import PlatformLogo from "../Logo/PlatformLogo";
import NumericalInput from "../NumericalInput";
import { RowBetween } from "../Row";
import * as Styled from "./styleds";

interface CurrencyInputPanelProps {
	value: string;
	onUserInput: (value: string) => void;
	onMax?: () => void;
	showMaxButton: boolean;
	label?: string;
	onCurrencySelect?: (currency: Currency) => void;
	disableCurrencySelect?: boolean;
	hideBalance?: boolean;
	pair?: Pair | null;
	hideInput?: boolean;
	otherCurrency?: Currency | null;
	id: string;
	showCommonBases?: boolean;
	customBalanceText?: string;
	pool: any;
	type: string;
}

export const PoolInput = ({
	value,
	onUserInput,
	onMax,
	showMaxButton,
	label = "Input",
	pool,
	disableCurrencySelect = false,
	hideBalance = false,
	hideInput = false,
	id,
	customBalanceText,
	type,
}: CurrencyInputPanelProps) => {
	const { account } = useActiveWeb3React();
	const selectedCurrencyBalance = usePoolBalance(account ?? undefined, pool.address ?? undefined);

	return (
		<Styled.InputPanel id={id}>
			<div>
				{!hideInput && (
					<Styled.LabelRow>
						<RowBetween>
							<Styled.Label>{label}</Styled.Label>

							{account && (
								<Styled.Balance className={"d-none d-md-flex"}>
									{!hideBalance && !!pool && selectedCurrencyBalance
										? (customBalanceText ?? "Balance: ") + selectedCurrencyBalance
										: " -"}
								</Styled.Balance>
							)}
						</RowBetween>
					</Styled.LabelRow>
				)}
				<Styled.InputRow
					style={hideInput ? { padding: "0", borderRadius: "0.42rem" } : {}}
					selected={disableCurrencySelect}
				>
					<Styled.CurrencySelect selected={!!pool} className="open-currency-select-button">
						<Styled.Aligner>
							<PlatformLogo size={24} platform={type.toLowerCase()} name={pool?.poolName} />
							<Styled.TokenName>{pool?.poolName}</Styled.TokenName>
						</Styled.Aligner>
					</Styled.CurrencySelect>
					{!hideInput && (
						<Styled.InputContainer>
							<NumericalInput
								value={value}
								onUserInput={(val) => {
									onUserInput(val);
								}}
							/>
							{account && pool && showMaxButton && (
								<Styled.BalanceMax onClick={onMax}>MAX</Styled.BalanceMax>
							)}
						</Styled.InputContainer>
					)}
				</Styled.InputRow>
			</div>
		</Styled.InputPanel>
	);
};
