import React from "react";
import { _numeral } from "../../../lib/utils";
import * as Styled from './styleds';

export const VoteItem = (props) => {
	return (
		<Styled.Wrapper>
			<td>
				<div className="d-flex align-items-center">
					<div className={"d-none d-lg-block"}>
						<Styled.ModifiedJazzicon address={props.address} />
					</div>
					<Styled.Address>
						{props.address.slice(0, 6)}...{props.address.slice(-4)}
					</Styled.Address>
				</div>
			</td>
			<td>
				<Styled.Text className={"d-none d-lg-flex"}>{props.vote}</Styled.Text>
			</td>
			<td>
				<Styled.Text>
					{_numeral(props.score)} {props.symbol}
				</Styled.Text>
			</td>
		</Styled.Wrapper>
	);
};
