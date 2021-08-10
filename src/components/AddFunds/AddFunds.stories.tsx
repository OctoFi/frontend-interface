import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureAddFunds, PureAddFundsProps } from "./AddFunds";

export default {
	title: "Components/AddFunds",
	component: PureAddFunds,
} as Meta;

const Template: Story<PureAddFundsProps> = (args) => <PureAddFunds {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Total Balance",
	label: "Add Funds",
	balance: "0",
};

export const LargeBalance = Template.bind({});
LargeBalance.args = {
	balance: "5643340483230.027382",
};
