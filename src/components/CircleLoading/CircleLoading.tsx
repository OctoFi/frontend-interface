import * as Styled from "./styleds";

export type PureCircleLoadingProps = {
	waiting?: boolean;
};

export const PureCircleLoading = ({ waiting = false }: PureCircleLoadingProps) => {
	return (
		<svg width="24px" height="24px" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="8" fill="transparent" stroke="#eee" strokeWidth="2" />
			{waiting && (
				<Styled.Circle
					transform="rotate(-90 12 12)"
					cx="12"
					cy="12"
					r="8"
					fill="transparent"
					stroke="currentColor"
					strokeWidth="2"
				/>
			)}
		</svg>
	);
};
