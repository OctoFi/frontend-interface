import React from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { useDarkModeManager } from "../../state/user/useDarkModeManager";

const QRCodeWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	border-radius: 0.75rem;
	margin-bottom: 1.25rem;
`;

export interface PureWalletConnectDataProps {
	uri?: string;
	size?: number;
}

export const PureWalletConnectData = ({ uri = "", size }: PureWalletConnectDataProps) => {
	const [darkMode] = useDarkModeManager();

	return (
		<QRCodeWrapper>
			{uri && (
				<QRCode
					size={size}
					value={uri}
					bgColor={darkMode ? "#333639" : "white"}
					fgColor={darkMode ? "white" : "black"}
				/>
			)}
		</QRCodeWrapper>
	);
};
