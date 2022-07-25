import { Story, Meta } from "@storybook/react";
import { PureDisconnectAccount, PureDisconnectAccountProps } from "./DisconnectAccount";

export default {
	title: "To Do/DisconnectAccount",
	component: PureDisconnectAccount,
} as Meta;

const Template: Story<PureDisconnectAccountProps> = (args) => <PureDisconnectAccount {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Disconnect",
};
