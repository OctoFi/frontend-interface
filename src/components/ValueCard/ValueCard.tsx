// import CurrencyText from "../CurrencyText";
import * as Styled from "./styleds";

export type PureValueCardProps = {
	value: string;
	title: string;
	image: any;
	color?: any;
};

export const PureValueCard = ({ value, title, color, image }: PureValueCardProps) => {
	return (
		<Styled.Card>
			<Styled.CardBody>
				<Styled.CardIcon color={color}>
					<Styled.Img src={image} alt="" />
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
