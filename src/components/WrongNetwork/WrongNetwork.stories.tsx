import React from "react";
import { Story, Meta } from "@storybook/react";

import { WrongNetwork } from "./WrongNetwork";

export default {
	title: "Components/WrongNetwork",
	component: WrongNetwork,
} as Meta;

const Template: Story = (args) => <WrongNetwork {...args} />;

export const Default = Template.bind({});
Default.args = {};
