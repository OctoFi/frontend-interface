import { Story, Meta } from "@storybook/react";
import { SocialItems } from "../../data/SocialItems";
import { PureSocialLinkList, PureSocialLinkListProps } from "./SocialLinkList";

export default {
	title: "To Do/SocialLinkList",
	component: PureSocialLinkList,
} as Meta;

const Template: Story<PureSocialLinkListProps> = (args) => <PureSocialLinkList {...args} />;

export const Default = Template.bind({});
Default.args = {
	items: SocialItems,
};
