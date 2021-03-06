import { useCallback } from "react";
import { ExternalLink as ExternalIcon } from "react-feather";
import { PATTERN } from "../../constants";
import useENS from "../../hooks/useENS";
import { useActiveWeb3React } from "../../hooks";
import { ExternalLink } from "../../theme";
import { getExplorerLink } from "../../utils/explorer";
import { AutoColumn } from "../Column";
import * as Styled from "./styleds";

export type AddressInputPanelProps = {
	id?: any;
	value?: any;
	onChange?: (T: string) => void;
	label?: string;
	placeholder?: string;
};

const AddressInputPanel = ({
	id,
	value,
	onChange,
	label = "Recipient",
	placeholder = "Wallet Address or ENS name",
}: AddressInputPanelProps) => {
	const { chainId } = useActiveWeb3React();
	const { address, name } = useENS(value);

	const handleInput = useCallback(
		(event) => {
			const input = event.target.value;
			const withoutSpaces = input.replace(/\s+/g, "");
			if (onChange) {
				onChange(withoutSpaces);
			}
		},
		[onChange]
	);

	const error = Boolean(value?.length > 0 && !PATTERN.global.test(value));

	return (
		<Styled.InputPanel>
			<Styled.InputContainer>
				<AutoColumn gap="md">
					<Styled.ContainerRow error={error}>
						<Styled.Label htmlFor={id}>{label}</Styled.Label>
						<Styled.Input
							id={id}
							className="recipient-address-input"
							type="text"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							placeholder={placeholder}
							error={error}
							pattern={`${PATTERN.global}`}
							onChange={handleInput}
							value={value}
						/>
					</Styled.ContainerRow>
					{address && chainId && (
						<div className="d-flex justify-content-end align-items-center">
							<ExternalLink
								href={getExplorerLink(chainId, name ?? address, "address")}
								style={{ fontSize: "14px" }}
								className="d-flex align-items-center"
							>
								<ExternalIcon size={16} className="me-1" />
								View on explorer
							</ExternalLink>
						</div>
					)}
				</AutoColumn>
			</Styled.InputContainer>
		</Styled.InputPanel>
	);
};

export default AddressInputPanel;
