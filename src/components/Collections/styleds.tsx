import styled from "styled-components";
import { lighten } from "polished";
import { InputGroup } from "../Form";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CustomInputGroup = styled(InputGroup)`
	margin-bottom: 20px;

	.input-group-text {
		padding-left: 1.25rem;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 600px;
	overflow-x: hidden;
	overflow-y: auto;

	/* width */
	::-webkit-scrollbar {
		width: 3px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: none;
		background-color: transparent;
		border-radius: 10px;
		padding: 0 6px;
		margin: 0 6px;
		border-right: 1px solid ${({ theme }) => theme.text1};
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.text1};
		border-radius: 10px;
		width: 4px !important;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => lighten(0.08, theme.text1)};
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CollectionsList = styled.ul`
	margin: 0;
	padding: 0;
`;

export const CollectionsItem = styled.li`
	&:not(:last-child) {
		margin-bottom: 20px;
	}
`;
