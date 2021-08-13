// import useTheme from "../../hooks/useTheme";
// import { TYPE } from "../../theme";

export type PureBrandLogoProps = {
	logo: string;
	name: string;
	hideName?: boolean;
};

export const PureBrandLogo = ({ logo, name, hideName = false }: PureBrandLogoProps) => {
	// const theme = useTheme();

	return (
		<span className="d-flex align-items-center gap-2">
			<img src={logo} alt={name} width="32" height="32" />
			<span className={hideName ? "d-none" : "d-block"}>{name}</span>
			{/* <TYPE.Black fontSize={15} color={theme.text1} fontWeight={700}>
			</TYPE.Black> */}
		</span>
	);
};
