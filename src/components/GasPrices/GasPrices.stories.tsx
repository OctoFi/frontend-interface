import { Story, Meta } from "@storybook/react";
import { PureGasPrices, PureGasPricesProps } from "./GasPrices";

export default {
	title: "To Do/PureGasPrices",
	component: PureGasPrices,
} as Meta;

const Template: Story<PureGasPricesProps> = (args) => <PureGasPrices {...args} />;

export const Default = Template.bind({});
Default.args = {
	prices: [['Slow', '120'], ['Medium', '225'], ['Fast', '300']],
	selected: 'Slow',
};
