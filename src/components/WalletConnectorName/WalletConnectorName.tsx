export type PureWalletConnectorNameProps = {
	name: string;
};

export const PureWalletConnectorName = ({ name }: PureWalletConnectorNameProps) => {
	return (
		<p>
			Connected with <span className="fw-bold">{name}</span>
		</p>
	);
};
