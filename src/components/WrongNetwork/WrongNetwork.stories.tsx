import { Story, Meta } from "@storybook/react";
import { PureWrongNetwork, PureWrongNetworkProps } from "./WrongNetwork";

export default {
	title: "To Do/WrongNetwork",
	component: PureWrongNetwork,
} as Meta;

const Template: Story<PureWrongNetworkProps> = (args) => <PureWrongNetwork {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Wrong Network",
	message: "Please connect to the Ethereum network to continue.",
	label: "Change Network",
};
