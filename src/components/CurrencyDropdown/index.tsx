// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// import { AppState } from "../../state";
import { currencies } from "../../constants/currencies";
// import * as actions from "../../state/currency/actions";
import { PureCurrencyDropdown } from "./CurrencyDropdown";

const CurrencyDropdown = () => {
	// @ts-ignore
	// const selectedCurrency = useSelector((state: AppState) => state.currency.selected);
	const selectedCurrency = "BTC";
	// const { i18n } = useTranslation();
	// const dispatch = useDispatch();

	// const selectDestinationCurrency = (id: any) => {
	// 	dispatch(actions.fetchCurrencies(id));
	// 	i18n.changeLanguage(currencies[id].lng);
	// };
	const selectDestinationCurrency = (id: any) => {
		alert(id);
	};

	// useEffect(() => {
	// 	dispatch(actions.fetchCurrencies(selectedCurrency));
	// }, [selectedCurrency, dispatch]);

	return (
		<PureCurrencyDropdown
			currencies={currencies}
			onSelectCurrency={selectDestinationCurrency}
			selectedCurrency={selectedCurrency}
		/>
	);
};

export default CurrencyDropdown;
