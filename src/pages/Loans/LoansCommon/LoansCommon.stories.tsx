import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureLoansCommon } from "./LoansCommon";

export default {
	title: "To Do/LoansCommon",
	component: PureLoansCommon,
} as Meta;

const Template: Story = (args) => <PureLoansCommon {...args} />;

export const Default = Template.bind({});
Default.args = {};
