import { PropsWithChildren } from "react";
import { Story, Meta } from "@storybook/react";
import { PureAccountCard, PureAccountCardProps } from "./AccountCard";

export default {
	title: "Done/AccountCard",
	component: PureAccountCard,
} as Meta;

const Template: Story<PropsWithChildren<PureAccountCardProps>> = (args) => <PureAccountCard {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const NumberValue = Template.bind({});
NumberValue.args = {
	value: 5643.43,
};

export const Loading = Template.bind({});
Loading.args = {
	loading: true,
};

export const HasAssets = Template.bind({});
HasAssets.args = {
	value: 200,
	assets: {
		balances: [25, 25, 25, 25, 25, 25, 25, 25],
		total: 200,
		title: "Assets",
		slug: "assets",
		variant: "success",
	},
	children: [25, 25, 25, 25, 25].map(num => <p>{num}</p>)
};
