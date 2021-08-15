import styled from "styled-components";

export const StatsDesc = styled.span<{ last?: boolean }>`
	color: ${({ theme }) => theme.text3};
	font-size: 0.875rem;
	display: block;
	margin-bottom: 1.25rem;

	@media (max-width: 991px) {
		font-size: 0.75rem;
		color: ${({ theme }) => theme.text1};
		margin-bottom: ${({ last }) => (!last ? "0.875rem" : "0")};
	}
`;

export const StatsValue = styled.span<{ last?: boolean }>`
	color: ${({ theme }) => theme.text1};
	font-size: 1rem;
	font-weight: 700;

	@media (max-width: 991px) {
		font-size: 0.875rem;
		margin-bottom: ${({ last }) => (!last ? "0.875rem" : "0")};
	}
`;
