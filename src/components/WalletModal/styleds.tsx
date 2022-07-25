import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
	margin: 0;
	padding: 0;
	width: 100%;
`;

export const ContentWrapper = styled.div`
	background-color: ${({ theme }) => theme.modalBG};
	// padding-bottom: 2rem;
	border-bottom-left-radius: 0.42rem;
	border-bottom-right-radius: 0.42rem;
`;

export const UpperSection = styled.div`
	position: relative;
	
	h4 {
		margin-top: 0;
		font-weight: 500;
	}

	h5 {
		margin: 0;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		font-weight: 400;
	}

	h5:last-child {
		margin-bottom: 0px;
	}
`;
