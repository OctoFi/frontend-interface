import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureHeader, PureHeaderProps } from "./Header";

export default {
	title: "Components/Header",
	component: PureHeader,
} as Meta;

const Template: Story<PureHeaderProps> = (args) => <PureHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DarkMode = Template.bind({});
DarkMode.args = {
	dark: true,
};
