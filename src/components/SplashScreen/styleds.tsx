import styled from "styled-components";

export const Wrapper = styled.div<{ loaded?: boolean }>`
	// position: fixed;
	// top: 0;
	// left: 0;
	// right: 0;
	// bottom: 0;
	z-index: 10999;
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${({ theme }) => theme.bg1};
	background-image: ${({ theme }) => theme.splashBG};
	visibility: ${({ loaded }) => (loaded ? "hidden" : "visible")};
	opacity: ${({ loaded }) => (loaded ? 0 : 1)};
	align-items: center;
	justify-content: center;
	transition: all ease 0.4s;
`;
