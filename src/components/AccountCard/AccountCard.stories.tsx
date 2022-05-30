import React from "react";
import { Story, Meta } from "@storybook/react";
import WalletIcon from "../../assets/images/account/wallet.svg";

import { PureAccountCard, PureAccountCardProps } from "./AccountCard";

export default {
	title: "Components/AccountCard",
	component: PureAccountCard,
} as Meta;

const Template: Story<PureAccountCardProps> = (args) => <PureAccountCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Wallet",
	value: "5643.43",
	icon: WalletIcon,
};

export const NumberValue = Template.bind({});
NumberValue.args = {
	title: "Wallet",
	value: 5643.43,
	icon: WalletIcon,
};

export const Loading = Template.bind({});
Loading.args = {
	title: "Wallet",
	value: "0",
	loading: true,
};
