// import CurrencyText from "../CurrencyText";
import * as Styled from "./styleds";

export interface PureOverviewCardProps {
	title: string;
	value: string | null;
	image: any;
	onClick?: () => void;
}

export const PureOverviewCard = ({ title, value, image, onClick }: PureOverviewCardProps) => {
	return (
		<Styled.Card onClick={onClick}>
			<Styled.CardBody>
				<Styled.CardIcon>
					<Styled.CardImage src={image} alt={title} />
				</Styled.CardIcon>

				<Styled.CardContent>
					<Styled.Title>{title}</Styled.Title>
					<Styled.Value>
						{/* <CurrencyText value={value} /> */}
						{value}
					</Styled.Value>
				</Styled.CardContent>
			</Styled.CardBody>
		</Styled.Card>
	);
};
