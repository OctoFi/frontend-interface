import styled from "styled-components";

export const Wrapper = styled.div<{ loaded?: boolean }>`
	z-index: 9999;
	width: 100%;
	height: 100vh;
	display: flex;
	background-color: ${({ theme }) => theme.bg1};
	background-image: ${({ theme }) => theme.splashBG};
	visibility: ${({ loaded }) => (loaded ? "hidden" : "visible")};
	opacity: ${({ loaded }) => (loaded ? 0 : 1)};
	align-items: center;
	justify-content: center;
	transition: all ease 0.4s;
`;
