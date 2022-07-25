import { Story, Meta } from "@storybook/react";
import { PureWalletOption, PureWalletOptionProps } from "./WalletOption";

export default {
	title: "To Do/WalletOption",
	component: PureWalletOption,
	argTypes: {
		type: {
			description: "Sets the type for a nested Wallet Logo component.",
		},
	},
} as Meta;

const Template: Story<PureWalletOptionProps> = (args) => <PureWalletOption {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: "MetaMaskButton",
	name: "MetaMask",
};

export const Active = Template.bind({});
Active.args = {
	id: "MetaMaskButton",
	name: "MetaMask",
	active: true,
};

export const Loading = Template.bind({});
Loading.args = {
	id: "MetaMaskButton",
	name: "MetaMask",
	loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: "MetaMaskButton",
	name: "MetaMask",
	disabled: true,
};
