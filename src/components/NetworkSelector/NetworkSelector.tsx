import NetworkOption from "../NetworkOption";
import { PureNetworkOptionProps } from "../NetworkOption/NetworkOption";
import * as Styled from "./styleds";

export interface PureNetworkSelectorProps {
	networks: Array<PureNetworkOptionProps>;
	selected: string;
	onUpdateNetwork: (T: any) => void;
}

export const PureNetworkSelector = ({ networks, selected, onUpdateNetwork }: PureNetworkSelectorProps) => {
	return (
		<Styled.NetworkGrid>
			{networks.map((item: any) => {
				return (
					<NetworkOption
						key={"network-" + item.symbol}
						id={"network-" + item.symbol}
						type={item.type}
						name={item.name}
						active={item.symbol === selected}
						supported={item.supported}
						onClick={() => onUpdateNetwork(item)}
					/>
				);
			})}
		</Styled.NetworkGrid>
	);
};
