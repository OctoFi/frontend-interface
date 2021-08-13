import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureHero, PureHeroProps } from "./Hero";

export default {
	title: "Components/Hero",
	component: PureHero,
} as Meta;

const Template: Story<PureHeroProps> = (args) => <PureHero {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Connected = Template.bind({});
Connected.args = {
	connected: true,
};
