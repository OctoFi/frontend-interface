import { Row, Col, Button } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { OfframpItem } from "../../data/OfframpItems";
import * as Styled from "./styleds";

export interface OfframpListProps {
	items: Array<OfframpItem>;
}

export const OfframpList = ({ items }: OfframpListProps) => {
	return (
		<Row>
			{items.map((item, index) => {
				return (
					<Col xs={12} sm={6} lg={4} xl={3} key={`fiat-off-item-${index}`}>
						<Styled.InnerCard>
							<Styled.ItemImageContainer>
								<Styled.ItemImage src={item.thumbnail} alt={item.title} />
							</Styled.ItemImageContainer>
							<Styled.ItemContent>
								<Styled.ItemList>
									{item.traits.map((trait, idx) => {
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
								<Button
									as={"a"}
									href={item.url}
									target={"_blank"}
									rel={"noreferrer noopener"}
									size="lg"
								>
									Go to {item.title}
								</Button>
							</Styled.ItemContent>
						</Styled.InnerCard>
					</Col>
				);
			})}
		</Row>
	);
};
