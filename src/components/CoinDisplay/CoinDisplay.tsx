import Skeleton from "react-loading-skeleton";
import { isMobile } from "react-device-detect";
import * as Styled from "./styleds";
import CurrencyLogo from "../Logo/CurrencyLogo";

// TODO: update instances to use just currency prop
export interface CoinDisplayProps {
	currency?: any;
	name?: string;
	symbol?: string;
	image?: string;
}

export const CoinDisplay = ({ currency, name, symbol, image }: CoinDisplayProps) => {
	return (
		<div className="d-flex align-items-center gap-3">
			{currency ? (
				<CurrencyLogo currency={currency} />
			) : image ? (
				<Styled.CoinIcon src={image} alt={name || symbol} />
			) : (
				<Skeleton
					width={isMobile ? 24 : 32}
					height={isMobile ? 24 : 32}
					circle={true}
					className={isMobile ? "me-2" : "me-3"}
				/>
			)}

			<div className="d-flex flex-column">
				{name && <Styled.CoinName>{name}</Styled.CoinName>}
				{symbol && <Styled.CoinSymbol>{symbol}</Styled.CoinSymbol>}
			</div>
		</div>
	);
};
