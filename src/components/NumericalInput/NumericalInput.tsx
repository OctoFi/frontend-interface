import React from "react";
import { escapeRegExp } from "../../utils";
import { CustomInput } from "./styleds";

// match escaped "." characters via in a non-capturing group
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

export const NumericalInput = React.memo(function InnerInput({
	value,
	onUserInput,
	placeholder,
	size,
	...rest
}: {
	value: string | number;
	onUserInput: (input: string) => void;
	error?: boolean;
	fontSize?: string;
	size?: string;
	align?: "right" | "left";
} & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">) {
	const enforcer = (nextUserInput: string) => {
		if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
			onUserInput(nextUserInput);
		}
	};

	return (
		<CustomInput
			{...rest}
			value={value}
			// replace commas with periods, because uniswap exclusively uses period as the decimal separator
			onChange={(event) => enforcer(event.target.value.replace(/,/g, "."))}
			// universal input options
			inputMode="decimal"
			title="Token Amount"
			autoComplete="off"
			autoCorrect="off"
			size={size}
			// text-specific options
			type="text"
			pattern="^[0-9]*[.,]?[0-9]*$"
			placeholder={placeholder || "0.0"}
			minLength={1}
			maxLength={79}
			spellCheck="false"
		/>
	);
});
