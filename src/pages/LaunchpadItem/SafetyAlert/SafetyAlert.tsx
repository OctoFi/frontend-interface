import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { AlertTriangle } from "react-feather";

import Card from "../../../components/Card";
import * as Styled from "./styleds";

export interface PureSafetyAlertProps {
	show?: boolean;
	onDismiss?: () => void;
}

export const PureSafetyAlert = ({ show = true, onDismiss }: PureSafetyAlertProps) => {
	const { t } = useTranslation();

	return (
		<Card className={!show && "d-none"}>
			<div className="d-flex align-items-center mb-3">
				<AlertTriangle className="text-danger me-2" />
				<Styled.Title>{t("launchpad.safetyAlert")}</Styled.Title>
			</div>
			<Styled.Content>{t("launchpad.safetyAlertContent")}</Styled.Content>
			<div className="d-flex align-items-center justify-content-end">
				<Button variant="outline-danger" onClick={onDismiss}>
					{t("importToken.understand")}
				</Button>
			</div>
		</Card>
	);
};
