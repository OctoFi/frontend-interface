import { Story, Meta } from "@storybook/react";
import { SplashScreen } from "./SplashScreen";

export default {
	title: "To Do/SplashScreen",
	component: SplashScreen,
} as Meta;

const Template: Story = (args) => <SplashScreen {...args} />;

export const Default = Template.bind({});
Default.args = {};
