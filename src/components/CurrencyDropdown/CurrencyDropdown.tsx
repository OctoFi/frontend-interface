import { Dropdown } from "react-bootstrap";
import * as Styled from "./styleds";

export interface PureCurrencyDropdownProps {
	currencies: any;
	selectedCurrency: any;
	onSelectCurrency?: (T: any) => void;
}

export const PureCurrencyDropdown = ({ currencies, selectedCurrency, onSelectCurrency }: PureCurrencyDropdownProps) => {
	return (
		<Dropdown>
			<Dropdown.Toggle variant="white" className="border-light">
				<Styled.CurrencyLogo src={currencies[selectedCurrency].image} alt={selectedCurrency} />
				<span className="mx-2 text-muted">{selectedCurrency}</span>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{Object.keys(currencies).map((currency) => (
					<Dropdown.Item
						onClick={onSelectCurrency}
						key={`currency-${currency}`}
						active={currency === selectedCurrency}
					>
						<Styled.CurrencyLogo src={currencies[currency].image} alt={currency} />
						<span className="ms-2">{currency}</span>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
