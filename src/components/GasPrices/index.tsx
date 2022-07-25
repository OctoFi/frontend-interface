import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state";
import { changeGasPrice, getGasPrice } from "../../state/currency/actions";
import { PureGasPrices } from "./GasPrices";

const GasPricesContainer = () => {
	const { gasPrice, selectedGasPrice } = useSelector((state: AppState) => state.currency);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGasPrice());
	}, [dispatch]);

	const onSelectPrice = (gas: string) => {
		dispatch(changeGasPrice(gas));
	};

	return <PureGasPrices prices={gasPrice} selected={selectedGasPrice} onSelectPrice={onSelectPrice} />;
};

export default GasPricesContainer;
