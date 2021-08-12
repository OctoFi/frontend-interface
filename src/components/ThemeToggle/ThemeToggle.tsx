import { Button } from "react-bootstrap";
import { Moon, MoonFill, Sun, SunFill } from "react-bootstrap-icons";
import * as Styled from "./styleds";

export interface PureThemeToggleProps {
	onChange?: () => void;
	checked?: boolean;
}

export const PureThemeToggle = ({ onChange, checked = false }: PureThemeToggleProps) => {
	return (
		// <Styled.Switch htmlFor="theme-toggle">
		// 	<Styled.SwitchInput type="checkbox" id="theme-toggle" onChange={onChange} checked={checked} />
		// 	<Styled.SwitchBox>
		// 		<Styled.SwitchBg>
		// 			<Moon color={"#fff"} />
		// 			<Sun color={"#fc6"} />
		// 		</Styled.SwitchBg>
		// 		<Styled.SwitchBoxInner />
		// 	</Styled.SwitchBox>
		// </Styled.Switch>
		<Button
			onClick={onChange}
			variant={checked ? "dark" : "light"}
			className={checked ? "text-white" : "text-warning"}
		>
			{checked ? <MoonFill size={20} /> : <SunFill size={20} />}
		</Button>
	);
};
