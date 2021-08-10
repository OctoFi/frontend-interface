import { PureProfileAddress } from "./ProfileAddress";
import useENSName from "../../hooks/useENSName";
import { shortenAddress } from "../../utils";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";

const ProfileAddress = () => {
	const { account } = useActiveWeb3React();
	const { ENSName } = useENSName(account ?? undefined);

	return <PureProfileAddress name={ENSName || (account && shortenAddress(account))} account={account} />;
};

export default ProfileAddress;
