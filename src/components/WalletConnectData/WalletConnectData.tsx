import React from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { useIsDarkMode } from "../../state/user/hooks";

const QRCodeWrapper = styled.div`
	${({ theme }) => theme.flexColumnNoWrap};
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
	const isDark = useIsDarkMode();

	return (
		<QRCodeWrapper>
			{uri && (
				<QRCode
					size={size}
					value={uri}
					bgColor={isDark ? "#333639" : "white"}
					fgColor={isDark ? "white" : "black"}
				/>
			)}
		</QRCodeWrapper>
	);
};
