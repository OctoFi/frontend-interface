import React, { useEffect, useMemo, useState } from "react";
import { Token } from "@uniswap/sdk";
import BigNumber from "bignumber.js";

import { ZERO } from "../../constants";
import { ERC20_ABI } from "../../constants/abis/erc20";
import { LAUNCHPAD_WETH_ADDRESS, LAUNCHPAD_WETH_TOKEN, LOCK_DURATION } from "../../constants/launchpad";
import Presales from "../../constants/presales.json";
import { useActiveWeb3React } from "../../hooks";
import { getContract } from "../../utils";
import * as Styled from "./styleds";

export interface LaunchpadCardProps {
	address?: any;
	presale?: any;
}

export const LaunchpadCard = ({ address, presale }: LaunchpadCardProps) => {
	const { chainId, library, account } = useActiveWeb3React();
	const [selectedToken, setSelectedToken] = useState(undefined);
	const [baseToken, setBaseToken] = useState(undefined);

	useEffect(() => {
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

		if (presale?.token) {
			const tokenContract = getContract(presale?.token, ERC20_ABI, library, account);
			getTokenInfo(presale?.token, tokenContract)
				.then((res) => {
					setSelectedToken(res);
				})
				.catch((e) => {
					console.log(e);
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

	const lockDuration = useMemo(() => {
		if (presale?.lockPeriod) {
			return presale?.lockPeriod?.toString() || 0;
		}
		return 0;
	}, [presale]);

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

	return (
		<Styled.Wrapper to={`/launchpad/${address}`}>
			<Styled.Row>
				<div className="d-flex align-items-center">
					<Styled.LogoContainer>
						<Styled.Logo src={Presales?.[address]?.iconURL} alt={selectedToken?.name} />
					</Styled.LogoContainer>
					<Styled.TokenName>{selectedToken?.name || "-"}</Styled.TokenName>
				</div>
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
			</Styled.Row>

			<Styled.Row>
				<Styled.Pair>
					{baseToken?.symbol} / {selectedToken?.symbol}
				</Styled.Pair>
				<Styled.LockDuration>{LOCK_DURATION?.[lockDuration] || "-"} lock</Styled.LockDuration>
			</Styled.Row>

			<Styled.Row>
				<div className="d-flex flex-column align-items-start">
					<Styled.Label align={"left"}>Liquidity lock</Styled.Label>
					<Styled.Value align={"left"}>
						{Math.floor(Number(presale?.liquidityPercent?.toString() || 0) / 10)}%
					</Styled.Value>
				</div>
				<div className="d-flex flex-column align-items-center">
					<Styled.Label>Max spend</Styled.Label>
					<Styled.Value>
						{isNaN(maxSpend) ? "-" : maxSpend} {baseToken?.symbol || ""}
					</Styled.Value>
				</div>
				<div className="d-flex flex-column align-items-end">
					<Styled.Label align={"right"}>Soft cap</Styled.Label>
					<Styled.Value align={"right"}>
						{isNaN(softCap) ? "-" : softCap} {baseToken?.symbol || ""}
					</Styled.Value>
				</div>
			</Styled.Row>

			<Styled.Row>
				<Styled.ResultProgress className={`progress progress-xs w-100`}>
					<Styled.ResultProgressBar
						role="progressbar"
						aria-valuenow={filledPercent}
						aria-valuemin="0"
						aria-valuemax="100"
						style={{
							width: `${filledPercent}%`,
						}}
					/>
				</Styled.ResultProgress>
			</Styled.Row>
		</Styled.Wrapper>
	);
};
