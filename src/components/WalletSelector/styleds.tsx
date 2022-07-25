import styled from "styled-components";

export const WalletGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;
