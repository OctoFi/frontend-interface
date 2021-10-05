import styled from "styled-components";

export const TypeIcon = styled.div`
	width: 24px;
	min-width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1bc5bd20;
	border-radius: 32px;

	@media (min-width: 768px) {
		width: 48px;
		height: 48px;
		min-width: 48px;
		border-radius: 48px;
	}
`;

export const SliderWrap = styled.div`
	// .slick-track {
	// 	display: flex !important;
	// }

	// .slick-slide {
	// 	height: inherit !important;

	// 	& > div {
	// 		height: 100%;
	// 	}
	// }

	.explore__dots {
		list-style: none;
		padding-top: 0;
		padding-left: 0;
		margin: 0;
		display: flex !important;
		align-items: center;
		position: relative;
		justify-content: center;

		@media (min-width: 576px) {
			padding-top: 10px;
		}

		li {
			button {
				width: 8px !important;
				height: 8px !important;
				border-radius: 8px;
				opacity: 0.5;
				background-color: ${({ theme }) => theme.primary};
				transition: opacity 0.4s ease;
				margin: 0 5px;
				padding: 0;

				@media (min-width: 576px) {
					width: 10px !important;
					height: 10px !important;
					border-radius: 10px;
				}

				&::before {
					display: none;
				}
			}

			&.slick-active button {
				opacity: 1;
			}
		}
	}
`;
