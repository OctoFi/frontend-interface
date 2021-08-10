import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureCircleLoading, PureCircleLoadingProps } from "./CircleLoading";

export default {
	title: "Components/CircleLoading",
	component: PureCircleLoading,
} as Meta;

const Template: Story<PureCircleLoadingProps> = (args) => <PureCircleLoading {...args} />;

export const Default = Template.bind({});
Default.args = {
	waiting: false,
};

export const Waiting = Template.bind({});
Waiting.args = {
	waiting: true,
};
