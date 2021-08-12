import { useContext, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import { TYPE } from "../../theme";
import { AutoColumn } from "../Column";
import { RowBetween, RowFixed } from "../Row";
import QuestionTooltip from "../QuestionTooltip";
import * as Styled from "./styleds";

const SlippageError = {
	InvalidInput: "InvalidInput",
	RiskyLow: "RiskyLow",
	RiskyHigh: "RiskyHigh",
};
const DeadlineError = {
	InvalidInput: "InvalidInput",
};

const TransactionSettings = ({ rawSlippage, setRawSlippage, deadline, setDeadline }) => {
	const theme = useContext(ThemeContext);
	const inputRef = useRef();

	const [slippageInput, setSlippageInput] = useState("");
	const [deadlineInput, setDeadlineInput] = useState("");

	const slippageInputIsValid =
		slippageInput === "" || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2);
	const deadlineInputIsValid = deadlineInput === "" || (deadline / 60).toString() === deadlineInput;

	let slippageError;
	if (slippageInput !== "" && !slippageInputIsValid) {
		slippageError = SlippageError.InvalidInput;
	} else if (slippageInputIsValid && rawSlippage < 50) {
		slippageError = SlippageError.RiskyLow;
	} else if (slippageInputIsValid && rawSlippage > 500) {
		slippageError = SlippageError.RiskyHigh;
	} else {
		slippageError = undefined;
	}

	let deadlineError;
	if (deadlineInput !== "" && !deadlineInputIsValid) {
		deadlineError = DeadlineError.InvalidInput;
	} else {
		deadlineError = undefined;
	}

	function parseCustomSlippage(value) {
		setSlippageInput(value);

		try {
			const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString());
			if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
				setRawSlippage(valueAsIntFromRoundedFloat);
			}
		} catch {}
	}

	function parseCustomDeadline(value) {
		setDeadlineInput(value);

		try {
			const valueAsInt = Number.parseInt(value) * 60;
			if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
				setDeadline(valueAsInt);
			}
		} catch {}
	}

	return (
		<AutoColumn gap="md">
			<AutoColumn gap="sm">
				<RowFixed className="align-items-start mt-2">
					<TYPE.Black fontWeight={400} fontSize={14} color={theme.text1}>
						Slippage tolerance
					</TYPE.Black>
					<QuestionTooltip text="Your transaction will revert if the price changes unfavorably by more than this percentage." />
				</RowFixed>
				<RowBetween>
					<Styled.Option
						onClick={() => {
							setSlippageInput("");
							setRawSlippage(10);
						}}
						active={rawSlippage === 10}
					>
						0.1%
					</Styled.Option>
					<Styled.Option
						onClick={() => {
							setSlippageInput("");
							setRawSlippage(50);
						}}
						active={rawSlippage === 50}
					>
						0.5%
					</Styled.Option>
					<Styled.Option
						onClick={() => {
							setSlippageInput("");
							setRawSlippage(100);
						}}
						active={rawSlippage === 100}
					>
						1%
					</Styled.Option>
					<Styled.OptionCustom
						active={![10, 50, 100].includes(rawSlippage)}
						warning={!slippageInputIsValid}
						tabIndex={-1}
					>
						<RowBetween>
							{!!slippageInput &&
							(slippageError === SlippageError.RiskyLow || slippageError === SlippageError.RiskyHigh) ? (
								<Styled.SlippageEmojiContainer>
									<span role="img" aria-label="warning">
										⚠️
									</span>
								</Styled.SlippageEmojiContainer>
							) : null}
							<Styled.Input
								ref={inputRef}
								placeholder={(rawSlippage / 100).toFixed(2)}
								value={slippageInput}
								onBlur={() => {
									parseCustomSlippage((rawSlippage / 100).toFixed(2));
								}}
								onChange={(e) => parseCustomSlippage(e.target.value)}
								color={!slippageInputIsValid ? "red" : ""}
							/>
							%
						</RowBetween>
					</Styled.OptionCustom>
				</RowBetween>
				{!!slippageError && (
					<RowBetween
						style={{
							fontSize: "14px",
							paddingTop: "7px",
							color: slippageError === SlippageError.InvalidInput ? "red" : "#F3841E",
						}}
					>
						{slippageError === SlippageError.InvalidInput
							? "Enter a valid slippage percentage"
							: slippageError === SlippageError.RiskyLow
							? "Your transaction may fail"
							: "Your transaction may be frontrun"}
					</RowBetween>
				)}
			</AutoColumn>

			<AutoColumn gap="sm">
				<RowFixed className="align-items-start mt-2">
					<TYPE.Black fontSize={14} fontWeight={400} color={theme.text1}>
						Transaction deadline
					</TYPE.Black>
					<QuestionTooltip text="Your transaction will revert if it is pending for more than this long." />
				</RowFixed>
				<RowFixed>
					<Styled.OptionCustom style={{ width: "100px" }} tabIndex={-1}>
						<Styled.Input
							color={!!deadlineError ? "red" : undefined}
							onBlur={() => {
								parseCustomDeadline((deadline / 60).toString());
							}}
							placeholder={(deadline / 60).toString()}
							value={deadlineInput}
							onChange={(e) => parseCustomDeadline(e.target.value)}
						/>
					</Styled.OptionCustom>
					<TYPE.Body style={{ paddingLeft: "12px" }} fontSize={14}>
						minutes
					</TYPE.Body>
				</RowFixed>
			</AutoColumn>
		</AutoColumn>
	);
};

export default TransactionSettings;
