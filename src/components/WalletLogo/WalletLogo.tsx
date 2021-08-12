import styled from "styled-components";
import Img from "../UI/Img";

const Image = styled(Img)`
	width: 24px;
	height: 24px;
`;

export interface PureWalletLogoProps {
	src: string;
	alt: string;
}

export const PureWalletLogo = ({ src, alt }: PureWalletLogoProps) => {
	return <Image src={src} alt={alt} />;
};
