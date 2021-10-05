import styled from "styled-components";

export const Wrapper = styled.div`
	border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
	overflow: hidden;
	transition: all 0.6s ease;
	will-change: transform, height, border-color, box-shadow;

	&:first-child {
		border-top: 1px solid ${({ theme }) => theme.borderColor2};
	}
`;

export const Header = styled.div`
	// cursor: pointer;
	// padding: 1.25rem 1rem;
	// position: relative;
	// transition: 0.3s ease background-color;
`;

export const HeaderShowMore = styled.button<{ show: boolean }>`
	width: 40px;
	height: 40px;
	background-color: ${({ theme }) => theme.bg1};
	display: flex;
	align-items: center;
	justify-content: center;
	transform: ${({ show }) => (show ? "rotate(90deg)" : "rotate(0deg)")};
	border-radius: 40px;
	transition: 0.4s ease all;
	will-change: background-color, transform;
	margin-left: 35px;

	@media (max-width: 991px) {
		position: absolute;
		top: 13px;
		right: 15px;
		transform: ${({ show }) => (show ? "rotate(-90deg)" : "rotate(90deg)")};
	}

	&:hover {
		background-color: ${({ theme }) => theme.bg1};
	}
`;

export const Body = styled.div`
	padding: 0;
	position: relative;
	background-color: ${({ theme }) => theme.modalBG};
`;

export const BodyInside = styled.div`
	padding: 20px 20px 30px;
	min-width: 320px;
	align-self: stretch;
`;

export const Footer = styled.div`
	padding: 20px 40px 20px 20px;
	align-self: stretch;
	border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

export const BodyToken = styled.div`
	display: flex;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 30px;
	}
`;

export const TypeIcon = styled.div`
	background-color: ${({ theme }) => theme.primaryLight};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5rem;
	width: 2.5rem;
`;

export const LogoContainer = styled.div`
	margin-right: 10px;

	img,
	div {
		width: 30px;
		height: 30px;

		@media (min-width: 768px) {
			width: 34px;
			height: 34px;
		}
	}
`;

export const Separator = styled.div`
	height: 0;
	width: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
`;

export const VerticalSeparator = styled.div`
	align-self: stretch;
	position: relative;
	margin: 0;
	border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
	width: 100%;
	height: 0;

	@media (min-width: 992px) {
		border-right: 1px solid ${({ theme }) => theme.borderColor2};
		border-bottom: none;
		width: 0;
		height: auto;
	}
`;

export const PrimaryCircle = styled.div`
	width: 32px;
	height: 32px;
	border: 1px solid ${({ theme }) => theme.primary};
	background-color: ${({ theme }) => theme.bg1};
	border-radius: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const Details = styled.div<{ vertical?: boolean }>`
	display: flex;
	justify-content: center;
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 30px;

		@media (min-width: 992px) {
			margin-bottom: ${({ vertical }) => (vertical ? "30px" : 0)};
		}
	}
`;

export const DescTitle = styled.span`
	font-weight: 400;
	font-size: 1rem;
	margin-bottom: 0.375rem;
	color: ${({ theme }) => theme.text1};
`;

export const DescValue = styled.span`
	font-weight: 700;
	font-size: 1rem;
	color: ${({ theme }) => theme.text1};
`;

export const DescAnchor = styled.a`
	font-weight: 700;
	font-size: 1rem;
	text-decoration: underline;
	color: ${({ theme }) => theme.primary};
`;

export const TradeSide = styled.div`
	min-width: 172px;
`;

export const ReceivedCoins = styled.div`
	padding: 20px 50px;

	@media (max-width: 991px) {
		padding: 30px 20px;
	}
`;

export const CollapseView = styled.div<{ height: number }>`
	overflow: hidden;
	max-height: ${({ height }) => `${height}px` || 0};
	display: flex;
	flex-direction: column;

	transition: 0.4s ease all;
`;
