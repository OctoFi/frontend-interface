import { useTranslation } from "react-i18next";
import moment from "moment";
import { useLogo } from "../../state/governance/hooks";
import Card from "../../components/Card";
import * as Styled from "./styleds";

export type VoteInformationProps = {
	proposal: any;
	space: any;
	id: any;
};

const Strategy = ({ index, id, symbol }: { index: number; id: string; symbol: string }) => {
	return (
		<div className="d-flex align-items-center ms-3">
			<Styled.Logo src={useLogo(id, index)} size={30} />
			<Styled.TokenValue>{symbol}</Styled.TokenValue>
		</div>
	);
};

export const VoteInformation = ({ proposal, space, id }: VoteInformationProps) => {
	const { t } = useTranslation();

	return (
		<Card
			header={
				<div className="d-flex flex-column justify-content-around">
					<Styled.BoxHeader>
						<Styled.BoxTitle>{t("information")}</Styled.BoxTitle>
					</Styled.BoxHeader>
				</div>
			}
		>
			<div className="d-flex flex-column justify-content-start">
				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>{t("importList.tokens")}</Styled.InfoDesc>
					<div>
						<div className="d-flex align-items-center justify-content-end">
							{space.strategies.map((s: any, index: number) => {
								return (
									<Strategy
										key={`space-strategy-${index}`}
										symbol={s.params.symbol}
										id={id}
										index={index}
									/>
								);
							})}
						</div>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>{t("author")}</Styled.InfoDesc>
					<div>
						<div className="d-flex align-items-center">
							<Styled.ModifiedJazzicon address={proposal.address} />
							<Styled.AuthorLink
								href={`https://etherscan.io/address/${proposal.address}`}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{proposal.address.slice(0, 6)}...
								{proposal.address.slice(-4)}
							</Styled.AuthorLink>
						</div>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>IPFS</Styled.InfoDesc>
					<div>
						<Styled.AuthorLink
							href={`https://ipfs.io/ipfs/${proposal.authorIpfsHash}`}
							target={"_blank"}
							rel={"noopener noreferrer"}
						>
							#{proposal.authorIpfsHash.slice(0, 7)}
						</Styled.AuthorLink>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>{t("startDate")}</Styled.InfoDesc>
					<div>
						<Styled.InfoText fontWeight={400}>
							{proposal && moment(proposal.msg.payload.start * 1e3).format("YYYY/MM/DD hh:mm")}
						</Styled.InfoText>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>{t("endDate")}</Styled.InfoDesc>
					<div>
						<Styled.InfoText fontWeight={400}>
							{proposal && moment(proposal.msg.payload.end * 1e3).format("YYYY/MM/DD hh:mm")}
						</Styled.InfoText>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>{t("token")}</Styled.InfoDesc>
					<div>
						<Styled.InfoText>{proposal.address.slice(0, 6)}</Styled.InfoText>
					</div>
				</Styled.Wrapper>

				<Styled.Wrapper className="d-flex align-items-center justify-content-between">
					<Styled.InfoDesc>Snapshot</Styled.InfoDesc>
					<div>
						<Styled.AuthorLink
							href={`https://etherscan.io/block/${proposal.msg.payload.snapshot}`}
							target={"_blank"}
							rel={"noopener noreferrer"}
						>
							{proposal.msg.payload.snapshot}
						</Styled.AuthorLink>
					</div>
				</Styled.Wrapper>
			</div>
		</Card>
	);
};
