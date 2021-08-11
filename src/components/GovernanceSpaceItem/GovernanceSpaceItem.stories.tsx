import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureGovernanceSpaceItem, PureGovernanceSpaceItemProps, SnapshotSpaceProps } from "./GovernanceSpaceItem";

const space: SnapshotSpaceProps = {
	name: "OctoFi",
	symbol: "OCTO",
	network: "ETH",
};
const logo: string = "https://raw.githubusercontent.com/bonustrack/snapshot-spaces/master/spaces/octofi/space.png";

export default {
	title: "Components/GovernanceSpaceItem",
	component: PureGovernanceSpaceItem,
} as Meta;

const Template: Story<PureGovernanceSpaceItemProps> = (args) => <PureGovernanceSpaceItem {...args} />;

export const Default = Template.bind({});
Default.args = {
	space,
	logo,
};

export const Loading = Template.bind({});
Loading.args = {
	space,
	logo,
	loading: true,
};

export const Pinned = Template.bind({});
Pinned.args = {
	space,
	logo,
	pinned: true,
};

export const BrokenLogo = Template.bind({});
BrokenLogo.args = {
	space,
	logo: "",
};
