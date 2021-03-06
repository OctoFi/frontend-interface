import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureCurrencyDropdown, PureCurrencyDropdownProps } from "./CurrencyDropdown";
import { currencies } from "../../constants/currencies";

export default {
	title: "Components/CurrencyDropdown",
	component: PureCurrencyDropdown,
} as Meta;

const Template: Story<PureCurrencyDropdownProps> = (args) => <PureCurrencyDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
	currencies,
	selectedCurrency: "BTC",
};
