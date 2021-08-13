import styled from "styled-components";

export const Features = styled.section`
	margin-top: 3rem;

	@media (min-width: 768px) {
		margin-top: 5rem;
	}
`;

export const Container = styled.div`
	overflow: hidden;
`;

export const Inner = styled.div`
	width: calc(100% + 20px);
	margin-left: -10px;
	padding-bottom: 24px;

	.slick-slide {
		padding: 0 10px;
	}

	.features__dots {
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
				width: 10px !important;
				height: 10px !important;
				border-radius: 50%;
				opacity: 0.5;
				background-color: ${({ theme }) => theme.primary};
				transition: opacity 0.4s ease;
				margin: 0 5px;
				padding: 0;

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
