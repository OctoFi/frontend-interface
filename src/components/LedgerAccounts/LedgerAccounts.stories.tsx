import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureLedgerAccounts, PureLedgerAccountsProps } from "./LedgerAccounts";

export default {
	title: "Components/LedgerAccounts",
	component: PureLedgerAccounts,
} as Meta;

const Template: Story<PureLedgerAccountsProps> = (args) => <PureLedgerAccounts {...args} />;

export const Default = Template.bind({});
Default.args = {
	accounts: [
		"0x8E884089f642ee9ED63c5eA457E40f20eAD73d89",
		"0x06BFF35134E1d88722855f57A08EDd95e57E0556",
		"0xa88fF6bFB02e175FB8b69a790c91eEA527eB19B5",
		"0x344224F6f9f8f7D1c9213e10c96e7F0E00A04Bf3",
		"0x081f8A468d07AB16E0D0B0b1888473853b411093",
		"0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
	],
	accountsEthBalance: {
		"0x8E884089f642ee9ED63c5eA457E40f20eAD73d89": 34827.123456,
		"0x06BFF35134E1d88722855f57A08EDd95e57E0556": 34827.12345,
		"0xa88fF6bFB02e175FB8b69a790c91eEA527eB19B5": 34827.1234,
		"0x344224F6f9f8f7D1c9213e10c96e7F0E00A04Bf3": 34827.123,
		"0x081f8A468d07AB16E0D0B0b1888473853b411093": 34827.12,
		"0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F": 34827.1,
	},
};
