import styled from "styled-components";

export const Name = styled.span`
	color: ${({ theme }) => theme.text3};
	font-size: 0.75rem;
	transition: all ease 0.3s;
`;

export const IconWrap = styled.div<{ size?: number }>`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	border-radius: 80px;
	background-color: ${({ theme }) => theme.primaryLight};
	margin-bottom: 12px;
	position: relative;
	transition: all ease 0.3s;
	width: 56px;
	height: 56px;
	min-height: 56px;

	& > img {
		height: 28px;
		width: 28px;
	}

	@media (min-width: 1200px) {
		width: 60px;
		height: 60px;
		min-height: 60px;

		& > img {
			height: ${({ size }) => (size ? size + "px" : "24px")};
			width: ${({ size }) => (size ? size + "px" : "24px")};
		}
	}
`;

export const OptionCard = styled.button`
	background: ${({ theme }) => theme.modalBG};
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: transparent;
	border: none;
	border-radius: 12px;
	outline: none;
	padding: 1rem 0.5rem;
	transition: all ease 0.4s;
	margin-top: 0;
	margin-bottom: 0;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:hover {
		background-color: ${({ theme }) => theme.primaryLight};

		${IconWrap} {
			background-color: ${({ theme }) => theme.modalBG};
		}

		${Name} {
			color: ${({ theme }) => theme.text1};
		}
	}
`;

export const ActiveWrap = styled.div<{ color: string }>`
	background-color: ${({ theme, color }) => (color?.slice(0, 1) === "#" ? color : (theme as any)[color])};
	border: 4px solid ${({ theme }) => theme.modalBG};
	border-radius: 50%;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: -8px;
	right: -4px;
`;
