import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "rebass";
import useTheme from "../../hooks/useTheme";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AutoColumn } from "../Column";
import TransactionSettings from "../TransactionSettings";
import * as Styled from "./styleds";

export interface PureSwapHeaderProps {
	open?: boolean;
	slippageTolerance?: any;
	deadline?: any;
	onOpenMenu?: () => void;
	onSetSlippage?: any;
	onSetDeadline?: any;
}

export const PureSwapHeader = ({
	open,
	onOpenMenu,
	slippageTolerance,
	onSetSlippage,
	deadline,
	onSetDeadline,
}: PureSwapHeaderProps) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const node = useRef();
	useOnClickOutside(node, open ? onOpenMenu : undefined);

	return (
		<Styled.Header className={"d-flex align-items-center justify-content-between"}>
			<Styled.CardTitle>{t("convert")}</Styled.CardTitle>
			<Styled.Menu ref={node}>
				<Styled.MenuButton onClick={onOpenMenu} id="open-settings-dialog-button">
					<Styled.MenuIcon />
				</Styled.MenuButton>
				{open && (
					<Styled.MenuFlyout>
						<AutoColumn gap="md" className="p-3">
							<Text fontWeight={600} fontSize={14} color={theme.text1 + "80"}>
								Transaction Settings
							</Text>
							<TransactionSettings
								rawSlippage={slippageTolerance}
								setRawSlippage={onSetSlippage}
								deadline={deadline}
								setDeadline={onSetDeadline}
							/>
						</AutoColumn>
					</Styled.MenuFlyout>
				)}
			</Styled.Menu>
		</Styled.Header>
	);
};
