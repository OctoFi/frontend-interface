import { Story, Meta } from "@storybook/react";
import OfframpItems from "../../data/OfframpItems";

import { PureOfframpItem, PureOfframpItemProps } from "./OfframpItem";

export default {
	title: "To Do/OfframpItem",
	component: PureOfframpItem,
} as Meta;

const Template: Story<PureOfframpItemProps> = (args) => <PureOfframpItem {...args} />;

export const Default = Template.bind({});
Default.args = {
	thumbnail: OfframpItems[0].thumbnail,
	title: OfframpItems[0].title,
	traits: OfframpItems[0].traits,
	url: OfframpItems[0].url,
};
