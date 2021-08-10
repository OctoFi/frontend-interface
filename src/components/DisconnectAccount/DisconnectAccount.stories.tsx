import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureDisconnectAccount, PureDisconnectAccountProps } from "./DisconnectAccount";

export default {
	title: "Components/DisconnectAccount",
	component: PureDisconnectAccount,
} as Meta;

const Template: Story<PureDisconnectAccountProps> = (args) => <PureDisconnectAccount {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Disconnect",
};
