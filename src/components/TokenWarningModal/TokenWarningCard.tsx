import React, { useMemo } from "react";
import { Token } from "@uniswap/sdk";
import { useActiveWeb3React } from "../../hooks";
import { useAllTokens } from "../../hooks/Tokens";
import { ExternalLink, TYPE } from "../../theme";
import { shortenAddress } from "../../utils";
import { getExplorerLink } from "../../utils/explorer";
import CurrencyLogo from "../Logo/CurrencyLogo";
import { AutoColumn } from "../Column";
import { AutoRow } from "../Row";
import * as Styled from "./styleds";

interface TokenWarningCardProps {
	token?: Token;
}

export const TokenWarningCard = ({ token }: TokenWarningCardProps) => {
	const { chainId } = useActiveWeb3React();

	const tokenSymbol = token?.symbol?.toLowerCase() ?? "";
	const tokenName = token?.name?.toLowerCase() ?? "";

	const allTokens = useAllTokens();

	const duplicateNameOrSymbol = useMemo(() => {
		if (!token || !chainId) return false;

		return Object.keys(allTokens).some((tokenAddress) => {
			const userToken = allTokens[tokenAddress];
			if (userToken.equals(token)) {
				return false;
			}
			return userToken.symbol?.toLowerCase() === tokenSymbol || userToken.name?.toLowerCase() === tokenName;
		});
	}, [token, chainId, allTokens, tokenSymbol, tokenName]);

	if (!token) return null;

	return (
		<Styled.Wrapper error={duplicateNameOrSymbol}>
			<AutoRow gap="6px">
				<AutoColumn gap="24px">
					<CurrencyLogo currency={token} size={16} />
					<div> </div>
				</AutoColumn>
				<AutoColumn gap="10px" justify="flex-start">
					<TYPE.Main>
						{token && token.name && token.symbol && token.name !== token.symbol
							? `${token.name} (${token.symbol})`
							: token.name || token.symbol}{" "}
					</TYPE.Main>
					{chainId && (
						<ExternalLink
							style={{ fontWeight: 400 }}
							href={getExplorerLink(chainId, token.address, "token")}
						>
							<TYPE.Blue title={token.address}>
								{shortenAddress(token.address)} (View on explorer)
							</TYPE.Blue>
						</ExternalLink>
					)}
				</AutoColumn>
			</AutoRow>
		</Styled.Wrapper>
	);
};
