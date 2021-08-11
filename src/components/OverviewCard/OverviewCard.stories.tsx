import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureOverviewCard, PureOverviewCardProps } from "./OverviewCard";
import Image from "../../assets/images/ethereum-logo.png";

export default {
	title: "Components/OverviewCard",
	component: PureOverviewCard,
} as Meta;

const Template: Story<PureOverviewCardProps> = (args) => <PureOverviewCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Card Title",
	value: "88.888",
	image: Image,
};
