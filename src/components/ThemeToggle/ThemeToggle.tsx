import { Button } from "react-bootstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";

export interface PureThemeToggleProps {
	onChange?: () => void;
	checked?: boolean;
}

export const PureThemeToggle = ({ onChange, checked = false }: PureThemeToggleProps) => {
	return (
		<Button
			onClick={onChange}
			variant={checked ? "dark" : "light"}
			className={checked ? "text-white" : "text-warning"}
		>
			{checked ? <MoonFill size={20} /> : <SunFill size={20} />}
		</Button>
	);
};
