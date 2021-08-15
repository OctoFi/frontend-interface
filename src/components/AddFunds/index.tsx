import { useSelector } from "react-redux";
import { AppState } from "../../state";
import { PureAddFunds } from "./AddFunds";

const AddFunds = () => {
	const overview = useSelector((state: AppState) => state.balances.overview);
	const onAddFunds = () => alert("add funds");

	return (
		<PureAddFunds
			title={"Total Balance"}
			balance={overview.wallet.total}
			label="Add Funds"
			onAddFunds={onAddFunds}
		/>
	);
};

export default AddFunds;
