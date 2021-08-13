import { _numeral } from "../../../lib/utils";
import * as Styled from "./styleds";

export interface VoteItemProps {
	address?: any;
	vote?: any;
	score?: any;
	symbol?: any;
}

export const VoteItem = ({ address, vote, score, symbol }: VoteItemProps) => {
	return (
		<Styled.Wrapper>
			<td>
				<div className="d-flex align-items-center">
					<div className={"d-none d-lg-block"}>
						<Styled.ModifiedJazzicon address={address} />
					</div>
					<Styled.Address>
						{address.slice(0, 6)}...{address.slice(-4)}
					</Styled.Address>
				</div>
			</td>
			<td>
				<Styled.Text className={"d-none d-lg-flex"}>{vote}</Styled.Text>
			</td>
			<td>
				<Styled.Text>
					{_numeral(score)} {symbol}
				</Styled.Text>
			</td>
		</Styled.Wrapper>
	);
};
