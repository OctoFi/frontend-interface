import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureWalletConnectorName, PureWalletConnectorNameProps } from "./WalletConnectorName";

export default {
	title: "Components/WalletConnectorName",
	component: PureWalletConnectorName,
} as Meta;

const Template: Story<PureWalletConnectorNameProps> = (args) => <PureWalletConnectorName {...args} />;

export const Default = Template.bind({});
Default.args = {
	name: "MetaMask",
};
