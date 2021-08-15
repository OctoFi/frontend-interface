import * as Styled from "./styleds";

export type PureCircleLoadingProps = {
	paused?: boolean;
};

export const PureCircleLoading = ({ paused = false }: PureCircleLoadingProps) => {
	return (
		<svg width="24px" height="24px" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="8" fill="transparent" stroke="#eee" strokeWidth="2" />
			{!paused && (
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
