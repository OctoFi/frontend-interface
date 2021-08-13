import styled from "styled-components";
import Card from "../Card";

export const CustomCard = styled(Card)`
	border: 1px solid ${({ theme }) => theme.borderColor2};
	overflow: hidden;

	.card-header {
		border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
	}
	.card-body {
		padding: 0;
	}
`;

export const Title = styled.h2`
	font-weight: 700;
	font-size: 1.25rem;
	margin-top: 0;
	margin-bottom: 0;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 30px;
`;

export const SectionTitle = styled.h4`
	color: ${({ theme }) => theme.text1};
	font-weight: 700;
	font-size: 1rem;
	margin: 0;

	@media (min-width: 768px) {
		font-size: 1.25rem;
	}
`;

export const SectionSubTitle = styled.p`
	color: ${({ theme }) => theme.text1};
	font-weight: 400;
	font-size: 1rem;
	margin: 0;
`;
