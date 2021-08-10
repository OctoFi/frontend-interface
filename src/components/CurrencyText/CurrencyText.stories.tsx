import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureCurrencyText, PureCurrencyTextProps } from "./CurrencyText";

export default {
	title: "Components/CurrencyText",
	component: PureCurrencyText,
} as Meta;

const Template: Story<PureCurrencyTextProps> = (args) => <PureCurrencyText {...args} />;

export const Default = Template.bind({});
Default.args = {
	symbol: "$",
	value: "500.02718392",
};

export const Separate = Template.bind({});
Separate.args = {
	symbol: "$",
	value: "500.02718392",
	separate: true,
};

export const Hide = Template.bind({});
Hide.args = {
	symbol: "$",
	value: "500.02718392",
	hide: true,
};
