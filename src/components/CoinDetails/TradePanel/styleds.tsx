import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "../../Card";

export const BalanceCard = styled(Card)`
	.card-body {
		padding: 20px 30px;
	}

	@media (max-width: 991px) {
		margin-bottom: 40px;

		.card-body {
			padding: 20px 15px;
		}
	}
`;

export const BalanceText = styled.span`
	font-weight: 400;
	font-size: 0.875rem;
	margin-bottom: 20px;

	@media (min-width: 991px) {
		margin-bottom: 0;
		font-size: 1rem;
	}
`;

export const BalanceValue = styled.span`
	font-weight: 700;
	font-size: 1rem;
`;

export const BuyHelper = styled.span`
	font-weight: 400;
	font-size: 1rem;

	@media (max-width: 991px) {
		margin-bottom: 30px;
	}
`;

export const BuyLink = styled(Link)`
	flex: 1;
	display: flex;
	flex-direction: column;
`;
