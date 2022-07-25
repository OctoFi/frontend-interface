import { Story, Meta } from "@storybook/react";
import { PurePlatformCard, PurePlatformCardProps } from "./PlatformCard";
import Image from "../../assets/images/ethereum-logo.png";

export default {
	title: "To Do/PlatformCard",
	component: PurePlatformCard,
} as Meta;

const Template: Story<PurePlatformCardProps> = (args) => <PurePlatformCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Card Title",
	value: "88.888",
	image: Image,
};
