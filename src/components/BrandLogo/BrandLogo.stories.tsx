import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureBrandLogo, PureBrandLogoProps } from "./BrandLogo";
import LogoImage from "../../assets/images/logo.svg";

export default {
	title: "Components/BrandLogo",
	component: PureBrandLogo,
} as Meta;

const Template: Story<PureBrandLogoProps> = (args) => <PureBrandLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
	logo: LogoImage,
	name: "Brand",
	hideName: false,
};

export const HideName = Template.bind({});
HideName.args = {
	logo: LogoImage,
	name: "Brand",
	hideName: true,
};
