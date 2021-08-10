import React from "react";
import { Story, Meta } from "@storybook/react";

import { SocialItems } from "../../data/SocialItems";
import { PureSocialLinkList, PureSocialLinkListProps } from "./SocialLinkList";

export default {
	title: "Components/SocialLinkList",
	component: PureSocialLinkList,
} as Meta;

const Template: Story<PureSocialLinkListProps> = (args) => <PureSocialLinkList {...args} />;

export const Default = Template.bind({});
Default.args = {
	items: SocialItems,
};
