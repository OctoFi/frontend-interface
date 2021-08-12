import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import Web3 from "web3";
import { Spinner } from "react-bootstrap";
import BigNumber from "bignumber.js";

import { OCTO } from "../../constants";
import { ERC20_ABI } from "../../constants/abis/erc20";
import { useActiveWeb3React } from "../../hooks";
import useTheme from "../../hooks/useTheme";
import EthDater from "../../lib/ethDater";
// import { AppState } from "../../state";
import { promisify } from "../../utils/promisify";
import Chart from "./Chart";
import * as Styled from "./styleds";

export const ChartCard = () => {
	const { account, library } = useActiveWeb3React();
	// const rates = useSelector((state: AppState) => state.currency.currenciesRate);
	// const darkMode = useSelector((state: AppState) => state.user.userDarkMode);
	const theme = useTheme();

	const web3Provider = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_WSS_URL || ""));
	const dater = new EthDater(web3Provider);
	const selectedToken = OCTO;
	const [connected, setConnected] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedRange, setSelectedRange] = useState("month");
	const [categories, setCategories] = useState([]);
	const [series, setSeries] = useState([
		{
			name: "Balance",
			data: [],
		},
	]);
	const options = [
		{
			title: "1D",
			id: "day",
		},
		{
			title: "1W",
			id: "week",
		},
		{
			title: "1M",
			id: "month",
		},
		{
			title: "6M",
			id: "six_month",
		},
		{
			title: "1Y",
			id: "year",
		},
	];

	useEffect(() => {
		changeOption(selectedRange, selectedToken);
		// return () => {
		// 	cleanup
		// }
	}, [selectedRange, selectedToken, account]);

	const changeOption = async (id, token = OCTO) => {
		setLoading(true);

		try {
			if (account) {
				setConnected(true);
				let date = getStartDate(id);
				let blockNumber = await dater.getDate(date, false);
				let latestBlockNumber = await getBlockNumber();
				let balances = await getBalanceInRange(account, blockNumber.block, latestBlockNumber, token);
				let transformedBalances = balances?.map((balance) => {
					return balance.balance?.toFixed(5);
				});
				let categories = balances?.map((balance) => {
					return moment(balance.time).format("YYYY MMM D, HH:mm:ss");
				});
				setLoading(false);
				setSeries([
					{
						name: "Balance",
						data: transformedBalances,
					},
				]);
				setCategories(categories || []);
			} else {
				setLoading(false);
				setConnected(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getFirstBlock = async (address) => {
		try {
			let response = await axios.get(
				"https://api.etherscan.io/api?module=account&action=txlist&address=" +
					address +
					"&startblock=0&page=1&offset=10&sort=asc&apikey=" +
					process.env.REACT_APP_ETHERSCAN_API_KEY
			);
			let data = response.data;

			if (data.result.length > 0) {
				return data.result[0].blockNumber;
			} else {
				return -1;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const unpack = (rows, index) => {
		return rows.map(function (row) {
			return row[index];
		});
	};

	const getBlockNumber = () => {
		return new Promise((resolve, reject) => {
			resolve(library && library?.blockNumber > 0 ? library?.blockNumber : 999999999);
		});
	};

	const getBalanceInRange = async (address, startBlock, endBlock, token) => {
		const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(process.env.REACT_APP_NETWORK_URL));
		// Calculate the step size given the range of blocks and the number of points we want
		let step = Math.floor((endBlock - startBlock) / 200);
		// Make sure step is at least 1
		if (step < 1) {
			step = 1;
		}

		try {
			let promises = [];
			let tokenContract;
			if (token?.symbol && token?.symbol !== "ETH") {
				tokenContract = new web3.eth.Contract(ERC20_ABI, token?.address);
			}
			// Loop over the blocks, using the step value
			for (let i = startBlock; i < endBlock; i = i + step) {
				// If we already have data about that block, skip it
				if (!series[0].data.find((x) => (x.hasOwnProperty("block") ? x.block === i : false))) {
					let balancePromise;

					// Create a promise to query the ETH balance for that block
					if (token?.symbol === "ETH" || !token?.symbol) {
						balancePromise = promisify((cb) => web3Provider.eth.getBalance(address, i, cb));
					} else {
						tokenContract.defaultBlock = i;
						balancePromise = promisify((cb) => tokenContract.methods.balanceOf(address).call({}, i, cb));
					}

					// Create a promise to get the timestamp for that block
					let timePromise = promisify((cb) => web3Provider.eth.getBlock(i, cb));
					// Push data to a linear array of promises to run in parallel.
					promises.push(i, balancePromise, timePromise);
				}
			}

			// Call all promises in parallel for speed, result is array of {block: <block>, balance: <ETH balance>}
			let results = await Promise.all(promises);

			// Restructure the data into an array of objects
			let balances = [];
			for (let i = 0; i < results.length; i = i + 3) {
				let balance =
					token?.symbol === "ETH" || !token?.symbol
						? web3Provider.utils.fromWei(results[i + 1], "ether")
						: new BigNumber(results[i + 1]).dividedBy(10 ** token?.decimals).toFixed(2);
				balances?.push({
					block: results[i],
					balance: parseFloat(balance),
					time: new Date(results[i + 2].timestamp * 1000),
				});
			}

			return balances;
		} catch (error) {
			console.log(error);
		}
	};

	const getStartDate = (id: string) => {
		let date = moment();
		switch (id) {
			case "year": {
				date.subtract(1, "years");
				break;
			}
			case "six_month": {
				date.subtract(6, "months");
				break;
			}
			case "month": {
				date.subtract(1, "months");
				break;
			}
			case "week": {
				date.subtract(7, "days");
				break;
			}
			case "day": {
				date.subtract(1, "days");
				break;
			}
			default: {
				break;
			}
		}
		return date;
	};

	return (
		<Styled.Wrapper>
			<Styled.CardHeader className="card-header border-0">
				<div className="d-flex align-items-stretch align-items-lg-center flex-column flex-lg-row">
					<Styled.Title>Portfolio Performance</Styled.Title>
				</div>
				<div className="card-toolbar d-none d-lg-flex">
					{options.map((option, index) => {
						return (
							<Styled.ToolbarButton
								onClick={() => setSelectedRange(option.id)}
								className={"btn btn-sm btn-link btn-inline"}
								selected={selectedRange === option.id}
								key={index}
							>
								{option.title}
							</Styled.ToolbarButton>
						);
					})}
				</div>
			</Styled.CardHeader>

			<div className="card-body d-flex flex-column p-0">
				{loading ? (
					<Styled.LoadingDiv className={"d-flex align-items-center justify-content-center"}>
						<Spinner animation="border" variant="primary" id="chart-card" />
					</Styled.LoadingDiv>
				) : connected ? (
					<Chart
						token={selectedToken}
						series={series}
						categories={categories}
						color={theme.primary}
						theme={theme}
						selected={selectedRange}
						minHeight={300}
					/>
				) : (
					<div>Not Connected</div>
				)}
			</div>
		</Styled.Wrapper>
	);
};
