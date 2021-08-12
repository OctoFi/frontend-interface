import * as Styled from "./styleds";

export interface PureBookOptionProps {
	active?: boolean;
	onChange?: () => void;
	isSell?: boolean;
	isBuy?: boolean;
}

export const PureBookOption = ({ active, onChange, isSell, isBuy }: PureBookOptionProps) => {
	return (
		<Styled.Wrapper active={active} onClick={onChange}>
			<Styled.Cell variant={isSell && "danger"} />
			<Styled.Cell />
			<Styled.Cell variant={isBuy && "success"} />
		</Styled.Wrapper>
	);
};
