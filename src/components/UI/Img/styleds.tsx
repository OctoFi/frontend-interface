import styled from "styled-components";

export const BadSource = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.primary};
`;
