import { InputGroup, Button, FormControl } from "react-bootstrap";

export interface PureCurrencyInputGroupProps {
	currency?: any;
	placeholder?: string;
	value?: any;
	onChangeCurrency?: () => void;
	onMax?: () => void;
}

export const PureCurrencyInputGroup = ({
	currency,
	placeholder = "",
	value,
	onChangeCurrency,
	onMax,
}: PureCurrencyInputGroupProps) => {
	return (
		<InputGroup size="lg">
			<Button variant="outline-secondary" id="button-change-currency" onClick={onChangeCurrency}>
				{currency}
			</Button>
			<FormControl
				value={value}
				aria-label="Amount of chosen currency with a use max button"
				placeholder={placeholder}
				type="number"
			/>
			<Button variant="outline-secondary" id="button-max" onClick={onMax}>
				Max
			</Button>
		</InputGroup>
	);
};
