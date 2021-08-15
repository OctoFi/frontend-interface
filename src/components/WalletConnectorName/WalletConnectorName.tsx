export type PureWalletConnectorNameProps = {
	name: string;
};

export const PureWalletConnectorName = ({ name }: PureWalletConnectorNameProps) => {
	return (
		<span>
			Connected with <span className="fw-bold">{name}</span>
		</span>
	);
};
