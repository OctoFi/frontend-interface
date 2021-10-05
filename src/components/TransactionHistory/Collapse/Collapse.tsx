import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import { ChevronRight, Download, Upload, FileText, Repeat } from "react-feather";
import { ETHER, Token } from "@uniswap/sdk";
import moment from "moment";

import useTheme from "../../../hooks/useTheme";
import CurrencyLogo from "../../Logo/CurrencyLogo";
import * as Styled from "./styleds";
import { getExplorerLink } from "../../../utils/explorer";

const hashText = (hash: string) => {
	return hash.slice(0, 6) + "..." + hash.slice(-4);
};

export interface PureCollapseProps {
	eventKey: string;
	tokens: any;
	chainId: any;
	txn?: any;
}

export const PureCollapse = ({ eventKey, tokens, chainId, txn }: PureCollapseProps) => {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Accordion.Item eventKey={eventKey} className="border-0">
			<Accordion.Button className="bg-dark text-white">
				<div className="d-flex align-items-center justify-content-evenly flex-fill">
					<div className="d-flex align-items-center gap-3">
						<Styled.TypeIcon>
							{tokens.ref.value === "0" && txn.length === 1 ? (
								<FileText size={20} color={theme.primary} />
							) : tokens.from.length === 1 && tokens.to.length === 1 ? (
								<Repeat size={20} color={theme.primary} />
							) : (tokens.from.length > 1 && tokens.to.length === 1) ||
							  (tokens.from.length === 1 && tokens.to.length > 1) ? (
								<Upload size={20} color={theme.primary} />
							) : (
								<Download size={20} color={theme.primary} />
							)}
						</Styled.TypeIcon>

						<div className="fs-6">
							<p className="mb-0">
								{tokens.ref.value === "0" && txn.length === 1
									? "Contracts / Approval"
									: tokens.from.length === 1 && tokens.to.length === 1
									? "Trade"
									: (tokens.from.length > 1 && tokens.to.length === 1) ||
									  (tokens.from.length === 1 && tokens.to.length > 1)
									? "Add Liquidity"
									: tokens.from.length > 1 || tokens.to.length > 1
									? "Swap"
									: "Receive"}
							</p>
							<p className="mb-0 opacity-50">{moment(tokens.ref.timeStamp, "X").format("hh:MM A")}</p>
						</div>
					</div>

					<div className="d-flex align-items-center justify-content-between gap-2">
						{tokens.from.length > 0 && (
							<Styled.TradeSide className="d-flex align-items-center">
								{tokens.from.map((token: any, index: number) => {
									if (token.contractAddress && token.tokenDecimal) {
										const currency = new Token(
											chainId,
											token.contractAddress,
											Number(token.tokenDecimal) || 18,
											token.tokenSymbol,
											token.tokenName
										);
										return (
											<Styled.LogoContainer key={`${token}-${index}`}>
												<CurrencyLogo currency={currency} />
											</Styled.LogoContainer>
										);
									} else {
										return (
											<Styled.LogoContainer key={`${token}-${index}`}>
												<CurrencyLogo currency={ETHER} />
											</Styled.LogoContainer>
										);
									}
								})}
								<div className="d-flex justify-content-center flex-column" style={{ marginLeft: 5 }}>
									<p className="mb-0">
										{tokens.from.length !== 1 ? (
											<>
												<span>{tokens.from.length} </span>
												<span className="text-muted">{t("tokens.assets")}</span>
											</>
										) : (
											`-${
												tokens.from[0].tokenDecimal
													? (
															Number(tokens.from[0].value) /
															10 ** Number(tokens.from[0].tokenDecimal || 18)
													  ).toFixed(4)
													: (Number(tokens.from[0].value) / 10 ** 18).toFixed(4)
											} ${tokens.from[0].tokenSymbol || "ETH"}`
										)}
									</p>
									{tokens.from.length === 1 && (
										<p className="mb-0 text-muted">
											{tokens.from[0].contractAddress
												? hashText(tokens.from[0].contractAddress)
												: "Ethereum"}
										</p>
									)}
								</div>
							</Styled.TradeSide>
						)}

						{tokens.from.length > 0 && tokens.to.length > 0 && (
							<ChevronRight size={24} color={theme.text1} />
						)}

						{tokens.to.length > 0 && (
							<Styled.TradeSide className="d-flex align-items-center gap-3">
								{tokens.to.map((token: any, index: number) => {
									if (token.contractAddress && token.tokenDecimal) {
										const currency = new Token(
											chainId,
											token.contractAddress,
											Number(token.tokenDecimal) || 18,
											token.tokenSymbol,
											token.tokenName
										);

										return (
											<Styled.LogoContainer key={`${token}-${index}`}>
												<CurrencyLogo currency={currency} />
											</Styled.LogoContainer>
										);
									} else {
										return (
											<Styled.LogoContainer key={`${token}-${index}`}>
												<CurrencyLogo currency={ETHER} />
											</Styled.LogoContainer>
										);
									}
								})}

								<div className="">
									<p className="mb-0">
										{tokens.to.length !== 1 ? (
											<>
												<span>{tokens.to.length} </span>
												<span className="text-muted">{t("tokens.assets")}</span>
											</>
										) : (
											`+${
												tokens.to[0].tokenDecimal
													? (
															Number(tokens.to[0].value) /
															10 ** Number(tokens.to[0].tokenDecimal || 18)
													  ).toFixed(4)
													: (Number(tokens.to[0].value) / 10 ** 18).toFixed(4)
											} ${tokens.to[0].tokenSymbol || "ETH"}`
										)}
									</p>
									{tokens.to.length === 1 && (
										<p className="mb-0 text-muted">
											{tokens.to[0].contractAddress
												? hashText(tokens.to[0].contractAddress)
												: "Ethereum"}
										</p>
									)}
								</div>
							</Styled.TradeSide>
						)}
					</div>

					<div className="me-2">
						<p className="mb-0 text-muted">{tokens.from.length > 0 ? "Application" : "From"}</p>
						<p className="mb-0">
							{tokens.from.length > 0
								? hashText(tokens.from[0].to || tokens.from[0].contractAddress)
								: tokens.to.length > 0
								? hashText(tokens.to[0].from || tokens.to[0].contractAddress)
								: ""}
						</p>
					</div>
				</div>
			</Accordion.Button>

			<Accordion.Body className="bg-dark">
				{tokens.from.length > 0 && tokens.to.length > 0 ? (
					<>
						<Styled.Separator />
						<Styled.Body className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center">
							<Styled.BodyInside className="d-flex flex-column justify-content-center">
								{tokens.from.map((token: any, index: number) => {
									const currency =
										token.contractAddress && token.tokenDecimal
											? new Token(
													chainId,
													token.contractAddress,
													Number(token.tokenDecimal) || 18,
													token.tokenSymbol,
													token.tokenName
											  )
											: ETHER;
									return (
										<Styled.BodyToken key={`${token}-${index}`}>
											<CurrencyLogo currency={currency} size={36} />
											<div
												className="d-flex justify-content-center flex-column"
												style={{ marginLeft: 30 }}
											>
												<p className="mb-0">{`-${
													token.contractAddress
														? (
																Number(token.value) /
																10 ** Number(token.tokenDecimal || 18)
														  ).toFixed(4)
														: (Number(token.value) / 10 ** 18).toFixed(4)
												} ${token.tokenSymbol || "ETH"}`}</p>
												<p className="mb-0 text-muted">
													{token.contractAddress
														? hashText(token.contractAddress)
														: "Ethereum"}
												</p>
											</div>
										</Styled.BodyToken>
									);
								})}
							</Styled.BodyInside>

							<Styled.VerticalSeparator>
								<Styled.PrimaryCircle className={"d-none d-lg-flex"}>
									<ChevronRight size={16} color={theme.primary} />
								</Styled.PrimaryCircle>
							</Styled.VerticalSeparator>

							<Styled.ReceivedCoins>
								{tokens.to.map((token: any, index: number) => {
									const currency =
										token.contractAddress && token.tokenDecimal
											? new Token(
													chainId,
													token.contractAddress,
													Number(token.tokenDecimal) || 18,
													token.tokenSymbol,
													token.tokenName
											  )
											: ETHER;
									return (
										<Styled.BodyToken key={`${token}-${index}`}>
											<CurrencyLogo currency={currency} size={36} />
											<div
												className="d-flex justify-content-center flex-column"
												style={{ marginLeft: 30 }}
											>
												<p className="mb-0">{`+${
													token.contractAddress
														? (
																Number(token.value) /
																10 ** Number(token.tokenDecimal || 18)
														  ).toFixed(4)
														: (Number(token.value) / 10 ** 18).toFixed(4)
												} ${token.tokenSymbol || "ETH"}`}</p>
												<p className="mb-0 text-muted">
													{token.contractAddress
														? hashText(token.contractAddress)
														: "Ethereum"}
												</p>
											</div>
										</Styled.BodyToken>
									);
								})}
							</Styled.ReceivedCoins>

							<Styled.VerticalSeparator />

							<Styled.BodyInside className="d-flex flex-column justify-content-between">
								<Styled.Details vertical={true}>
									<Styled.DescTitle>{t("pools.fee")}</Styled.DescTitle>
									<Styled.DescValue>
										{((tokens.ref.gasUsed * tokens.ref.gasPrice) / 10 ** 18).toFixed(6)} ETH
									</Styled.DescValue>
								</Styled.Details>
								<Styled.Details vertical={true}>
									<Styled.DescTitle>{t("blockNumber")}</Styled.DescTitle>
									<Styled.DescValue>{tokens.ref.blockNumber}</Styled.DescValue>
								</Styled.Details>
								<Styled.Details vertical={true}>
									<Styled.DescTitle>{t("transactionHash")}</Styled.DescTitle>
									<Styled.DescAnchor
										href={getExplorerLink(chainId, tokens.ref.hash, "transaction")}
										target={"_blank"}
										rel={"noopener noreferrer"}
									>
										{tokens.ref.hash.slice(0, 10)}...{tokens.ref.hash.slice(-8)} ↗
									</Styled.DescAnchor>
								</Styled.Details>
							</Styled.BodyInside>
						</Styled.Body>
					</>
				) : (
					<Styled.Footer className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between">
						<Styled.Details>
							<Styled.DescTitle>{t("pools.fee")}</Styled.DescTitle>
							<Styled.DescValue>
								{((tokens.ref.gasUsed * tokens.ref.gasPrice) / 10 ** 18).toFixed(6)} ETH
							</Styled.DescValue>
						</Styled.Details>
						<Styled.Details>
							<Styled.DescTitle>{t("blockNumber")}</Styled.DescTitle>
							<Styled.DescValue>{tokens.ref.blockNumber}</Styled.DescValue>
						</Styled.Details>
						<Styled.Details>
							<Styled.DescTitle>{t("transactionHash")}</Styled.DescTitle>
							<Styled.DescAnchor
								href={getExplorerLink(chainId, tokens.ref.hash, "transaction")}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{tokens.ref.hash.slice(0, 10)}...{tokens.ref.hash.slice(-8)} ↗
							</Styled.DescAnchor>
						</Styled.Details>
					</Styled.Footer>
				)}
			</Accordion.Body>
		</Accordion.Item>
	);
};
