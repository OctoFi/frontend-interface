import styled from "styled-components";
import Img from "../../UI/Img";

export const Item = styled.a`
	min-width: 8rem;
	max-width: 10rem;
	display: block;
	margin-bottom: 1rem;
	text-decoration: none;
`;

export const Thumbnail = styled.div`
	border: 1px solid ${({ theme }) => theme.borderColor2};
	border-radius: 12px;
	overflow: hidden;
`;

export const ThumbnailImg = styled(Img)`
	width: 100%;
	height: 100%;
	display: block;
`;

export const Name = styled.h3`
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	font-size: 0.875rem;
	margin-top: 0.5rem;
	text-align: center;
`;

export const Description = styled.p`
	color: ${({ theme }) => theme.text1};
	font-size: 0.75rem;

	@media (min-width: 992px) {
		font-size: 0.875rem;
	}
`;

export const CollectionLogo = styled(Img)`
	width: 1.5rem;
	height: auto;
	border-radius: 50%;
`;
