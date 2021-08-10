import SVG from "react-inlinesvg";
import * as Styled from "./styleds";

export interface PureSocialLinkListProps {
	items: Array<any>;
}

export const PureSocialLinkList = ({ items }: PureSocialLinkListProps) => {
	return (
		<div className="d-flex align-items-center justify-content-between">
			<Styled.SocialList>
				{items.map((item, i) => {
					return (
						<Styled.SocialItem key={item.name + i}>
							<Styled.SocialLink href={item.url} target={"_blank"} rel={"noopener noreferrer"}>
								<SVG src={item.image} />
							</Styled.SocialLink>
						</Styled.SocialItem>
					);
				})}
			</Styled.SocialList>
		</div>
	);
};
