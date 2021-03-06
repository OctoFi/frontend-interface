import React from "react";
import { Story, Meta } from "@storybook/react";

import { GasIndicator, GasIndicatorProps } from "./GasIndicator";

export default {
	title: "Components/GasIndicator",
	component: GasIndicator,
} as Meta;

const Template: Story<GasIndicatorProps> = (args) => <GasIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
	gas: 45,
};
