import { useMemo } from "react";
import { ArrowDown, AlertTriangle } from "react-feather";
import { Button } from "react-bootstrap";
import { Text } from "rebass";
import { Trade, TradeType } from "@uniswap/sdk";
import useTheme from "../../hooks/useTheme";
import { Field } from "../../../state/swap/actions";
import { TYPE } from "../../../theme";
import { isAddress, shortenAddress } from "../../../utils";
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from "../../../utils/prices";
import { AutoColumn } from "../../Column";
import CurrencyLogo from "../../Logo/CurrencyLogo";
import { RowBetween, RowFixed } from "../../Row";
import { TruncatedText, SwapShowAcceptChanges } from "./styleds";

export default function SwapModalHeader({
	trade,
	allowedSlippage,
	recipient,
	showAcceptChanges,
	onAcceptChanges,
}: {
	trade: Trade;
	allowedSlippage: number;
	recipient: string | null;
	showAcceptChanges: boolean;
	onAcceptChanges: () => void;
}) {
	const theme = useTheme();
	const slippageAdjustedAmounts = useMemo(
		() => computeSlippageAdjustedAmounts(trade, allowedSlippage),
		[trade, allowedSlippage]
	);
	const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade]);
	const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

	return (
		<AutoColumn gap={"md"} style={{ marginTop: "20px" }}>
			<RowBetween align="flex-end">
				<RowFixed gap={"0px"}>
					<CurrencyLogo currency={trade.inputAmount.currency} size={24} style={{ marginRight: "12px" }} />
					<TruncatedText
						fontSize={24}
						fontWeight={500}
						color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.primary : ""}
					>
						{trade.inputAmount.toSignificant(6)}
					</TruncatedText>
				</RowFixed>
				<RowFixed gap={"0px"}>
					<Text fontSize={24} fontWeight={500} style={{ marginLeft: "10px" }}>
						{trade.inputAmount.currency.symbol}
					</Text>
				</RowFixed>
			</RowBetween>
			<RowFixed>
				<ArrowDown size="16" color={theme.text2} style={{ marginLeft: "4px", minWidth: "16px" }} />
			</RowFixed>
			<RowBetween align="flex-end">
				<RowFixed gap={"0px"}>
					<CurrencyLogo currency={trade.outputAmount.currency} size={24} style={{ marginRight: "12px" }} />
					<TruncatedText
						fontSize={24}
						fontWeight={500}
						color={
							priceImpactSeverity > 2
								? theme.red1
								: showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
								? theme.primary
								: ""
						}
					>
						{trade.outputAmount.toSignificant(6)}
					</TruncatedText>
				</RowFixed>
				<RowFixed gap={"0px"}>
					<Text fontSize={24} fontWeight={500} style={{ marginLeft: "10px" }}>
						{trade.outputAmount.currency.symbol}
					</Text>
				</RowFixed>
			</RowBetween>
			{showAcceptChanges ? (
				<SwapShowAcceptChanges justify="flex-start" gap={"0px"}>
					<RowBetween>
						<RowFixed>
							<AlertTriangle size={20} style={{ marginRight: "8px", minWidth: 24 }} />
							<TYPE.Main color={theme.primary}> Price Updated</TYPE.Main>
						</RowFixed>
						<div className="d-grid">
							<Button variant="primary" onClick={onAcceptChanges}>
								Accept
							</Button>
						</div>
					</RowBetween>
				</SwapShowAcceptChanges>
			) : null}
			<AutoColumn justify="flex-start" gap="sm" style={{ padding: "12px 0 0 0px" }}>
				{trade.tradeType === TradeType.EXACT_INPUT ? (
					<TYPE.Italic textAlign="left" style={{ width: "100%" }}>
						{`Output is estimated. You will receive at least `}
						<b>
							{slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)}{" "}
							{trade.outputAmount.currency.symbol}
						</b>
						{" or the transaction will revert."}
					</TYPE.Italic>
				) : (
					<TYPE.Italic textAlign="left" style={{ width: "100%" }}>
						{`Input is estimated. You will sell at most `}
						<b>
							{slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)} {trade.inputAmount.currency.symbol}
						</b>
						{" or the transaction will revert."}
					</TYPE.Italic>
				)}
			</AutoColumn>
			{recipient !== null ? (
				<AutoColumn justify="flex-start" gap="sm" style={{ padding: "12px 0 0 0px" }}>
					<TYPE.Main>
						Output will be sent to{" "}
						<b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
					</TYPE.Main>
				</AutoColumn>
			) : null}
		</AutoColumn>
	);
}