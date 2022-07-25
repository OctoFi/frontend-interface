import { Story, Meta } from "@storybook/react";
import { PureBookOption, PureBookOptionProps } from "./BookOption";

export default {
	title: "To Do/BookOption",
	component: PureBookOption,
} as Meta;

const Template: Story<PureBookOptionProps> = (args) => <PureBookOption {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = {
	active: true,
};

export const IsSell = Template.bind({});
IsSell.args = {
	isSell: true,
};

export const IsBuy = Template.bind({});
IsBuy.args = {
	isBuy: true,
};
