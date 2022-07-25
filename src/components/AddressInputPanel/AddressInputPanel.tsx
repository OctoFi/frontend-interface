import { useCallback } from "react";
import { ExternalLink as ExternalIcon } from "react-feather";
import { PATTERN } from "../../constants";
import { ExternalLink } from "../../theme";
import { getExplorerLink } from "../../utils/explorer";
import { AutoColumn } from "../Column";
import * as Styled from "./styleds";

export type PureAddressInputPanelProps = {
  id?: any;
  value?: any;
  onChange?: (T: string) => void;
  label?: string;
  placeholder?: string;
  chainId?: any;
  ens: any;
  error?: any;
};

export const PureAddressInputPanel = ({
  id,
  value,
  onChange,
  label = "Recipient",
  placeholder = "Wallet Address or ENS name",
  chainId = 1,
  ens,
  error,
}: PureAddressInputPanelProps) => {
  const { address, name } = ens;

  const handleInput = useCallback(
    (event: any) => {
      const input = event.target.value;
      const withoutSpaces = input.replace(/\s+/g, "");
      if (onChange) {
        onChange(withoutSpaces);
      }
    },
    [onChange]
  );

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
