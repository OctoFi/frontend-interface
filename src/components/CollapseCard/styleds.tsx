import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.modalBG};
	border-radius: 12px;
	margin-bottom: 15px;
	overflow: hidden;
	transition: all 0.6s ease;
	will-change: transform, height, border-color, box-shadow;

	@media (min-width: 768px) {
		margin-bottom: 1.25rem;
	}
`;

export const Header = styled.div`
	padding: 15px 26px 15px 20px;
	max-height: 60px;
	height: 60px;
	cursor: pointer;
	transition: 0.3s ease background-color;
	position: relative;
	background-color: ${({ theme }) => theme.modalBG};
`;

export const HeaderShowMore = styled.div<{ show?: boolean }>`
	width: 10px;
	height: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: ${({ show }) => (show ? "rotate(90deg)" : "rotate(0deg)")};
	transition: 0.4s ease all;
	will-change: background-color, transform;
	margin-left: 16px;

	@media (max-width: 991px) {
		position: absolute;
		top: 26px;
		right: 26px;
		transform: ${({ show }) => (show ? "rotate(-90deg)" : "rotate(90deg)")};
	}
`;

export const HeaderTitle = styled.span`
	font-weight: 700;
	font-size: 1.25rem;
	color: ${({ theme }) => theme.text1};
`;

export const CollapseView = styled.div<{ height?: string | number }>`
	overflow: hidden;
	max-height: ${({ height }) => `${height}px` || 0};
	display: flex;
	flex-direction: column;

	transition: 0.4s ease all;
`;

export const Content = styled.div`
	border-top: 1px solid ${({ theme }) => theme.text3};
	padding: 20px;
`;
