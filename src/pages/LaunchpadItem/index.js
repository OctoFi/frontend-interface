import { useEffect, useMemo, useState } from "react";
import { Row, Col, Tab, Button, ListGroup, Spinner } from "react-bootstrap";
import { ArrowLeft, Lock, Users, Info, Copy, ExternalLink as ExternalLinkIcon } from "react-feather";

import Page from "../../components/Page";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import SafetyAlert from "./SafetyAlert";
import useTheme from "../../hooks/useTheme";
import { CurrencyAmount, ETHER, Token, TokenAmount } from "@uniswap/sdk";
import CircleBar from "../../components/CircleBar";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import { useParams, useHistory } from "react-router-dom";
import { useAccountBuy, usePresale } from "../../hooks/usePresale";
import { calculateGasMargin, getContract, shortenAddress } from "../../utils";
import { getExplorerLink } from "../../utils/explorer";
import { ERC20_ABI } from "../../constants/abis/erc20";
import { useActiveWeb3React } from "../../hooks";
import BigNumber from "bignumber.js";
import { BalanceToken, UNLIMITED_ALLOWANCE_IN_BASE_UNITS, ZERO } from "../../constants";
import { LAUNCHPAD_WETH_ADDRESS, LAUNCHPAD_WETH_TOKEN, LOCK_DURATION } from "../../constants/launchpad";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { useWalletModalToggle } from "../../state/application/hooks";
import PresaleABI from "../../constants/abis/Presale/Presale.json";
import GradientButton from "../../components/UI/Button";
import { useTokenBalance } from "../../state/wallet/hooks";
import { useApproveCallback } from "../../hooks/useApproveCallback";
import { serializeError } from "eth-rpc-errors";

import Presales from "../../constants/presales.json";
// import { useContract } from "../../hooks/useContract";
import CurrencyLogo from "../../components/CurrencyLogo";
import * as Styled from "./styleds";

