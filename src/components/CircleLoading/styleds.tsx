import styled, { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  
  to {
    stroke-dashoffset: 50;
  }
`;

export const Circle = styled.circle`
	stroke-dashoffset: 50;
	stroke-dasharray: 50;
	animation: ${rotate} 15s linear infinite forwards;
`;
