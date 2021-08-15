import styled from "styled-components";
import { Col } from "react-bootstrap";

export const DetailsInnerCol = styled(Col)`
	width: initial !important;
	flex: 1;
	max-width: 100%;
`;

export const DetailsDesc = styled.span`
	font-weight: 400;
	font-size: 1rem;

	@media (max-width: 991px) {
		font-size: 0.75rem;
	}
`;

export const DetailsValue = styled.span`
	font-weight: 700;
	font-size: 1rem;
	text-align: right;
	width: 100%;

	@media (max-width: 991px) {
		font-size: 0.875rem;
	}
`;

export const DetailsLink = styled.a<{ withUnderline?: boolean }>`
	color: ${({ theme }) => theme.primary};
	text-decoration: ${({ withUnderline }) => (withUnderline ? "underline" : "none")};
	font-weight: 700;
	font-size: 1rem;
	text-align: right;
	width: 100%;

	@media (max-width: 991px) {
		font-size: 0.875rem;
		font-weight: 400;
		max-width: 180px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;
