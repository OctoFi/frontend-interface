// import Web3 from "web3";
// import { Web3Wrapper } from "@0x/web3-wrapper";
// import { ERC20TokenContract } from "@0x/contract-wrappers";
// import toast from "react-hot-toast";
// import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS } from "../../constants";
// import { getContractWrappers } from "../../utils/spot/contractWrapper";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "react-bootstrap";
import CurrencyText from "../../CurrencyText";
// import UnlockModal from "../UnlockModal";
import GradientButton from "../../UI/Button";
import useTheme from "../../../hooks/useTheme";
import * as Styled from "./styleds";

export const TradePanel = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	// const [unlocking, setUnlocking] = useState(false);
	// const [showUnlockModal, setShowUnlockModal] = useState(false);

	// let web3;
	// let web3Wrapper;

	// useEffect(() => {
	// 	web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL));
	// 	if (web3.currentProvider) {
	// 		web3Wrapper = new Web3Wrapper(web3.currentProvider);
	// 	}
	// }, []);

	// const unlockHandler = async (token) => {
	// 	setShowUnlockModal(true);
	// 	try {
	// 		if (token.address) {
	// 			const contractWrappers = await getContractWrappers(web3.currentProvider || window.ethereum);
	// 			const approveAddress = token.address ? token.address : contractWrappers.contractAddresses.erc20Proxy;

	// 			const erc20Token = new ERC20TokenContract(token.address, contractWrappers.getProvider());
	// 			const amount = UNLIMITED_ALLOWANCE_IN_BASE_UNITS;

	// 			const tx = await erc20Token.approve(approveAddress, amount).sendTransactionAsync({
	// 				from: account,
	// 			});
	// 			setUnlocking(true);
	// 			await web3Wrapper.awaitTransactionSuccessAsync(tx);

	// 			if (tx) {
	// 				setUnlocking(false);
	// 				setDone(true);
	// 			}
	// 		} else if (token.symbol === "ETH") {
	// 			throw new Error("Unnecessary Approve for ethereum");
	// 		} else {
	// 			throw new Error("Token is invalid");
	// 		}
	// 	} catch (e) {
	// 		toast.error("Unnecessary Approve for ethereum or token is invalid");
	// 		setUnlocking(false);
	// 		setShowUnlockModal(false);
	// 		setDone(false);
	// 	}
	// };

	// const isLoading = row.loading || false;
	// const value = row.balanceUSD * (currenciesRate["BTC"] || 1);

	const onUnlock = () => {
		alert("Unlock");
	};

	const onBuy = () => {
		alert("Buy");
		/* href={`/#/exchange?outputCurrency=${row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address}`} */
		// to={`/exchange?outputCurrency=${selected.contract_address}`}
	};

	const onSell = () => {
		alert("Sell");
		/* href={`/#/exchange?inputCurrency=${row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address}`} */
		// to={`/exchange?inputCurrency=${selected.contract_address}`}
	};

	const onConvert = () => {
		alert("Convert");
		/* href={`/#/exchange?inputCurrency=${row.metadata.symbol === "ETH" ? "ETH" : row.metadata.address}&outputCurrency=0x7240aC91f01233BaAf8b064248E80feaA5912BA3`} */
	};

	return (
		<div>
			{/* <UnlockModal
				done={done}
				show={showUnlockModal}
				unlocking={unlocking}
				onDismiss={() => {
					setDone(false);
					setUnlocking(false);
					setShowUnlockModal(false);
				}}
			/> */}

			{/* {selected && walletBalance > 0 && (
				<Styled.BalanceCard>
					<div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between">
						<Styled.BalanceText>Your "{selected.name}" Balance</Styled.BalanceText>
						<Styled.BalanceValue>
							{selected.symbol.toUpperCase()} {walletBalance.toFixed(6)} (
							<CurrencyText value={walletBalance * selected.market_data.current_price.usd} />)
						</Styled.BalanceValue>
					</div>
				</Styled.BalanceCard>
			)} */}

			<ButtonGroup size="lg" vertical>
				{/* onClick={() => unlockHandler(row.metadata)} */}
				{/* disabled={row.metadata.symbol === "ETH"} */}
				<Button onClick={onUnlock} variant="warning">
					{t("buttons.unlock")}
				</Button>

				<Button onClick={onBuy} variant="primary" className="mt-1">
					{t("buttons.buy")}
				</Button>

				<Button onClick={onSell} variant="info" className="mt-1">
					{t("buttons.sell")}
				</Button>

				<Button onClick={onConvert} variant="danger" className="mt-1">
					{t("buttons.convertTo", { symbol: "OCTO" })}
				</Button>
			</ButtonGroup>
		</div>
	);
};
