import { Story, Meta } from "@storybook/react";
import { PureAddFunds, PureAddFundsProps } from "./AddFunds";

export default {
	title: "Done/AddFunds",
	component: PureAddFunds,
	argTypes: {
		value: {
			control: 'text'
		}
	}
} as Meta;

const Template: Story<PureAddFundsProps> = (args) => <PureAddFunds {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const LargeValue = Template.bind({});
LargeValue.args = {
	value: "5643340483230.027382",
};

export const DarkMode = Template.bind({});
DarkMode.args = {
	
};