const LaunchpadItem = () => {
	const { t } = useTranslation();
	const { chainId, account, library } = useActiveWeb3React();
	const theme = useTheme();
	const params = useParams();
	const presale = usePresale(params?.address);
	const toggleWalletModal = useWalletModalToggle();
	const whitelistTokenBalance = useTokenBalance(account, BalanceToken);
	const buyState = useAccountBuy(params?.address);
	const history = useHistory();

	const [selectedToken, setSelectedToken] = useState(undefined);
	const [baseToken, setBaseToken] = useState(undefined);
	const [totalSupply, setTotalSupply] = useState("0");
	const [investAmount, setInvestAmount] = useState("");

	const approvalAmount = useMemo(() => {
		if (baseToken?.symbol === "WETH" || baseToken?.symbol === "ETH") {
			return new CurrencyAmount(ETHER, UNLIMITED_ALLOWANCE_IN_BASE_UNITS.toString());
		}
		if (baseToken instanceof Token) {
			return new TokenAmount(baseToken, UNLIMITED_ALLOWANCE_IN_BASE_UNITS.toString());
		}
		return undefined;
	}, [baseToken]);

	const [approval, approvalCallback] = useApproveCallback(approvalAmount, params?.address);

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

	useEffect(() => {
		if (presale?.token) {
			const tokenContract = getContract(presale?.token, ERC20_ABI, library, account);
			getTokenInfo(presale?.token, tokenContract)
				.then((res) => {
					setSelectedToken(res);
				})
				.catch((e) => {
					console.log(e);
				});

			tokenContract.totalSupply().then((res) => {
				setTotalSupply(res.toString());
			});
		}
		if (presale?.baseToken) {
			if (presale?.baseToken === LAUNCHPAD_WETH_ADDRESS) {
				setBaseToken(LAUNCHPAD_WETH_TOKEN);
			} else {
				const tokenContract = getContract(presale?.baseToken, ERC20_ABI, library, account);
				getTokenInfo(presale?.baseToken, tokenContract)
					.then((res) => {
						setBaseToken(res);
					})
					.catch((e) => {
						console.log(e);
					});
			}
		}
	}, [presale]);

	useEffect(() => {
		if (presale?.hasOwnProperty("error")) {
			history.push("/launchpad");
		}
	}, [presale]);

	const maxSpend = useMemo(() => {
		if (presale?.spendLimit) {
			return new BigNumber(presale?.spendLimit?.toString() || 0).dividedBy(10 ** baseToken?.decimals).toString();
		}
		return 0;
	}, [presale, baseToken]);

	const softCap = useMemo(() => {
		if (presale?.softCap) {
			return new BigNumber(presale?.softCap?.toString() || 0).dividedBy(10 ** baseToken?.decimals).toString();
		}
		return 0;
	}, [presale, baseToken]);

	const hardCap = useMemo(() => {
		if (presale?.hardCap) {
			return new BigNumber(presale?.hardCap?.toString() || 0).dividedBy(10 ** baseToken?.decimals).toString();
		}
		return 0;
	}, [presale, baseToken]);

	const lockDuration = useMemo(() => {
		if (presale?.lockPeriod) {
			return presale?.lockPeriod?.toString() || 0;
		}
		return 0;
	}, [presale]);

	const presalePrice = useMemo(() => {
		if (presale?.tokenPrice) {
			return new BigNumber(presale?.tokenPrice?.toString() || 0).dividedBy(10 ** baseToken?.decimals).toString();
		}
		return 0;
	}, [presale, baseToken]);

	const listingPrice = useMemo(() => {
		if (presale?.listingPrice) {
			return new BigNumber(presale?.listingPrice?.toString() || 0)
				.dividedBy(10 ** baseToken?.decimals)
				.toString();
		}
		return 0;
	}, [presale, baseToken]);

	const filledPercent = useMemo(() => {
		if (presale?.hardCap && presale?.status?.totalBaseCollected) {
			const hardCap = new BigNumber(presale?.hardCap?.toString() || 0).dividedBy(10 ** baseToken?.decimals);
			const totalBaseCollected = new BigNumber(presale?.status?.totalBaseCollected?.toString() || 0).dividedBy(
				10 ** baseToken?.decimals
			);

			if (hardCap.isEqualTo(ZERO)) {
				return 0;
			}

			return totalBaseCollected.dividedBy(hardCap).times(100).toFixed(0);
		}
		return 0;
	}, [presale, baseToken]);

	const liquidityPercent = useMemo(() => {
		if (presale?.liquidityPercent) {
			return new BigNumber(presale?.liquidityPercent?.toString() || 0).dividedBy(10).toString();
		}
		return 0;
	}, [presale]);

	const transformedTotalSupply = useMemo(() => {
		return new BigNumber(totalSupply).dividedBy(10 ** (selectedToken?.decimals || 18)).toString();
	}, [totalSupply, selectedToken]);

	const enoughBalance = useMemo(() => {
		if (whitelistTokenBalance) {
			const validBalance = new BigNumber(1).times(10 ** BalanceToken.decimals);
			const balance = new BigNumber(whitelistTokenBalance.toFixed()).times(10 ** BalanceToken.decimals);
			if (balance.isGreaterThanOrEqualTo(validBalance)) {
				return true;
			}

			return false;
		}

		return false;
	}, [whitelistTokenBalance]);

	const depositedToken = useMemo(() => {
		if (buyState?.error) {
			return 0;
		}
		if (buyState?.baseDeposited && listingPrice) {
			const baseDeposited = new BigNumber(buyState?.baseDeposited?.toString() || 0).dividedBy(
				10 ** (baseToken?.decimals || 18)
			);
			const receiveEstimated = baseDeposited.times(presalePrice);

			return {
				baseDeposited,
				receiveEstimated,
			};
		}
	}, [buyState, baseToken, listingPrice]);

	const isOwner = useMemo(() => {
		return presale?.owner === account;
	}, [presale?.owner, account]);

	const copyToClipboard = (text) => {
		copy(text);
		toast.success("Copied!");
	};

	const purchaseHandler = () => {
		if (!investAmount || investAmount === "0") {
			toast.error("Please enter an amount");
			return false;
		}

		if (!account || !library || !baseToken) {
			return false;
		}

		if (approval !== 3) {
			toast.error("Please increase allowance to deposit");
			return false;
		}

		const contract = getContract(params?.address, PresaleABI, library, account);

		const args = [new BigNumber(investAmount).times(10 ** baseToken?.decimals).toString()];

		contract.estimateGas
			.userDeposit(...args, {
				value: presale?.presaleInEth
					? new BigNumber(investAmount).times(10 ** baseToken?.decimals).toString()
					: 0,
			})
			.then((res) => {
				contract
					.userDeposit(...args, {
						gasLimit: calculateGasMargin(res),
						value: presale?.presaleInEth
							? new BigNumber(investAmount).times(10 ** baseToken?.decimals).toString()
							: 0,
					})
					.then(() => {
						setInvestAmount("");
						toast.success("Deposited successfully!");
						return true;
					})
					.catch((err) => {
						const serializedError = serializeError(err);
						toast.error(serializedError?.data?.originalError?.error?.message);
						return false;
					});
			})
			.catch((err) => {
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
				return false;
			});
	};

	const withdrawToken = () => {
		if (!account || !library || !baseToken) {
			return false;
		}

		const contract = getContract(params?.address, PresaleABI, library, account);

		contract
			.userWithdrawTokens()
			.then((res) => {
				toast.success("Withdrawn was successful");
				return true;
			})
			.catch((err) => {
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
				return false;
			});
	};

	const withdrawBaseToken = () => {
		if (!account || !library || !baseToken) {
			return false;
		}

		const contract = getContract(params?.address, PresaleABI, library, account);

		contract
			.userWithdrawBaseTokens()
			.then((res) => {
				toast.success("Withdrawn was successful");
				return true;
			})
			.catch((err) => {
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
				return false;
			});
	};

	const withdrawOwnerToken = () => {
		if (!account || !library) {
			return false;
		}

		if (!isOwner) {
			toast.error("Forbidden, You didn't have access to this functionality");
			return false;
		}

		const contract = getContract(params?.address, PresaleABI, library, account);

		contract
			.ownerWithdrawTokens()
			.then((res) => {
				toast.success("Withdrawn was successful");
				return true;
			})
			.catch((err) => {
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
				return false;
			});
	};

	const addLiquidity = () => {
		if (!account || !library) {
			return false;
		}

		const contract = getContract(params?.address, PresaleABI, library, account);

		contract
			.addLiquidity()
			.then((res) => {
				toast.success("Adding liquidity was successful! Please wait until complete LP generation");
				return true;
			})
			.catch((err) => {
				const serializedError = serializeError(err);
				toast.error(serializedError?.data?.originalError?.error?.message);
				return false;
			});
	};

	return (
		<Page title={false} networkSensitive={true}>
			<Row>
				<Col xs={{ span: 12, offset: 0 }} md={{ span: 6, offset: 3 }}>
					<SafetyAlert />
				</Col>
				<Col xs={{ span: 12, offset: 0 }} md={{ span: 6, offset: 3 }}>
					<Card>
						<div className={"d-flex align-items-center justify-content-between mb-3"}>
							<Styled.IconButton to={"/launchpad"}>
								<ArrowLeft color={theme.text1} width={24} height={24} />
							</Styled.IconButton>
							<span
								className={`label label-inline label-sm label-light-${
									presale?.state === 1
										? "primary"
										: presale?.state === 3
										? "danger"
										: presale?.state === 2
										? "success"
										: "warning"
								}`}
							>
								{presale?.state === 1
									? "Live"
									: presale?.state === 3
									? "Failed"
									: presale?.state === 2
									? "Success"
									: "Upcoming"}
							</span>
						</div>

						<div className="d-flex align-items-center">
							<Styled.LogoContainer>
								<Styled.Logo src={Presales?.[params?.address]?.iconURL} alt={selectedToken?.symbol} />
							</Styled.LogoContainer>
							<div className="d-flex align-items-stretch flex-column">
								<Styled.TokenName>{selectedToken?.name || "-"}</Styled.TokenName>
								<div className="d-flex align-items-center mt-2 flex-wrap">
									<Styled.ExternalLink
										className={"mr-2"}
										href={getExplorerLink(chainId, selectedToken?.address, "token")}
									>
										<Styled.LinkText>Explorer</Styled.LinkText>
										<ExternalLinkIcon size={16} />
									</Styled.ExternalLink>
									<Styled.ExternalLink
										className={"mr-2"}
										onClick={copyToClipboard.bind(this, selectedToken?.address)}
									>
										<Styled.LinkText>
											{shortenAddress(selectedToken?.address || "")}
										</Styled.LinkText>
										<Copy size={16} />
									</Styled.ExternalLink>
								</div>
							</div>
						</div>

						<div className={"d-flex align-items-center justify-content-around mt-4 mb-3"}>
							<Styled.DetailsWrapper>
								<Styled.DetailsContainer>
									<Styled.CircleBarPosition>
										<CircleBar
											fill={theme.primary}
											width={40}
											height={40}
											percent={Number(liquidityPercent)}
										/>
									</Styled.CircleBarPosition>
								</Styled.DetailsContainer>
								<Styled.DetailsTitle>
									{liquidityPercent ? `${liquidityPercent}%` : "-"}
								</Styled.DetailsTitle>
								<Styled.DetailsLabel>Lock {LOCK_DURATION?.[lockDuration] || "-"}</Styled.DetailsLabel>
							</Styled.DetailsWrapper>
							<Styled.DetailsWrapper>
								<Styled.DetailsContainer>
									<Styled.CircleBarPosition>
										<CircleBar fill={theme.primary} width={40} height={40} percent={100} />
									</Styled.CircleBarPosition>
								</Styled.DetailsContainer>
								<Styled.DetailsTitle>
									{presale?.status?.buyersCount?.toString() || "-"}
								</Styled.DetailsTitle>
								<Styled.DetailsLabel>Participants</Styled.DetailsLabel>
							</Styled.DetailsWrapper>
							<Styled.DetailsWrapper>
								<Styled.DetailsContainer>
									<Styled.CircleBarPosition>
										<CircleBar
											fill={theme.primary}
											width={40}
											height={40}
											percent={filledPercent}
										/>
									</Styled.CircleBarPosition>
								</Styled.DetailsContainer>
								<Styled.DetailsTitle>
									{filledPercent && !isNaN(filledPercent) ? `${filledPercent}%` : "-"}
								</Styled.DetailsTitle>
								<Styled.DetailsLabel>Filled {baseToken?.symbol}</Styled.DetailsLabel>
							</Styled.DetailsWrapper>
						</div>

						<Tab.Container defaultActiveKey={"presale"}>
							<Styled.CustomNav
								fill
								variant="pills"
								className={"d-flex flex-row align-items-center flex-nowrap"}
							>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="presale">
										<Styled.CustomNavTitle>Presale</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
								<Styled.CustomNavItem className={"flex-grow-1"}>
									<Styled.CustomNavLink eventKey="info">
										<Styled.CustomNavTitle>Info</Styled.CustomNavTitle>
									</Styled.CustomNavLink>
								</Styled.CustomNavItem>
							</Styled.CustomNav>

							<Tab.Content className={"bg-transparent"}>
								<Tab.Pane eventKey="presale">
									{!account ? (
										<div className="d-flex align-items-center justify-content-center">
											<GradientButton className={"btn-lg"} onClick={toggleWalletModal}>
												{t("wallet.connect")}
											</GradientButton>
										</div>
									) : (
										<>
											{presale?.state < 2 && !enoughBalance && (
												<Styled.RowCard>
													<Styled.RowTitle className={"text-center"}>
														Presale Requirements
													</Styled.RowTitle>
													<Styled.RowDesc className={"text-center"}>
														To participate in presale you need to hold at least the
														specified amount of the following token.
													</Styled.RowDesc>
													<div className="d-flex flex-column">
														<Styled.TokenWrapper>
															<CurrencyLogo
																currency={BalanceToken}
																size={24}
																style={{ marginRight: 16 }}
															/>
															<Styled.StyledTokenName className={"mt-0"}>
																8 {BalanceToken.symbol}
															</Styled.StyledTokenName>
														</Styled.TokenWrapper>
													</div>
												</Styled.RowCard>
											)}
											{presale?.state === 2 &&
												depositedToken?.baseDeposited.isGreaterThan(0) &&
												!presale?.status?.lpGenerationComplete && (
													<Styled.RowCard>
														<Row>
															<Col
																xs={12}
																className={
																	"d-flex align-items-center justify-content-center flex-column"
																}
															>
																<Styled.RowTitle className={"text-center mb-2"}>
																	Add Liquidity and Lock in Liquidity pool
																</Styled.RowTitle>
																<Styled.DetailsLabel className={"text-center mb-4"}>
																	By adding the liquidity, the withdrawal option will
																	be enabled.
																</Styled.DetailsLabel>
															</Col>
															<Col
																xs={12}
																className={
																	"d-flex align-items-center justify-content-center"
																}
															>
																<Button
																	className={
																		"flex-grow-1 ml-1 d-flex align-items-center justify-content-center"
																	}
																	variant={"primary"}
																	style={{ height: 56 }}
																	onClick={addLiquidity}
																>
																	Generate liquidity pool
																</Button>
															</Col>
														</Row>
													</Styled.RowCard>
												)}
											{presale?.state === 2 &&
												depositedToken?.baseDeposited.isGreaterThan(0) &&
												presale?.status?.lpGenerationComplete && (
													<Styled.RowCard>
														<Row>
															<Col
																xs={12}
																className={
																	"d-flex align-items-center justify-content-center flex-column"
																}
															>
																<Styled.RowTitle className={"text-center mb-2"}>
																	Withdraw your {selectedToken?.symbol}
																</Styled.RowTitle>
																<Styled.DetailsLabel className={"text-center mb-4"}>
																	You will receive:{" "}
																	{depositedToken?.receiveEstimated?.toString()}{" "}
																	{selectedToken?.symbol} (approximately)
																</Styled.DetailsLabel>
															</Col>
															<Col
																xs={12}
																className={
																	"d-flex align-items-center justify-content-center"
																}
															>
																<Button
																	className={
																		"flex-grow-1 ml-1 d-flex align-items-center justify-content-center"
																	}
																	variant={"primary"}
																	style={{ height: 56 }}
																	onClick={withdrawToken}
																>
																	Withdraw
																</Button>
															</Col>
														</Row>
													</Styled.RowCard>
												)}
											{presale?.state === 3 && depositedToken?.baseDeposited.isGreaterThan(0) && (
												<Styled.RowCard>
													<Row>
														<Col
															xs={12}
															className={
																"d-flex align-items-center justify-content-center flex-column"
															}
														>
															<Styled.RowTitle className={"text-center mb-2"}>
																ILO failed, Withdraw your {baseToken?.symbol}
															</Styled.RowTitle>
															<Styled.DetailsLabel className={"text-center mb-4"}>
																You will receive:{" "}
																{depositedToken?.baseDeposited?.toString()}{" "}
																{baseToken?.symbol} (approximately)
															</Styled.DetailsLabel>
														</Col>
														<Col
															xs={12}
															className={
																"d-flex align-items-center justify-content-center"
															}
														>
															<Button
																className={
																	"flex-grow-1 ml-1 d-flex align-items-center justify-content-center"
																}
																variant={"danger"}
																style={{ height: 56 }}
																onClick={withdrawBaseToken}
															>
																Withdraw
															</Button>
														</Col>
													</Row>
												</Styled.RowCard>
											)}
											{presale?.state === 3 && isOwner && (
												<Styled.RowCard>
													<Row>
														<Col
															xs={12}
															className={
																"d-flex align-items-center justify-content-center flex-column"
															}
														>
															<Styled.RowTitle className={"text-center mb-2"}>
																ILO failed, Withdraw your {baseToken?.symbol} & initial
																Liquidity
															</Styled.RowTitle>
														</Col>
														<Col
															xs={12}
															className={
																"d-flex align-items-center justify-content-center"
															}
														>
															<Button
																className={
																	"flex-grow-1 ml-1 d-flex align-items-center justify-content-center"
																}
																variant={"danger"}
																style={{ height: 56 }}
																onClick={withdrawOwnerToken}
															>
																Withdraw
															</Button>
														</Col>
													</Row>
												</Styled.RowCard>
											)}
											{presale?.state === 1 && enoughBalance && (
												<Styled.RowCard>
													<Row>
														<Col xs={12}>
															<div className="d-flex align-items-center mb-3">
																<Styled.DetailsContainer className={"mb-0 mr-3"}>
																	<CircleBar
																		fill={theme.primary}
																		width={40}
																		height={40}
																		percent={100}
																	/>
																</Styled.DetailsContainer>
																<div className="d-flex flex-column">
																	<Styled.DetailsLabel className={"mb-1"}>
																		Your spent allowance
																	</Styled.DetailsLabel>
																	<Styled.DetailsTitleSimple className="mb-0">
																		{maxSpend || "-"} {baseToken?.symbol || "-"}
																	</Styled.DetailsTitleSimple>
																</div>
															</div>
														</Col>
														<Col xs={12}>
															<Styled.RowTitle className={"text-center"}>
																Spend how much {baseToken?.symbol || "-"}?
															</Styled.RowTitle>
														</Col>
														<Col xs={12}>
															<CurrencyInputPanel
																label={`From (${t("estimated")})`}
																value={investAmount}
																showMaxButton={true}
																currency={
																	baseToken?.symbol === "WETH" ||
																	baseToken?.symbol === "ETH"
																		? ETHER
																		: baseToken
																}
																onUserInput={setInvestAmount}
																onMax={setInvestAmount}
																disableCurrencySelect={true}
																id="invest-presale"
																withoutMargin={true}
															/>
														</Col>
														<Col
															xs={12}
															className={
																"d-flex align-items-center justify-content-between px-4"
															}
														>
															<Styled.DetailsLabel>You will get</Styled.DetailsLabel>
															<Styled.DetailsTitleSimple
																style={{
																	fontSize: 14,
																	marginBottom: 0,
																}}
															>
																{(investAmount * presalePrice).toFixed(4)}{" "}
																{selectedToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
														</Col>
														<Col xs={12}>
															<Styled.Description className={"text-center mt-5"}>
																Please be aware if the token you are purchasing has
																deflationary mechanisms such as burn on transfer you may
																receive less than the amount stated. <br />
																Your tokens will be locked in the contract until the
																presale has concluded.
															</Styled.Description>
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
																		id={"approval-loading"}
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
																onClick={purchaseHandler}
															>
																Purchase
															</Button>
														</Col>
													</Row>
												</Styled.RowCard>
											)}
										</>
									)}
								</Tab.Pane>
								<Tab.Pane eventKey="info">
									<Styled.RowCard>
										<Row>
											<Col xs={12}>
												<Styled.RowTitle className={"text-center"}>
													{selectedToken?.symbol || "-"} Tokenomics
												</Styled.RowTitle>
												<Styled.RowDesc className={"text-center"}>
													Total supply: {transformedTotalSupply}{" "}
													{selectedToken?.symbol || "-"}
												</Styled.RowDesc>
											</Col>
											<Col xs={12} className={"mt-4 mb-3"}>
												<Styled.RowTitle className={"text-center"}>
													Presale info
												</Styled.RowTitle>
												<Styled.RowDesc className={"mb-1"}>
													Start block: {presale?.startBlock?.toString() || "-"}
												</Styled.RowDesc>
												<Styled.RowDesc className={"mb-1"}>
													End block: {presale?.endBlock?.toString() || "-"}
												</Styled.RowDesc>
											</Col>
											<Col xs={12}>
												<ListGroup className={"bg-transparent"}>
													<Styled.ListItem>
														<Lock size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{liquidityPercent ? `${liquidityPercent}%` : "-"}{" "}
																{baseToken?.symbol} raised liquidity lock
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>
																{LOCK_DURATION?.[lockDuration] || "-"} lock duration
															</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Users size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{presale?.status?.whitelistOnly ? "Private" : "Public"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>
																{presale?.status?.whitelistOnly
																	? "Whitelisted only"
																	: "Open to everyone"}
															</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Info size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{softCap || "-"} {baseToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>Softcap</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Info size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{hardCap || "-"} {baseToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>Hardcap</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Info size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{maxSpend || "-"} {baseToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>
																Max spend per account
															</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Info size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{presalePrice} per {baseToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>Presale price</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
													<Styled.ListItem>
														<Info size={32} style={{ marginRight: 16 }} />
														<div className="d-flex flex-column justify-content-between">
															<Styled.DetailsTitleSimple style={{ fontSize: 16 }}>
																{listingPrice} per {baseToken?.symbol || "-"}
															</Styled.DetailsTitleSimple>
															<Styled.DetailsLabel>Listing price</Styled.DetailsLabel>
														</div>
													</Styled.ListItem>
												</ListGroup>
											</Col>
										</Row>
									</Styled.RowCard>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};

export default LaunchpadItem;
