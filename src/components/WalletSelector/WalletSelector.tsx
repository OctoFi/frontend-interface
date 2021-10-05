import * as Styled from './styleds';

export interface PureWalletSelectorProps {
    wallets: Array<any>;
}

export const PureWalletSelector = ({ wallets }: PureWalletSelectorProps) => {
    return (
        <Styled.WalletGrid>
            Div
        </Styled.WalletGrid>
    )
}
