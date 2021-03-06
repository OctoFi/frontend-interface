import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureAppBar, PureAppBarProps } from "./AppBar";
import { appbarRoutes } from "../../constants/routes";

export default {
	title: "Components/AppBar",
	component: PureAppBar,
} as Meta;

const Template: Story<PureAppBarProps> = (args) => <PureAppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
	items: appbarRoutes,
};
