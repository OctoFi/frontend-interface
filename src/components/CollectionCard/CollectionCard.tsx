import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import SVG from "react-inlinesvg";
import * as Styled from "./styleds";

export interface CollectionCardProps {
	collection: any;
	selected?: boolean;
	clickHandler?: () => void;
}

export const CollectionCard = ({ collection, selected, clickHandler }: CollectionCardProps) => {
	const loading = collection.loading;

	const skeletons = useMemo(() => {
		const result = [];
		if (loading) {
			const count = Math.floor(Math.random() * 2 + 1);
			for (let i = 0; i < count; i++) {
				const width = Math.floor(Math.random() * (count > 2 ? 50 : 70) + 30);
				result.push(<Skeleton width={width} className={"mr-2"} />);
			}
		}

		return result;
	}, [loading]);

	return (
		<Styled.Wrapper onClick={clickHandler}>
			{loading ? (
				<>
					<Styled.LogoContainer>
						<Skeleton width={"100%"} height={"100%"} circle />
					</Styled.LogoContainer>
					{skeletons}
				</>
			) : (
				<>
					<Styled.LogoContainer>
						<Styled.Overlay selected={selected}>
							<SVG src={require("../../assets/images/close.svg").default} width={10} height={10} />
						</Styled.Overlay>
						<Styled.Logo src={collection.image_url} alt={collection.name} />
					</Styled.LogoContainer>
					<Styled.Name>{collection.name}</Styled.Name>
				</>
			)}
		</Styled.Wrapper>
	);
};
