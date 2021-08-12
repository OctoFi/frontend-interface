import { Row, Col, Spinner } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useTranslation } from "react-i18next";

import LayoutBlockIcon from "../../assets/images/global/layout-block.svg";
import PlatformCard from "../PlatformCard";
import * as Styled from "./styleds";

export type PurePlatformsProps = {
	balance: Array<any>;
	loading?: boolean;
	onSelectPlatform: (T: string) => void;
};

export const PurePlatforms = ({ balance, onSelectPlatform, loading }: PurePlatformsProps) => {
	const { t } = useTranslation();

	if (loading) {
		return <Spinner animation="border" variant="primary" />;
	}

	if (balance.length === 0) {
		return (
			<Styled.Wrap className="d-flex flex-column align-items-center justify-content-center py-8 px-4">
				<SVG src={LayoutBlockIcon} width={64} height={64} />
				<h5 className="text-primary font-weight-bolder mb-3 mt-3">{t("errors.noPlatform")}</h5>
				<span className="text-dark-50">{t("errors.noPlatformDesc")}</span>
			</Styled.Wrap>
		);
	}

	return (
		<Row>
			{balance.map((b, index: number) => {
				return (
					<Col key={index} xs={12} md={4} className="mb-3">
						<PlatformCard
							image={b.metadata.logo.href}
							title={b.metadata.name}
							value={b.total.toFixed(4)}
							onClick={() => onSelectPlatform(b.metadata.name)}
						/>
					</Col>
				);
			})}
		</Row>
	);
};
