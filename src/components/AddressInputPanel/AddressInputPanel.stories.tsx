import { Story, Meta } from "@storybook/react";
import { PureAddressInputPanel, PureAddressInputPanelProps } from "./AddressInputPanel";

export default {
	title: "To Do/AddressInputPanel",
	component: PureAddressInputPanel,
} as Meta;

const Template: Story<PureAddressInputPanelProps> = (args) => <PureAddressInputPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
	ens: {
		address: '0x00000',
		name: 'sample.eth'
	}
};
