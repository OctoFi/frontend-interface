import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const Text = styled.span`
	color: ${({ theme }) => theme.text1};
	font-weight: 500;
	font-size: 0.875rem;

	@media (min-width: 768px) {
		font-size: 1rem;
	}
`;

export const Volume = styled(Text)`
	fontsize: 1rem;
`;

export const Value = styled.span<{ variant?: any }>`
	font-size: 1.25rem;
	font-weight: 500;
	color: ${({ theme, variant }) => (variant ? theme[variant] : theme.success)};
	margin-right: 1.25rem;

	@media (min-width: 768px) {
		font-size: 1.5rem;
	}
`;

export const PriceChange = styled.span<{ variant?: any }>`
	display: inline-flex;
	height: 32px;
	padding: 5px 15px;
	font-size: 1rem;
	border-radius: 8px;
	color: ${({ theme, variant }) => (variant ? theme[variant] : theme.success)};
	background-color: ${({ variant }) =>
		!variant || variant === "success" ? "rgba(74, 200, 170, 0.15)" : "rgba(235, 107, 107, 0.15)"};

	@media (min-width: 768px) {
		height: 40px;
		padding: 8px 20px;
	}
`;
