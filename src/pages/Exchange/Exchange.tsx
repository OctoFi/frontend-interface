import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/Page";
// import InstantSwap from "../../components/InstantSwap";
// import Uniswap from "../../components/Uniswap";

export const Exchange = () => {
	const { t } = useTranslation();

	return (
		<Page title={t("exchange.title")} networkSensitive={false}>
			<Row>
				<Col xs={12} md={6}>
					{/* <Uniswap /> */}
					{/* <InstantSwap /> */}
				</Col>
			</Row>
		</Page>
	);
};
