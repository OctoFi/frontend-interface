import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureViewOnExplorer, PureViewOnExplorerProps } from "./ViewOnExplorer";

export default {
	title: "Components/ViewOnExplorer",
	component: PureViewOnExplorer,
	argTypes: {
		chainId: {
			options: [1, 3, 4, 5, 42, 56, 97, 137, 43113, 43114],
			control: { type: "select" },
		},
		type: {
			options: ["default", "transaction", "token", "address", "block"],
		},
	},
} as Meta;

const Template: Story<PureViewOnExplorerProps> = (args) => <PureViewOnExplorer {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Label = Template.bind({});
Label.args = {
	label: "Open explorer",
};

export const Type = Template.bind({});
Type.args = {
	value: "0x73F29805198cCE93015bC960F47885CF6268ce85",
	label: "View address",
	type: "address",
};
