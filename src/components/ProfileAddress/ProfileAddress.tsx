import * as Styled from "./styleds";

export type PureProfileAddressProps = {
	name: string | null | undefined;
	account?: string | null | undefined;
};

export const PureProfileAddress = ({ name, account }: PureProfileAddressProps) => {
	return (
		<div className="d-inline-flex gap-2 flex-nowrap align-items-center">
			<Styled.ModifiedJazzicon address={account || ""} />
			<Styled.WalletAddress className="text-muted">{name}</Styled.WalletAddress>
		</div>
	);
};
