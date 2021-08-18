import { Check } from "react-feather";
import useTheme from "../../hooks/useTheme";
import WalletLogo from "../WalletLogo";
import * as Styled from "./styleds";

export interface PureWalletOptionProps {
	name: string;
	id: string;
	type?: string;
	disabled?: boolean;
	active?: boolean;
	loading?: boolean;
	loadingColor?: string;
	onClick?: () => void;
}

export const PureWalletOption = ({
	name,
	id,
	type = "metamask",
	disabled = false,
	active = false,
	loading = false,
	loadingColor = "secondary",
	onClick,
}: PureWalletOptionProps) => {
	const theme = useTheme();

	return (
		<Styled.OptionCard onClick={onClick} disabled={disabled} id={id}>
			<Styled.IconWrap size={30}>
				<WalletLogo type={type} />
				{active ? (
					<Styled.ActiveStatus color="secondary">
						<Check size={14} color={theme.modalBG} />
					</Styled.ActiveStatus>
				) : (
					loading && (
						<Styled.Status color="modalBG">
							<Styled.ColoredSpinner color={loadingColor} animation="border" size="sm" id={name} />
						</Styled.Status>
					)
				)}
			</Styled.IconWrap>

			<Styled.Name>{name}</Styled.Name>
		</Styled.OptionCard>
	);
};
