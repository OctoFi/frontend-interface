import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Token, TokenAmount } from "@uniswap/sdk";
import { serializeError } from "eth-rpc-errors";
import BigNumber from "bignumber.js";
import { Col, Row, Form, ListGroup, Button, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import toast from "react-hot-toast";

import Page from "../../components/Page";
import Card from "../../components/Card";
import useTheme from "../../hooks/useTheme";
import AddressInputPanel from "../../components/AddressInputPanel";
import CurrencyLogo from "../../components/Logo/CurrencyLogo";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import { getContract, shortenAddress } from "../../utils";
import { UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO_ADDRESS } from "../../constants";
import { LAUNCHPAD_WETH_TOKEN, LAUNCHPAD_WHITELIST_CONTRACTS, presaleAddresses } from "../../constants/launchpad";
import PresaleGeneratorABI from "../../constants/abis/Presale/PresaleGenerator.json";
import { useActiveWeb3React } from "../../hooks";
import { useContract } from "../../hooks/useContract";
import WalletConnectStatus from "../../components/WalletConnectStatus";
import { AccountState, AccountStateContent, AccountStateTitle } from "../../components/WalletConnectStatus/styleds";
import GradientButton from "../../components/UI/Button";
import { useWalletModalToggle } from "../../state/application/hooks";
import TokenAddressInput from "./TokenInputPanel/TokenInputPanel";
import { ERC20_ABI } from "../../constants/abis/erc20";
import BaseTokenSelector from "../../components/BaseTokenSelector";
import PresaleSettingsABI from "../../constants/abis/Presale/PresaleSettings.json";
import { useApproveCallback } from "../../hooks/useApproveCallback";
import { useETHBalances } from "../../state/wallet/hooks";
import { usePair } from "../../data/Reserves";
import * as Styled from "./styleds";
import { ROUTE_LAUNCHPAD } from "../../constants/routes";

const PATTERN = /^(0x[a-fA-F0-9]{40})$/;

let blockInterval;

const NewLaunchpad = (props) => {
	const theme = useTheme();
	const { account, library, chainId } = useActiveWeb3React();
	const { t } = useTranslation();
	const toggleWalletModal = useWalletModalToggle();
	const history = useHistory();

	const [tokenAddress, setTokenAddress] = useState("");
	const [selectedToken, setSelectedToken] = useState(undefined);
	const [baseToken, setBaseToken] = useState(LAUNCHPAD_WETH_TOKEN);
	const [presaleAmount, setPresaleAmount] = useState("");
	const [softCap, setSoftCap] = useState("");
	const [hardCap, setHardCap] = useState("");
	const [listingPercent, setListingPercent] = useState(10);
	const [tokenFee, setTokenFee] = useState(0);
	const [baseFee, setBaseFee] = useState(0);
	const [liquidityRaisePercent, setLiquidityRaisePercent] = useState(60);
	const [predictionAmount, setPredictionAmount] = useState(0);
	const [ethCreationFee, setEthCreationFee] = useState(0);
	const [tokenLimit, setTokenLimit] = useState("");
	const [lockValue, setLockValue] = useState("2592000");
	const [startBlock, setStartBlock] = useState("");
	const [endBlock, setEndBlock] = useState("");
	const [referralAddress, setReferralAddress] = useState("");
	const [currentBlockNumber, setCurrentBlockNumber] = useState(undefined);
	const [maxPresaleLength, setMaxPresaleLength] = useState(0);
	const [loading, setLoading] = useState(false);

	const settingsContract = useContract(presaleAddresses.settings, PresaleSettingsABI);
	const generatorContract = useContract(presaleAddresses.generator, PresaleGeneratorABI);
	const ethBalance = useETHBalances([account]);
	const [pairState] = usePair(baseToken, selectedToken);

	const approvalAmount = useMemo(() => {
		if (selectedToken instanceof Token) {
			return new TokenAmount(selectedToken, UNLIMITED_ALLOWANCE_IN_BASE_UNITS.toString());
		}
		return undefined;
	}, [selectedToken]);
	const presaleRate = useMemo(() => {
		if (presaleAmount && hardCap && Number(hardCap) > 0) {
			const presaleAmountNum = new BigNumber(presaleAmount);
			const hardCapNum = new BigNumber(hardCap);

			return presaleAmountNum.div(hardCapNum).toFixed(6);
		}
		return 0;
	}, [presaleAmount, hardCap]);
	const listingRate = useMemo(() => {
		if (presaleAmount && hardCap && Number(hardCap) > 0) {
			const presaleAmountNum = new BigNumber(presaleAmount);
			const hardCapNum = new BigNumber(hardCap);

			return presaleAmountNum
				.div(hardCapNum)
				.times((100 - listingPercent) / 100)
				.toFixed(6);
		}
		return 0;
	}, [presaleAmount, hardCap, listingPercent]);
	const liquidityAmount = useMemo(() => {
		if (presaleAmount) {
			const presaleAmountNum = new BigNumber(presaleAmount);

			return presaleAmountNum
				.times(1 - tokenFee)
				.times((100 - listingPercent) / 100)
				.times(liquidityRaisePercent / 100)
				.toFixed(4);
		}
		return 0;
	}, [tokenFee, presaleAmount, listingPercent, liquidityRaisePercent]);
	const predictionParameters = useMemo(() => {
		const res = {
			baseFee: 0,
			tokenFee: 0,
			baseLiquidity: 0,
			tokenLiquidity: 0,
			tokenSold: 0,
			yourBaseToken: 0,
		};
		const hardcap = Number(hardCap);
		const rate = !hardcap || hardcap === 0 ? 0 : predictionAmount / hardcap;

		if (baseFee) {
			res.baseFee = (baseFee * predictionAmount)?.toFixed(4);
		}
		if (tokenFee) {
			res.tokenFee = (tokenFee * (presaleAmount * rate))?.toFixed(4);
		}
		if (liquidityAmount && listingRate) {
			res.tokenLiquidity = (rate * liquidityAmount)?.toFixed(4);
			res.baseLiquidity = (res.tokenLiquidity / listingRate)?.toFixed(4);
		}

		res.tokenSold = (rate * presaleAmount)?.toFixed(4);
		res.yourBaseToken = (predictionAmount - res.baseFee - res.baseLiquidity)?.toFixed(4);

		return res;
	}, [tokenFee, liquidityAmount, predictionAmount, hardCap, baseFee, listingRate, presaleAmount]);
	const [approval, approvalCallback] = useApproveCallback(approvalAmount, presaleAddresses.generator);

	useEffect(() => {
		settingsContract
			.getTokenFee()
			.then((res) => {
				setTokenFee(res.toNumber() / 1000);
			})
			.catch((e) => {
				setTokenFee(0);
			});
		settingsContract
			.getBaseFee()
			.then((res) => {
				setBaseFee(res.toNumber() / 1000);
			})
			.catch((e) => {
				setBaseFee(0);
			});
		settingsContract
			.getEthCreationFee()
			.then((res) => {
				let transformedValue = new BigNumber(res?.toString());
				transformedValue = transformedValue.dividedBy(10 ** 18);
				setEthCreationFee(transformedValue.toNumber());
			})
			.catch((e) => {
				setEthCreationFee(0);
			});
		settingsContract
			.getMaxPresaleLength()
			.then((res) => {
				setMaxPresaleLength(res.toNumber());
			})
			.catch((e) => {
				setMaxPresaleLength(0);
			});
	}, [settingsContract, account]);

	useEffect(() => {
		if (softCap && hardCap) {
			const min = Number(softCap);
			const max = Number(hardCap);

			setPredictionAmount(Math.floor((max - min) / 2 + min));
		}
	}, [softCap, hardCap]);

	useEffect(() => {
		clearInterval(blockInterval);
		blockInterval = setInterval(() => {
			library.getBlockNumber().then((res) => {
				setCurrentBlockNumber(res);
			});
		}, 60000);

		return () => {
			clearInterval(blockInterval);
			blockInterval = undefined;
		};
	}, [library]);

	const changePredictionAmount = (e) => {
		setPredictionAmount(Number.parseInt(e.target.value));
	};

	const changePresaleAmount = (val) => {
		setPresaleAmount(val);
	};
	const changeSoftcap = (val) => {
		setSoftCap(val);
	};
	const changeHardcap = (val) => {
		setHardCap(val);
	};

	const changeBaseTokenLimit = (val) => {
		setTokenLimit(val);
	};

	const changeListingPercent = (val) => {
		setListingPercent(val);
	};

	const changeLockLiquidity = (e) => {
		const value = e.target.value;
		setLockValue(value);
	};

	const changeBlock = (e, type = "start") => {
		const value = e.target.value;
		if (type === "start") {
			setStartBlock(value);
		} else {
			setEndBlock(value);
		}
	};

	const changeLiquidityRaisePercent = (e) => {
		setLiquidityRaisePercent(Number.parseInt(e.target.value));
	};

	const getTokenInfo = async (address, contract) => {
		try {
			const decimals = await contract.decimals();
			const name = await contract.name();
			const symbol = await contract.symbol();

			return new Token(chainId, address, decimals, symbol, name);
		} catch (e) {
			return Promise.reject(e);
		}
	};

	const changeTokenAddress = (val) => {
		if (PATTERN.test(val)) {
			if (LAUNCHPAD_WHITELIST_CONTRACTS.includes(val.toLowerCase())) {
				const tokenContract = getContract(val, ERC20_ABI, library, account);
				getTokenInfo(val, tokenContract)
					.then((res) => {
						setSelectedToken(res);
					})
					.catch((e) => {
						toast.error("Wrong token address");
					});
			} else {
				toast.error("Your token isn't whitelisted");
			}
		}
		setTokenAddress(val);
	};

	const changeBaseToken = (currency) => {
		setBaseToken(currency);
	};

	const validation = () => {
		let isValid = true;
		if (pairState === 2) {
			toast.error(`The ${baseToken?.symbol} / ${selectedToken?.symbol} pair already has liquidity on Uniswap.`);
			isValid = false;
		}
		if (!tokenAddress || !selectedToken || !baseToken) {
			toast.error("Please enter valid token address");
			isValid = false;
		}

		if (!presaleAmount || presaleAmount === "0") {
			toast.error("Presale amount must be greater than 0");
			isValid = false;
		}

		if (Number(presaleAmount) < 0.0001) {
			toast.error("A minimum divisibility of 10,000 units (including decimals) is required for a presale.");
			isValid = false;
		}

		if (softCap === "0" || !softCap) {
			toast.error("Soft cap must be greater than 0");
			isValid = false;
		}

		if (hardCap === "0" || !hardCap) {
			toast.error("Hard cap must be greater than 0");
			isValid = false;
		}

		if (!startBlock) {
			toast.error("Start block is required");
			isValid = false;
		}
		if (!endBlock) {
			toast.error("End block is required");
			isValid = false;
		}

		if (Number(softCap) > Number(hardCap)) {
			toast.error("Hard cap must be greater than the Soft cap");
			isValid = false;
		}

		if (Number(startBlock) < Number(currentBlockNumber)) {
			toast.error(`Start block number must be greater than the current block number (${currentBlockNumber})`);
			isValid = false;
		}
		if (Number(endBlock) < Number(currentBlockNumber)) {
			toast.error(`End block number must be greater than the current block number (${currentBlockNumber})`);
			isValid = false;
		}

		if (Number(endBlock) < Number(startBlock)) {
			toast.error("End block number must be greater than the Start block number");
			isValid = false;
		}

		if (Number(endBlock) - Number(startBlock) < 0 || Number(endBlock) - Number(startBlock) > maxPresaleLength) {
			toast.error(`The presale time must be less than 2 weeks (${maxPresaleLength} blocks approximately)`);
			isValid = false;
		}
		if (Number(tokenLimit) <= 0 || !tokenLimit) {
			toast.error(`${selectedToken?.symbol} limit per user must be greater than 0`);
			isValid = false;
		}

		if (referralAddress.length > 0 && !PATTERN.test(referralAddress)) {
			toast.error(`Referral Address is not valid`);
			isValid = false;
		}
		if (Number(ethBalance[account]) < Number(ethCreationFee)) {
			toast.error(
				`You do not have enough ETH in your wallet to perform this transaction. ${ethCreationFee} ETH required. `
			);
			isValid = false;
		}

		return isValid;
	};

	const createPresaleHandler = () => {
		if (!validation()) {
			return false;
		}
		setLoading(true);

		const tAmount = new BigNumber(presaleAmount).times(10 ** selectedToken?.decimals);
		const tPrice = new BigNumber(presaleRate).times(10 ** baseToken?.decimals);
		const tMaxSpend = new BigNumber(tokenLimit).times(10 ** baseToken?.decimals);
		const tHardcap = new BigNumber(hardCap).times(10 ** baseToken?.decimals);
		const tSoftcap = new BigNumber(softCap).times(10 ** baseToken?.decimals);
		const tLiquidityPercent = new BigNumber(liquidityRaisePercent).times(10);
		const tListingPrice = new BigNumber(listingRate).times(10 ** baseToken.decimals);
		const tStartBlock = new BigNumber(startBlock);
		const tEndBlock = new BigNumber(endBlock);
		const tLockPeriod = new BigNumber(lockValue);
		const ethValue = new BigNumber(ethCreationFee).times(10 ** 18);

		const params = [
			account,
			selectedToken?.address,
			baseToken?.address,
			referralAddress || ZERO_ADDRESS,
			[
				tAmount.toString(),
				tPrice.toString(),
				tMaxSpend.toString(),
				tHardcap.toString(),
				tSoftcap.toString(),
				tLiquidityPercent.toString(),
				tListingPrice.toString(),
				tStartBlock.toString(),
				tEndBlock.toString(),
				tLockPeriod.toString(),
			],
		];

		generatorContract
			.createPresale(...params, { value: ethValue.toString() })
			.then(() => {
				setLoading(false);
				toast.success("The presale created successfully!");
				history.push(ROUTE_LAUNCHPAD);
			})
			.catch((err) => {
				setLoading(false);
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
			});
	};

	return (
		<Page title={false} networkSensitive={true}>
			<Row>
				<Col xs={{ span: 12, offset: 0 }} md={{ span: 6, offset: 3 }}>
					<Card>
						<WalletConnectStatus />

						{!account ? (
							<Row>
								<Col xs={12} className={"d-flex align-items-center justify-content-between"}>
									<Styled.IconButton to={"/launchpad"}>
										<ArrowLeft color={theme.text1} width={24} height={24} />
									</Styled.IconButton>
								</Col>
								<Col xs={12}>
									<Styled.Title className={"text-center"}>
										New Initial Liquidity Offering
									</Styled.Title>
								</Col>
								<Col
									xs={12}
									className={"d-flex align-items-center justify-content-center"}
									style={{ paddingBottom: 30 }}
								>
									<GradientButton className={"btn-lg"} onClick={toggleWalletModal}>
										{t("wallet.connect")}
									</GradientButton>
								</Col>
							</Row>
						) : (
							<Row>
								<Col xs={12} className={"d-flex align-items-center justify-content-between"}>
									<Styled.IconButton to={"/launchpad"}>
										<ArrowLeft color={theme.text1} width={24} height={24} />
									</Styled.IconButton>
								</Col>
								<Col xs={12} className={"mb-5"}>
									<Styled.Title className={"text-center"}>
										New Initial Liquidity Offering
									</Styled.Title>
								</Col>

								<Col xs={12}>
									<TokenAddressInput
										id={"token-address"}
										value={tokenAddress}
										onChange={changeTokenAddress}
									/>
								</Col>
								{(!selectedToken || pairState === 2) && (
									<>
										<Col xs={12} className={"mb-5 mt-4"}>
											<BaseTokenSelector
												currency={baseToken}
												label={"Buyers participate with"}
												id={"participate-token"}
												onCurrencySelect={changeBaseToken}
											/>
										</Col>
										<Col xs={12} className={"mb-4"}>
											<Styled.DetailsWrapper>
												<Styled.DetailsLabel>Uniswap pair to be created</Styled.DetailsLabel>
												<Styled.DetailsTitle>
													{baseToken?.symbol} / {selectedToken?.symbol || "?"}
												</Styled.DetailsTitle>
											</Styled.DetailsWrapper>
										</Col>
									</>
								)}
								{pairState === 2 ? (
									<>
										<Col xs={12}>
											<AccountState type={"danger"} className={"bg-dark mb-3"}>
												<AccountStateContent className={"d-flex flex-column ml-0"}>
													<AccountStateTitle className={"mb-2 text-success"}>
														The {baseToken?.symbol} / {selectedToken?.symbol} pair already
														has liquidity on Uniswap.
													</AccountStateTitle>
													<Styled.DetailsLabel>
														You cannot create a presale for this pair as the price is
														already set.
													</Styled.DetailsLabel>
												</AccountStateContent>
											</AccountState>
										</Col>
										<Col xs={12}>
											<Styled.TokenWrapper>
												<CurrencyLogo
													currency={selectedToken}
													size={24}
													style={{ marginRight: 16 }}
												/>
												<Styled.TokenName>
													{selectedToken?.symbol} / {selectedToken?.name}
												</Styled.TokenName>
												<Styled.TokenAddress>
													{shortenAddress(selectedToken?.address)}
												</Styled.TokenAddress>
											</Styled.TokenWrapper>
										</Col>
									</>
								) : (
									selectedToken && (
										<>
											<Col xs={12}>
												<Styled.TokenWrapper>
													<CurrencyLogo
														currency={selectedToken}
														size={24}
														style={{ marginRight: 16 }}
													/>
													<Styled.TokenName>
														{selectedToken?.symbol} / {selectedToken?.name}
													</Styled.TokenName>
													<Styled.TokenAddress>
														{shortenAddress(selectedToken?.address)}
													</Styled.TokenAddress>
												</Styled.TokenWrapper>
											</Col>
											<Col xs={12} className={"mb-5"}>
												<BaseTokenSelector
													currency={baseToken}
													label={"Buyers participate with"}
													id={"participate-token"}
													onCurrencySelect={changeBaseToken}
												/>
											</Col>
											<Col xs={12} className={"mb-4"}>
												<Styled.DetailsWrapper>
													<Styled.DetailsLabel>
														Uniswap pair to be created
													</Styled.DetailsLabel>
													<Styled.DetailsTitle>
														{baseToken?.symbol} / {selectedToken?.symbol || "?"}
													</Styled.DetailsTitle>
												</Styled.DetailsWrapper>
											</Col>
											<Col xs={12} className={"mb-4"}>
												<Styled.DetailsWrapper>
													<Styled.DetailsLabel>Presale Creator</Styled.DetailsLabel>
													<Styled.DetailsTitle>{shortenAddress(account)}</Styled.DetailsTitle>
												</Styled.DetailsWrapper>
											</Col>
											<Col xs={12} className={"mb-2"}>
												<Styled.Description className={"text-center mb-3"}>
													This account will be the only account capable of adding presale
													information, editing presale contract parameters and unlocking
													liquidity.
												</Styled.Description>
											</Col>
											<Col xs={12} className={"mb-2"}>
												<Styled.DescriptionCard>
													<Styled.Description className={"mb-0"}>
														We recommended a minimum liquidity percentage of 60%, and a
														minimum lock of 1 year. Additionally it would be worth while
														contacting one of our official auditors and KYC partners before
														creating a presale as this will go a long way to making your
														presale a success.
													</Styled.Description>
												</Styled.DescriptionCard>
											</Col>
											<Col xs={12} className={"mb-2"}>
												<Styled.RowTitle className={"text-center"}>
													How many {selectedToken?.symbol} are up for presale?
												</Styled.RowTitle>
											</Col>

											<Col xs={12} className={"mb-3"}>
												<CurrencyInputPanel
													label={`Presale Amount`}
													value={presaleAmount}
													showMaxButton={true}
													currency={selectedToken}
													onUserInput={changePresaleAmount}
													onMax={changePresaleAmount}
													disableCurrencySelect={true}
													id="presale-amount"
													withoutMargin={true}
												/>
											</Col>
											<Col xs={12} className={"mb-3"}>
												<CurrencyInputPanel
													label={`Softcap`}
													value={softCap}
													showMaxButton={true}
													currency={baseToken}
													onUserInput={changeSoftcap}
													onMax={changeSoftcap}
													disableCurrencySelect={true}
													id="presale-softcap"
													withoutMargin={true}
												/>
											</Col>
											<Col xs={12} className={"mb-3"}>
												<CurrencyInputPanel
													label={`Hardcap`}
													value={hardCap}
													showMaxButton={true}
													currency={baseToken}
													onUserInput={changeHardcap}
													onMax={changeHardcap}
													disableCurrencySelect={true}
													id="presale-hardcap"
													withoutMargin={true}
												/>
											</Col>

											<Col xs={12} className={"mb-4"}>
												<Styled.DetailsWrapper>
													<Styled.DetailsLabel>Presale Rate</Styled.DetailsLabel>
													<Styled.DetailsTitle>
														1 {baseToken?.symbol === "WETH" ? "ETH" : baseToken?.symbol} ={" "}
														{presaleRate} {selectedToken?.symbol}
													</Styled.DetailsTitle>
												</Styled.DetailsWrapper>
											</Col>
											<Col xs={12} className={"mb-4"}>
												<Styled.DetailsWrapper>
													<Styled.DetailsLabel>Uniswap listing rate</Styled.DetailsLabel>
													<Styled.DetailsTitle>
														1 {baseToken?.symbol === "WETH" ? "ETH" : baseToken?.symbol} ={" "}
														{listingRate} {selectedToken?.symbol}
													</Styled.DetailsTitle>
													<div className="d-flex align-items-center justify-content-center">
														<Button
															variant={
																listingPercent === 0 ? "primary" : "outline-primary"
															}
															onClick={changeListingPercent.bind(this, 0)}
															size={"sm"}
															className={"mr-2"}
														>
															0%
														</Button>
														<Button
															variant={
																listingPercent === 10 ? "primary" : "outline-primary"
															}
															onClick={changeListingPercent.bind(this, 10)}
															size={"sm"}
															className={"mr-2"}
														>
															10%
														</Button>
														<Button
															variant={
																listingPercent === 25 ? "primary" : "outline-primary"
															}
															onClick={changeListingPercent.bind(this, 25)}
															size={"sm"}
															className={"mr-2"}
														>
															25%
														</Button>
														<Button
															variant={
																listingPercent === 30 ? "primary" : "outline-primary"
															}
															onClick={changeListingPercent.bind(this, 30)}
															size={"sm"}
															className={"mr-2"}
														>
															30%
														</Button>
														<Button
															variant={
																listingPercent === 50 ? "primary" : "outline-primary"
															}
															onClick={changeListingPercent.bind(this, 50)}
															size={"sm"}
														>
															50%
														</Button>
													</div>
												</Styled.DetailsWrapper>
											</Col>

											<Col xs={12} className={"mb-2"}>
												<Styled.RowTitle className={"text-center"}>
													Percent of raised {baseToken?.symbol} used for liquidity
												</Styled.RowTitle>
											</Col>
											<Col xs={12} className={"mb-4 d-flex flex-column"}>
												<Styled.DetailsTitle className="text-center mb-2">
													{liquidityRaisePercent}%
												</Styled.DetailsTitle>
												<Form.Control
													min={30}
													max={100}
													step={1}
													value={liquidityRaisePercent}
													onChange={changeLiquidityRaisePercent}
													type="range"
													custom
													variant={"secondary"}
												/>
											</Col>

											<Col xs={12} className={"mb-2"}>
												<Styled.DescriptionCard className={"d-flex flex-column"}>
													<Styled.Description className={"mb-2 text-center"}>
														Additional tokens required for liquidity if hardcap is met
													</Styled.Description>
													<Styled.DetailsTitle className={"mb-0 text-center"}>
														{liquidityAmount} {selectedToken?.symbol}
													</Styled.DetailsTitle>
												</Styled.DescriptionCard>
											</Col>

											<Col xs={12} className={"mb-5"}>
												<Styled.DescriptionCard className={"d-flex flex-column"}>
													<Styled.RowTitle className={"text-center"}>
														Presale prediction
													</Styled.RowTitle>
													<Styled.RowDesc className="text-center">
														Use the slider to predict fee and liquidity amounts depending on
														amounts raised in presale.
													</Styled.RowDesc>
													<Styled.Title className={"text-center mb-2"}>
														{predictionAmount} {baseToken?.symbol}
													</Styled.Title>
													<Form.Control
														type="range"
														custom
														variant={"secondary"}
														min={softCap}
														max={hardCap}
														value={predictionAmount}
														onChange={changePredictionAmount}
													/>
													<Row className={"mt-5"}>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>OctoFi Fee</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.baseFee} {baseToken?.symbol}
															</Styled.InnerCard>
														</Col>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>
																{baseToken?.symbol} liquidity
															</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.baseLiquidity}{" "}
																{baseToken?.symbol}
															</Styled.InnerCard>
														</Col>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>
																Your {baseToken?.symbol}
															</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.yourBaseToken}{" "}
																{baseToken?.symbol}
															</Styled.InnerCard>
														</Col>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>OctoFi Fee</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.tokenFee} {selectedToken?.symbol}
															</Styled.InnerCard>
														</Col>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>
																{selectedToken?.symbol} liquidity
															</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.tokenLiquidity}{" "}
																{selectedToken?.symbol}
															</Styled.InnerCard>
														</Col>
														<Col xs={12} md={6} lg={4} className={"d-flex flex-column"}>
															<Styled.InnerCardLabel>
																{selectedToken?.symbol} sold
															</Styled.InnerCardLabel>
															<Styled.InnerCard>
																{predictionParameters?.tokenSold}{" "}
																{selectedToken?.symbol}
															</Styled.InnerCard>
														</Col>
													</Row>
												</Styled.DescriptionCard>
											</Col>

											<Col xs={12} className={"mb-3"}>
												<CurrencyInputPanel
													label={`${baseToken?.symbol} limit per user`}
													value={tokenLimit}
													showMaxButton={false}
													currency={baseToken}
													onUserInput={changeBaseTokenLimit}
													disableCurrencySelect={true}
													id="base-token-limit"
													withoutMargin={true}
												/>
											</Col>

											<Col xs={12} className={"mb-4 d-flex flex-column"}>
												<Styled.Label>Lock Liquidity for</Styled.Label>
												<Styled.SelectFormControl
													as="select"
													custom
													onChange={changeLockLiquidity}
													value={lockValue}
												>
													<option value={"2678400"}>1 Month</option>
													<option value={"5356800"}>2 Months</option>
													<option value={"8035200"}>3 Months</option>
													<option value={"15897600"}>6 Months</option>
													<option value={"31536000"}>1 Year</option>
													<option value={"9999999999"}>Max: 266 Years</option>
												</Styled.SelectFormControl>
											</Col>
											<Col xs={12} className={"mb-4 mt-2 d-flex flex-column"}>
												<Row>
													<Col xs={12} md={6}>
														<Styled.Label>Start block</Styled.Label>
														<Styled.CustomFormControl
															value={startBlock}
															onChange={(e) => changeBlock(e, "start")}
															placeholder={"Start block"}
														/>
													</Col>
													<Col xs={12} md={6}>
														<Styled.Label>End block</Styled.Label>
														<Styled.CustomFormControl
															value={endBlock}
															onChange={(e) => changeBlock(e, "end")}
															placeholder={"End block"}
														/>
													</Col>
												</Row>
											</Col>
											<Col xs={12} className={"mb-4 mt-2 d-flex flex-column"}>
												<AddressInputPanel
													label={"Referral Address (optional)"}
													id={"referral-address"}
													onChange={setReferralAddress}
													value={referralAddress}
													placeholder={"Referral Address"}
												/>
											</Col>
											<Col xs={12} className="mb-5 d-flex flex-column">
												<ListGroup>
													<Styled.ListItem>
														<Styled.ListItemText>Presale & Locking fee</Styled.ListItemText>
														<Styled.ListItemText>{ethCreationFee} ETH</Styled.ListItemText>
													</Styled.ListItem>
													<Styled.ListItem>
														<Styled.ListItemText>
															{baseToken?.symbol} raised fee
														</Styled.ListItemText>
														<Styled.ListItemText>
															{(baseFee * 100).toFixed(2)}% {baseToken?.symbol}
														</Styled.ListItemText>
													</Styled.ListItem>
													<Styled.ListItem>
														<Styled.ListItemText>
															{selectedToken?.symbol} sold fee
														</Styled.ListItemText>
														<Styled.ListItemText>
															{(tokenFee * 100).toFixed(2)}% {selectedToken?.symbol}
														</Styled.ListItemText>
													</Styled.ListItem>
													<Styled.ListItem>
														<Styled.ListItemText>
															Defi dashboard UNIv2 locking fee
														</Styled.ListItemText>
														<Styled.ListItemText>&mdash;</Styled.ListItemText>
													</Styled.ListItem>
												</ListGroup>
											</Col>

											<Col xs={12} className={"d-flex align-items-center"}>
												<Button
													className={
														"flex-grow-1 mr-1 d-flex align-items-center justify-content-center"
													}
													variant={"secondary"}
													style={{ height: 56 }}
													disabled={approval !== 1}
													onClick={approvalCallback}
												>
													{approval === 2 ? (
														<Spinner
															animation="border"
															variant="light"
															size="sm"
															id="approval-loading"
														/>
													) : (
														"Approve"
													)}
												</Button>
												<Button
													className={
														"flex-grow-1 ml-1 d-flex align-items-center justify-content-center"
													}
													variant={"primary"}
													style={{ height: 56 }}
													onClick={createPresaleHandler}
												>
													{loading ? (
														<Spinner
															animation="border"
															variant="light"
															size="sm"
															id={"create-presale-loading"}
														/>
													) : (
														"Create Presale"
													)}
												</Button>
											</Col>
										</>
									)
								)}
							</Row>
						)}
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default NewLaunchpad;
