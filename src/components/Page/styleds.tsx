import styled from "styled-components";

export const PageWrap = styled.div`
	display: flex;
	flex-flow: column nowrap;
	height: 100vh;
`;

export const PageContent = styled.div`
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 0.625rem;

		@media (min-width: 768px) {
			width: 0.875rem;
		}
	}

	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.scrollbar};
		border-radius: 2px;
	}
`;

export const PageContainer = styled.div`
	padding-top: 2rem;
	padding-bottom: 3rem;
	flex: 1;
`;

export const Title = styled.h1`
	font-weight: 600;
	margin-bottom: 2rem;
`;
