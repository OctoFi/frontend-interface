import WalletOption from '../WalletOption';
import * as Styled from './styleds';

export interface PureWalletSelectorProps {
    wallets: Array<any>;
    selected?: string | undefined;
    onSelectWallet: (T: string) => void;
}

export const PureWalletSelector = ({ wallets, selected, onSelectWallet }: PureWalletSelectorProps) => {
    return (
        <Styled.WalletGrid>
            {wallets.map(wallet => (
                <WalletOption
                    key={wallet.key}
                    id={`connect-${wallet.key}`}
                    name={wallet.option.name}
                    type={wallet.key}
                    disabled={wallet.disabled}
                    active={wallet.active}
                    loading={wallet.loading}
                    link={wallet.option.href}
                    onClick={() => onSelectWallet(wallet.key)}
                    error={wallet.error}
                    selected={!selected || (!!selected && selected !== wallet.key)}
                />
            ))}
        </Styled.WalletGrid>
    );
};
