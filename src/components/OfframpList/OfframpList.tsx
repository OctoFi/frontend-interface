import { Row, Col } from "react-bootstrap";
import OfframpItem from "../OfframpItem";

export interface PureOfframpListProps {
	items: Array<any>;
}

export const PureOfframpList = ({ items }: PureOfframpListProps) => {
	return (
		<Row>
			{items.map((item, index) => {
				return (
					<Col xs={12} sm={6} lg={4} xl={3} key={`fiat-off-item-${index}`}>
						<OfframpItem item={item} />
					</Col>
				);
			})}
		</Row>
	);
};
