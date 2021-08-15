import styled from "styled-components";

export const CustomTitle = styled.h4`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.25rem;

	@media (max-width: 767px) {
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 100px;
		overflow: hidden;
	}
`;

export const Text = styled.span`
	color: ${({ theme }) => theme.text1};
	font-size: 0.875rem;
	font-weight: 700;
`;

export const PlatformName = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text1};
`;

export const PoolsButton = styled.button`
	border-radius: 12px;
	background-color: ${({ theme }) => theme.bg1};
	padding: 6px 18px;
	max-height: 40px;
	min-height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	font-size: 1rem;
	font-family: inherit;
	font-weight: 500;
	border: none;
	outline: none;

	&:hover,
	&:focus,
	&:active {
		outline: none;
		box-shadow: none;
	}
`;

export const AddLiquidityButton = styled(PoolsButton)`
	color: ${({ theme }) => theme.primary};
	transition: 0.4s ease all;

	&:hover {
		color: ${({ theme }) => theme.bg1};
		background-color: ${({ theme }) => theme.primary};
	}
`;

export const WithdrawButton = styled(PoolsButton)`
	color: ${({ theme }) => theme.secondary};
	transition: 0.4s ease all;

	&:hover {
		color: ${({ theme }) => theme.bg1};
		background-color: ${({ theme }) => theme.secondary};
	}
`;
