import { Story, Meta } from "@storybook/react";
import { GasIndicator, GasIndicatorProps } from "./GasIndicator";

export default {
	title: "To Do/GasIndicator",
	component: GasIndicator,
} as Meta;

const Template: Story<GasIndicatorProps> = (args) => <GasIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
	gas: 45,
};
