import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureSafetyAlert, PureSafetyAlertProps } from "./SafetyAlert";

export default {
	title: "To Do/SafetyAlert",
	component: PureSafetyAlert,
} as Meta;

const Template: Story<PureSafetyAlertProps> = (args) => <PureSafetyAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
	show: true,
};
