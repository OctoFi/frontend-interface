import { PureCurrencyText } from "./CurrencyText";
import { useSelector } from "react-redux";

import { AppState } from "../../state";
import { currencies } from "../../constants/currencies";
import { formatMoney } from "../../lib/helper";

export interface CurrencyTextProps {
	value: any;
	separate?: boolean;
}

const CurrencyText = ({ value, separate = false }: CurrencyTextProps) => {
	// @ts-ignore
	const { selected, currenciesRate }: { selected: any; currenciesRate: any } = useSelector((state: AppState) => state.currency);
	const num = value * (currenciesRate[selected] || 1);
	const formattedValue = formatMoney(num, num < 0.1 && num !== 0 ? 6 : 2);
	// TODO: tie to an app state
	const hide = false;

	return (
		<PureCurrencyText
			symbol={currencies[selected].symbol}
			value={formattedValue || "0"}
			separate={separate}
			hide={hide}
		/>
	);
};

export default CurrencyText;
