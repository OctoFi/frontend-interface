import { Story, Meta } from "@storybook/react";
import { PureThemeToggle, PureThemeToggleProps } from "./ThemeToggle";

export default {
	title: "To Do/ThemeToggle",
	component: PureThemeToggle,
} as Meta;

const Template: Story<PureThemeToggleProps> = (args) => <PureThemeToggle {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
	checked: true,
};
