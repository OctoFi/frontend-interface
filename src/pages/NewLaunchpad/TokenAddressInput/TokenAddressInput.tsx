import { useCallback } from "react";
import { PATTERN } from "../../../constants";
import { AutoColumn } from "../../../components/Column";
import { RowBetween } from "../../../components/Row";
import * as Styled from "./styleds";

export interface TokenAddressInputProps {
	id: string;
	value: any;
	onChange: any;
}

export const TokenAddressInput = ({ id, value, onChange }: TokenAddressInputProps) => {
	const handleInput = useCallback(
		(event) => {
			const input = event.target.value;
			const withoutSpaces = input.replace(/\s+/g, "");
			onChange(withoutSpaces);
		},
		[onChange]
	);

	const error = Boolean(value.length > 0 && !PATTERN.eth.test(value));

	return (
		<Styled.InputPanel id={id}>
			<Styled.InputContainer>
				<AutoColumn gap="md">
					<RowBetween>
						<Styled.Label>Token Address</Styled.Label>
					</RowBetween>
					<Styled.ContainerRow error={error}>
						<Styled.Input
							className="recipient-address-input"
							type="text"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							placeholder="Token Address..."
							error={error}
							pattern={`${PATTERN.eth}`}
							onChange={handleInput}
							value={value}
						/>
					</Styled.ContainerRow>
				</AutoColumn>
			</Styled.InputContainer>
		</Styled.InputPanel>
	);
};
