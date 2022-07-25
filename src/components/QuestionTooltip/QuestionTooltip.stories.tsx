import { Story, Meta } from "@storybook/react";
import { PureQuestionTooltip, PureQuestionTooltipProps } from "./QuestionTooltip";

export default {
	title: "To Do/QuestionTooltip",
	component: PureQuestionTooltip,
} as Meta;

const Template: Story<PureQuestionTooltipProps> = (args) => <PureQuestionTooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: "Here is a long sample message",
};

export const Title = Template.bind({});
Title.args = {
	text: "Here is a long sample message",
	title: "Sample Title",
};
