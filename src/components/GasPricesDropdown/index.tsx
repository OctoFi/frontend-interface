import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Text } from "rebass";

import useTheme from "../../hooks/useTheme";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { AppState } from "../../state";
import { useModalOpen, useTogglegGasSettingsMenu } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import { AutoColumn } from "../Column";
import * as Styled from "./styleds";
import GasPricesContainer from "../GasPrices";
import GasIndicator from "../GasIndicator";

const GasPricesDropdown = () => {
	const node = useRef();
	const open = useModalOpen(ApplicationModal.GASSETTINGS);
	const toggle = useTogglegGasSettingsMenu();
	const theme = useTheme();
	const { gasPrice, selectedGasPrice } = useSelector((state: AppState) => state.currency);
	const [gasValue, setGasValue] = useState(0);

	useEffect(() => {
		let result = gasPrice.filter((item) => selectedGasPrice === item[0]);
		if (result[0]) {
			setGasValue(Math.round(result[0][1]));
		}
	}, [selectedGasPrice, gasPrice]);

	useOnClickOutside(node, open ? toggle : undefined);

	return (
		// @ts-ignore
		<Styled.Menu ref={node}>
			{/* Styled.MenuButton */}
			<GasIndicator gas={gasValue} onClick={toggle} />
			{open && (
				<Styled.MenuFlyout>
					<AutoColumn gap="md" style={{ padding: "1rem" }}>
						<Text fontWeight={600} fontSize={14} color={theme.text3}>
							Gas Settings
						</Text>
						<GasPricesContainer />
					</AutoColumn>
				</Styled.MenuFlyout>
			)}
		</Styled.Menu>
	);
};

export default GasPricesDropdown;
