import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureCurrencyInputGroup, PureCurrencyInputGroupProps } from "./CurrencyInputGroup";

export default {
	title: "Components/CurrencyInputGroup",
	component: PureCurrencyInputGroup,
} as Meta;

const Template: Story<PureCurrencyInputGroupProps> = (args) => <PureCurrencyInputGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
	currency: "BTC",
	placeholder: "0.00",
};

export const HasValue = Template.bind({});
HasValue.args = {
	currency: "BTC",
	placeholder: "0.00",
	value: 100,
};
