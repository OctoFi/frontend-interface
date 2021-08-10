import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureCopyButton, PureCopyButtonProps } from "./CopyButton";

export default {
	title: "Components/CopyButton",
	component: PureCopyButton,
} as Meta;

const Template: Story<PureCopyButtonProps> = (args) => <PureCopyButton {...args} />;

export const Default = Template.bind({});
Default.args = {
	success: false,
};

export const Success = Template.bind({});
Success.args = {
	success: true,
};

export const WithText = Template.bind({});
WithText.args = {
	children: "Copy Address",
};
