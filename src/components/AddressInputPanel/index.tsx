import { PATTERN } from "../../constants";
import { useActiveWeb3React } from "../../hooks";
import useENS from "../../hooks/useENS";
import { PureAddressInputPanel } from './AddressInputPanel';

export type AddressInputPanelProps = {
	value?: any;
};

const AddressInputPanel = ({ value }: AddressInputPanelProps) => {
	const { chainId } = useActiveWeb3React();
	const { address, name } = useENS(value);
	const error = Boolean(value?.length > 0 && !PATTERN.global.test(value));

	return <PureAddressInputPanel ens={{ address, name }} chainId={chainId} error={error} />;
};

export default AddressInputPanel;
