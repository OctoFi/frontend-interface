import { Story, Meta } from "@storybook/react";
import { PureMarketOverview, PureMarketOverviewProps } from "./MarketOverview";

export default {
	title: "To Do/MarketOverview",
	component: PureMarketOverview,
} as Meta;

const Template: Story<PureMarketOverviewProps> = (args) => <PureMarketOverview {...args} />;

export const Default = Template.bind({});
Default.args = {
	pair: "BTC/USD",
	price: 34002.203828,
	variant: "success",
	volume: "2938193 base",
	change: "+23.23%",
	loading: false,
};
