import { useEffect, useState } from "react";
import { Check } from "react-feather";
import useTheme from "../../hooks/useTheme";
import { ExternalLink } from "../../theme";
import WalletLogo from "../WalletLogo";
import * as Styled from "./styleds";

export interface PureWalletOptionProps {
	id: string;
	name: string;
	type?: string;
	disabled?: boolean;
	active?: boolean;
	loading?: boolean;
	link?: string | null;
	onClick?: () => void;
	error: boolean;
	selected?: boolean;
}

export const PureWalletOption = ({
	id,
	name = "metamask",
	type = "metamask",
	disabled = false,
	active = false,
	loading = false,
	link,
	onClick,
	error,
	selected = false,
}: PureWalletOptionProps) => {
	const theme = useTheme();
	const [loadingColor, setLoadingColor] = useState(theme.secondary);

	useEffect(() => {
		let tempColor = active
			? "secondary"
			: !selected
				? "modalBG"
				: error
					? "danger"
					: "success";
		setLoadingColor(tempColor);
	}, [active, selected, error]);

	const Option = (
		<Styled.OptionCard onClick={onClick} disabled={disabled} id={id}>
			<Styled.IconWrap size={30}>
				<WalletLogo type={type} />
				{active ? (
					<Styled.ActiveStatus color="secondary">
						<Check size={14} color={theme.modalBG} />
					</Styled.ActiveStatus>
				) : loading ? (
					<Styled.Status color="modalBG">
						<Styled.ColoredSpinner color={loadingColor} animation="border" size="sm" id={name} />
					</Styled.Status>
				) : null}
			</Styled.IconWrap>

			<Styled.Name>{name}</Styled.Name>
		</Styled.OptionCard>
	);

	if (link) {
		return <ExternalLink href={link}>{Option}</ExternalLink>;
	} else {
		return Option;
	}
};
