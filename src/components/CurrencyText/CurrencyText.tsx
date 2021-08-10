import { Asterisk } from "react-bootstrap-icons";
import * as Styled from "./styleds";

export interface PureCurrencyTextProps {
	symbol?: string;
	value: string;
	separate?: boolean;
	hide?: boolean;
}

export const PureCurrencyText = ({ symbol = "$", value, separate = false, hide = false }: PureCurrencyTextProps) => {
	if (hide) {
		return (
			<span>
				{[0, 1, 2].map((idx) => {
					return <Asterisk key={idx} size={12} className="text-muted" />;
				})}
			</span>
		);
	}

	if (separate) {
		const splitedValue = value.split(".");
		return (
			<span>
				{symbol + splitedValue[0]}
				<Styled.Floats>.{splitedValue[1]}</Styled.Floats>
			</span>
		);
	} else {
		return <span>{symbol + value}</span>;
	}
};
