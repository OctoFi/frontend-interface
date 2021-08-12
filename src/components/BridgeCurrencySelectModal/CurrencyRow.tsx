import { Spinner } from "react-bootstrap";
import { Text } from "rebass";
import { useActiveWeb3React } from "../../hooks";
import { TYPE } from "../../theme";
import Column from "../Column";
import { RowFixed } from "../Row";
import TokenLogo from "../Logo/CrossTokenLogo";
import * as Styled from "./styleds";

export interface CurrencyRowProps {
	currency?: any;
	onSelect?: any;
	urlAdded?: any;
	userAdded?: any;
	style?: any;
}

export const CurrencyRow = ({ currency, onSelect, urlAdded, userAdded, style }: CurrencyRowProps) => {
	const { account } = useActiveWeb3React();

	return (
		<Styled.MenuItem style={style} className={`cross-token-item-${currency.symbol}`} onClick={onSelect}>
			<TokenLogo address={currency.symbol} size={"24px"} />
			<Column>
				<Text title={currency.name} fontWeight={500}>
					{currency.symbol}
				</Text>
				<TYPE.DarkGray ml="0px" fontSize={"12px"} fontWeight={300}>
					{currency.name} {userAdded && "• Added by user"}
					{urlAdded && "• Added by url"}
				</TYPE.DarkGray>
			</Column>
			<RowFixed style={{ justifySelf: "flex-end" }}>
				{currency.balance ? (
					<Styled.BalanceText>{currency.balance}</Styled.BalanceText>
				) : account ? (
					<Spinner animation="border" />
				) : (
					"-"
				)}
			</RowFixed>
		</Styled.MenuItem>
	);
};
