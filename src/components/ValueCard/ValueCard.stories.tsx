import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureValueCard, PureValueCardProps } from "./ValueCard";
import AssetIcon from "../../assets/images/account/assets.svg";

export default {
	title: "Components/ValueCard",
	component: PureValueCard,
} as Meta;

const Template: Story<PureValueCardProps> = (args) => <PureValueCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: "5000",
	title: "Sample Title",
	image: AssetIcon,
	color: "blue",
};
