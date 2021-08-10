import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureViewOnExplorer, PureViewOnExplorerProps } from "./ViewOnExplorer";

export default {
	title: "Components/ViewOnExplorer",
	component: PureViewOnExplorer,
} as Meta;

const Template: Story<PureViewOnExplorerProps> = (args) => <PureViewOnExplorer {...args} />;

export const Default = Template.bind({});
Default.args = {
	address: "0x73F29805198cCE93015bC960F47885CF6268ce85",
	chainId: 1,
};

export const Polygon = Template.bind({});
Polygon.args = {
	address: "0x73F29805198cCE93015bC960F47885CF6268ce85",
	chainId: 137,
};
