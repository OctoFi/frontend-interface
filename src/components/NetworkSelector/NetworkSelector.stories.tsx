import { Story, Meta } from "@storybook/react";
import { PureNetworkSelector, PureNetworkSelectorProps } from "./NetworkSelector";

const networkOptions = [
	{
		name: "Ethereum",
		type: "main",
		id: "EthereumButton",
		symbol: "ETH",
		supported: true,
	},
	{
		name: "BSC",
		type: "main",
		id: "BSCButton",
		symbol: "BNB",
		supported: false,
	},
];

export default {
	title: "To Do/NetworkSelector",
	component: PureNetworkSelector,
} as Meta;

const Template: Story<PureNetworkSelectorProps> = (args) => <PureNetworkSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
	networks: networkOptions,
};

export const Selected = Template.bind({});
Selected.args = {
	networks: networkOptions,
	selected: "ETH",
};
