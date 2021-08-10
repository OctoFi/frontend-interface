// import { useContext } from "react";
// import { TYPE } from "../../theme";
// import { ThemeContext } from "styled-components";
import * as Styled from "./styleds";

export type PureBrandLogoProps = {
	logo: string;
	name: string;
	hideName?: boolean;
};

export const PureBrandLogo = ({ logo, name, hideName = false }: PureBrandLogoProps) => {
	// const theme = useContext(ThemeContext);

	return (
		<Styled.CustomLink to={"/"}>
			<Styled.Logo src={logo} alt={name} />
			{/* <TYPE.Black
				fontSize={15}
				color={theme.text1}
				fontWeight={700}
			> */}
			<span className={hideName ? "d-none" : "d-block"}>{name}</span>
			{/* </TYPE.Black> */}
		</Styled.CustomLink>
	);
};
