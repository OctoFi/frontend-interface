import React from "react";
import { Button } from "react-bootstrap";
import SVG from "react-inlinesvg";
import * as Styled from "./styleds";

export type PureOfframpItemProps = {
	thumbnail: string;
	title: string;
	url: string;
	traits: Array<{
		title: string;
		icon: string;
	}>;
};

export const PureOfframpItem = ({ thumbnail, title, traits, url }: PureOfframpItemProps) => {
	return (
		<Styled.Wrap>
			<Styled.ItemImageContainer>
				<Styled.ItemImage src={thumbnail} alt={title} />
			</Styled.ItemImageContainer>
			<Styled.ItemContent>
				<Styled.ItemList>
					{traits.map((trait, idx) => {
						return (
							<Styled.ItemTrait key={`fiat-off-item-trait-${idx}`}>
								<Styled.ListIcon>
									<SVG src={trait.icon} width={24} height={24} />
								</Styled.ListIcon>
								<Styled.ListTitle>{trait.title}</Styled.ListTitle>
							</Styled.ItemTrait>
						);
					})}
				</Styled.ItemList>
				<Button as={"a"} href={url} target={"_blank"} rel={"noreferrer noopener"} size="lg">
					Go to {title}
				</Button>
			</Styled.ItemContent>
		</Styled.Wrap>
	);
};
