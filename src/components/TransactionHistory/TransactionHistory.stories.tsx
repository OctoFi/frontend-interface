import { Story, Meta } from "@storybook/react";
import { PureTransactionHistory, PureTransactionHistoryProps } from "./TransactionHistory";

export default {
	title: "To Do/TransactionHistory",
	component: PureTransactionHistory,
} as Meta;

const Template: Story<PureTransactionHistoryProps> = (args) => <PureTransactionHistory {...args} />;

export const Default = Template.bind({});
Default.args = {};
