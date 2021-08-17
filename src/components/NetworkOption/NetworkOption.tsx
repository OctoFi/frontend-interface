import { Check } from "react-feather";

import useTheme from "../../hooks/useTheme";
import NetworkLogo from "../NetworkLogo";
import * as Styled from "./styleds";

export interface PureNetworkOptionProps {
	name: string;
	type: string;
	id: string;
	supported?: boolean;
	active?: boolean;
	onClick?: () => void;
}

export const PureNetworkOption = ({
	name,
	type,
	id,
	supported = true,
	active = false,
	onClick,
}: PureNetworkOptionProps) => {
	const theme = useTheme();

	return (
		<Styled.OptionCard onClick={onClick} disabled={!supported} id={id}>
			<Styled.IconWrap size={30}>
				<NetworkLogo type={type} />
				{active && (
					<Styled.ActiveWrap color="secondary">
						<Check size={14} color={theme.modalBG} />
					</Styled.ActiveWrap>
				)}
			</Styled.IconWrap>

			<Styled.Name>
				{name}
				{!supported && " (Soon)"}
			</Styled.Name>
		</Styled.OptionCard>
	);
};
