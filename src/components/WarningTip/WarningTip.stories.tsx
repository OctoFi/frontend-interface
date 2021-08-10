import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureWarningTip, PureWarningTipProps } from "./WarningTip";

export default {
	title: "Components/WarningTip",
	component: PureWarningTip,
} as Meta;

const Template: Story<PureWarningTipProps> = (args) => <PureWarningTip {...args} />;

export const Default = Template.bind({});
Default.args = {
	message: "This is a sample message.",
	show: true,
};
