import React from "react";
import { Check } from "react-feather";

import NetworkIcon from "./NetworkIcon";
import useTheme from "../../../hooks/useTheme";
import * as Styled from "./styleds";

export interface NetworkOptionProps {
	clickable?: boolean;
	onClick?: null | (() => void);
	header: React.ReactNode;
	active?: boolean;
	id: string;
	type: string;
	disabled?: boolean;
}

export const NetworkOption = ({
	clickable = true,
	onClick = null,
	header,
	active = false,
	id,
	type,
	disabled = false,
}: NetworkOptionProps) => {
	const theme = useTheme();

	return (
		<Styled.OptionCardClickable
			id={id}
			onClick={onClick}
			clickable={clickable && !active}
			active={active}
			disabled={disabled}
		>
			<Styled.IconWrapper size={30} className={"wallet-option__icon-wrapper"}>
				<NetworkIcon type={type} />
				{active && (
					<Styled.LoadingContainer color={"secondary"}>
						<Check size={12} color={theme.modalBG} />
					</Styled.LoadingContainer>
				)}
			</Styled.IconWrapper>
			<Styled.OptionCardLeft>
				<Styled.HeaderText>{header}</Styled.HeaderText>
			</Styled.OptionCardLeft>
		</Styled.OptionCardClickable>
	);
};
