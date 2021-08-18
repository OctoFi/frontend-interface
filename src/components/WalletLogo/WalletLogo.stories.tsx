import React from "react";
import { Story, Meta } from "@storybook/react";

import { PureWalletLogo, PureWalletLogoProps } from "./WalletLogo";

export default {
	title: "Components/WalletLogo",
	component: PureWalletLogo,
	argTypes: {
		type: {
			control: { type: "select" },
			options: [
				"metamask",
				"walletConnect",
				"ledger",
				"trezor",
				"trustWallet",
				"portus",
				"torus",
				"coinbase",
				"coinbase_mobile",
				"blank",
			],
		},
	},
} as Meta;

const Template: Story<PureWalletLogoProps> = (args) => <PureWalletLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
	type: "metamask",
};

export const WalletConnect = Template.bind({});
WalletConnect.args = {
	type: "walletConnect",
};

export const Ledger = Template.bind({});
Ledger.args = {
	type: "ledger",
};

export const Trezor = Template.bind({});
Trezor.args = {
	type: "trezor",
};

export const TrustWallet = Template.bind({});
TrustWallet.args = {
	type: "trustWallet",
};

export const Portus = Template.bind({});
Portus.args = {
	type: "portus",
};

export const Torus = Template.bind({});
Torus.args = {
	type: "torus",
};

export const Coinbase = Template.bind({});
Coinbase.args = {
	type: "coinbase",
};

export const CoinbaseMobile = Template.bind({});
CoinbaseMobile.args = {
	type: "coinbase_mobile",
};

export const Blank = Template.bind({});
Blank.args = {
	type: "blank",
};
