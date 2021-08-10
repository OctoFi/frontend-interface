import { Spinner } from "react-bootstrap";
import * as Styled from "./styleds";

export const SplashScreen = () => {
	return (
		<Styled.Wrapper loaded={false}>
			<Spinner animation="border" variant="primary" id="splash-screen-loading" />
		</Styled.Wrapper>
	);
};
