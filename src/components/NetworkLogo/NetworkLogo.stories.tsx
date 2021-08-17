import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureNetworkLogo, PureNetworkLogoProps } from "./NetworkLogo";

export default {
	title: "Components/NetworkLogo",
	component: PureNetworkLogo,
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["AVAX", "xDAI", "ETH", "BNB", "HT", "FTM", "FSN", "MATIC", "Optimism"],
		},
	},
} as Meta;

const Template: Story<PureNetworkLogoProps> = (args) => <PureNetworkLogo {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const AVAX = Template.bind({});
AVAX.args = {
	type: "AVAX",
};

export const XDAI = Template.bind({});
XDAI.args = {
	type: "DAI",
};

export const ETH = Template.bind({});
ETH.args = {
	type: "ETH",
};

export const BNB = Template.bind({});
BNB.args = {
	type: "BNB",
};

export const HT = Template.bind({});
HT.args = {
	type: "HT",
};

export const FTM = Template.bind({});
FTM.args = {
	type: "FTM",
};

export const MATIC = Template.bind({});
MATIC.args = {
	type: "MATIC",
};

export const Optimism = Template.bind({});
Optimism.args = {
	type: "Optimism",
};
