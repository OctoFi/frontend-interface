import { useState } from "react";
import { Token, Currency } from "@uniswap/sdk";
import styled from "styled-components";
import { ArrowLeft, AlertTriangle } from "react-feather";
import { transparentize } from "polished";
import { useTranslation } from "react-i18next";
import { Button, CloseButton } from "react-bootstrap";
import { TYPE } from "../../theme";
import Card from "../Card";
import { AutoColumn } from "../Column";
import { RowBetween, RowFixed, AutoRow } from "../Row";
import CurrencyLogo from "../Logo/CurrencyLogo";
import useTheme from "../../hooks/useTheme";
import { useAddUserToken } from "../../state/user/hooks";
import { getExplorerLink } from "../../utils/explorer";
import { useActiveWeb3React } from "../../hooks";
import { ExternalLink } from "../../theme";
import { useCombinedInactiveList } from "../../state/lists/hooks";
import ListLogo from "../Logo/ListLogo";
import { PaddedColumn, Checkbox } from "./styleds";

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	overflow: auto;
`;

const WarningWrapper = styled(Card)<{ highWarning: boolean }>`
	background-color: ${({ theme, highWarning }) =>
		highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.warning)};
	width: fit-content;
`;

const AddressText = styled(TYPE.Blue)`
	font-size: 12px;

	${({ theme }) => theme.mediaWidth.upToSmall`
		font-size: 10px;
	`}
`;

const SectionBreak = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.borderColor};
`;

interface ImportProps {
	tokens: Token[];
	onBack?: () => void;
	onDismiss?: () => void;
	handleCurrencySelect?: (currency: Currency) => void;
}

export function ImportToken({ tokens, onBack, onDismiss, handleCurrencySelect }: ImportProps) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { chainId } = useActiveWeb3React();

	const [confirmed, setConfirmed] = useState(false);

	const addToken = useAddUserToken();

	// use for showing import source on inactive tokens
	const inactiveTokenList = useCombinedInactiveList();

	// higher warning severity if either is not on a list
	const fromLists =
		(chainId && inactiveTokenList?.[chainId]?.[tokens[0]?.address]?.list) ||
		(chainId && inactiveTokenList?.[chainId]?.[tokens[1]?.address]?.list);

	return (
		<Wrapper>
			<PaddedColumn gap="14px" style={{ width: "100%", flex: "1 1" }}>
				<RowBetween>
					{onBack ? <ArrowLeft style={{ cursor: "pointer" }} onClick={onBack} /> : <div></div>}
					<TYPE.MediumHeader>Import {tokens.length > 1 ? "Tokens" : "Token"}</TYPE.MediumHeader>
					{onDismiss ? <CloseButton onClick={onDismiss} /> : <div></div>}
				</RowBetween>
			</PaddedColumn>
			<SectionBreak />
			<PaddedColumn gap="md">
				{tokens.map((token) => {
					const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list;
					return (
						<Card
							backgroundColor={theme.bg1}
							key={"import" + token.address}
							className=".token-warning-container"
						>
							<AutoColumn gap="10px">
								<AutoRow align="center">
									<CurrencyLogo currency={token} size={24} />
									<TYPE.Body ml="8px" mr="8px" fontWeight={500}>
										{token.symbol}
									</TYPE.Body>
									<TYPE.DarkGray fontWeight={300}>{token.name}</TYPE.DarkGray>
								</AutoRow>
								{chainId && (
									<ExternalLink href={getExplorerLink(chainId, token.address, "address")}>
										<AddressText>{token.address}</AddressText>
									</ExternalLink>
								)}
								{list !== undefined ? (
									<RowFixed>
										{list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
										<TYPE.Small ml="6px" color={theme.text2}>
											via {list.name}
										</TYPE.Small>
									</RowFixed>
								) : (
									<WarningWrapper borderRadius="4px" padding="4px" highWarning={true}>
										<RowFixed>
											<AlertTriangle stroke={theme.red1} size="10px" />
											<TYPE.Body color={theme.red1} ml="4px" fontSize="10px" fontWeight={500}>
												{t("importToken.unknownSource")}
											</TYPE.Body>
										</RowFixed>
									</WarningWrapper>
								)}
							</AutoColumn>
						</Card>
					);
				})}

				<Card
					style={{
						backgroundColor: fromLists
							? transparentize(0.8, theme.warning)
							: transparentize(0.8, theme.red1),
					}}
				>
					<AutoColumn justify="center" style={{ textAlign: "center", gap: "16px", marginBottom: "12px" }}>
						<AlertTriangle stroke={fromLists ? theme.warning : theme.red1} size={32} />
						<TYPE.Body fontWeight={600} fontSize={20} color={fromLists ? theme.warning : theme.red1}>
							{t("importToken.tradeRisk")}
						</TYPE.Body>
					</AutoColumn>

					<AutoColumn style={{ textAlign: "center", gap: "16px", marginBottom: "12px" }}>
						<TYPE.Body fontWeight={400} color={fromLists ? theme.warning : theme.red1}>
							{t("importToken.tokenWarning")}
						</TYPE.Body>
						<TYPE.Body fontWeight={600} color={fromLists ? theme.warning : theme.red1}>
							{t("importToken.cantSell")}
						</TYPE.Body>
					</AutoColumn>
					<AutoRow justify="center" style={{ cursor: "pointer" }} onClick={() => setConfirmed(!confirmed)}>
						<Checkbox
							className=".understand-checkbox"
							name="confirmed"
							type="checkbox"
							checked={confirmed}
							onChange={() => setConfirmed(!confirmed)}
						/>
						<TYPE.Body
							ml="10px"
							fontSize="16px"
							color={fromLists ? theme.warning : theme.red1}
							fontWeight={500}
						>
							{t("importToken.understand")}
						</TYPE.Body>
					</AutoRow>
				</Card>
				<Button
					variant="primary"
					disabled={!confirmed}
					onClick={() => {
						tokens.map((token) => addToken(token));
						handleCurrencySelect && handleCurrencySelect(tokens[0]);
					}}
				>
					{t("import")}
				</Button>
			</PaddedColumn>
		</Wrapper>
	);
}
