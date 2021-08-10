import { PureAddFunds } from "./AddFunds";

const AddFunds = () => {
	const balance = "0";
	const onAddFunds = () => alert("add funds");

	return <PureAddFunds title={"Total Balance"} balance={balance} label="Add Funds" onAddFunds={onAddFunds} />;
};

export default AddFunds;
