import { useEffect, useMemo, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { ExternalLink } from "../../theme";
import { PureWalletOption } from "./WalletOption";

export interface WalletOptionProps {
	link?: string | null;
	onClick?: () => void;
	error: boolean;
	active?: boolean;
	id: string;
	type: string;
	selected?: string | undefined;
	name?: string;
	selectedNetwork?: string | undefined;
	supportedNetworks?: string[] | undefined;
}

const WalletOption = ({
	link,
	onClick,
	error,
	active = false,
	id,
	type,
	selected,
	name = "metamask",
	selectedNetwork,
	supportedNetworks = ["ETH"],
}: WalletOptionProps) => {
	const theme = useTheme();
	const [loadingColor, setLoadingColor] = useState(theme.secondary);

	const disabled = useMemo(() => {
		return supportedNetworks?.includes(selectedNetwork || "");
	}, [supportedNetworks, selectedNetwork]);

	useEffect(() => {
		let tempColor = active
			? "secondary"
			: !selected || (!!selected && selected !== name)
			? "modalBG"
			: error
			? "danger"
			: "success";
		setLoadingColor(tempColor);
	}, [active, selected, name, error]);

	const Option = (
		<PureWalletOption
			name={name}
			id={id}
			type={type}
			disabled={disabled}
			active={active}
			loading={false}
			onClick={onClick}
			loadingColor={loadingColor}
		/>
	);

	if (link) {
		return <ExternalLink href={link}>{Option}</ExternalLink>;
	} else {
		return Option;
	}
};

export default WalletOption;
