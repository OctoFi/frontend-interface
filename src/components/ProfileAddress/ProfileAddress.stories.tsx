import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureProfileAddress, PureProfileAddressProps } from "./ProfileAddress";

export default {
	title: "Components/ProfileAddress",
	component: PureProfileAddress,
} as Meta;

const Template: Story<PureProfileAddressProps> = (args) => <PureProfileAddress {...args} />;

export const Default = Template.bind({});
Default.args = {
	name: "0x0000...0000",
	account: "0x0000000000000000000000000000000000000000",
};

export const ENS = Template.bind({});
ENS.args = {
	name: "octofi.eth",
	account: "0x0000000000000000000000000000000000000000",
};
