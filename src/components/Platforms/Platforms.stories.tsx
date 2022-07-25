import { Story, Meta } from "@storybook/react";
import { PurePlatforms, PurePlatformsProps } from "./Platforms";

export default {
	title: "To Do/Platforms",
	component: PurePlatforms,
} as Meta;

const Template: Story<PurePlatformsProps> = (args) => <PurePlatforms {...args} />;

// TODO: fix stories
export const Default = Template.bind({});
Default.args = {
	balance: [
		{
			metadata: {
				logo: {
					href: "#",
				},
				name: "name",
			},
			total: 453823.283813,
		},
	],
	loading: false,
	onSelectPlatform: () => "test",
};
