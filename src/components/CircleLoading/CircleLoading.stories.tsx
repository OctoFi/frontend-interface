import { Story, Meta } from "@storybook/react";
import { PureCircleLoading, PureCircleLoadingProps } from "./CircleLoading";

export default {
	title: "To Do/CircleLoading",
	component: PureCircleLoading,
} as Meta;

const Template: Story<PureCircleLoadingProps> = (args) => <PureCircleLoading {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Paused = Template.bind({});
Paused.args = {
	paused: true,
};
