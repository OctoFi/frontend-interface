import { Story, Meta } from "@storybook/react";
import { PureNetworkOption, PureNetworkOptionProps } from "./NetworkOption";

export default {
	title: "To Do/NetworkOption",
	component: PureNetworkOption,
	argTypes: {
		type: {
			description: "Sets the type for a nested Network Logo component.",
		},
	},
} as Meta;

const Template: Story<PureNetworkOptionProps> = (args) => <PureNetworkOption {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: "EthereumButton",
	name: "Ethereum",
	type: "main",
};

export const Active = Template.bind({});
Active.args = {
	id: "EthereumButton",
	name: "Ethereum",
	type: "main",
	active: true,
};

export const NotSupported = Template.bind({});
NotSupported.args = {
	id: "EthereumButton",
	name: "Ethereum",
	type: "main",
	supported: false,
};
