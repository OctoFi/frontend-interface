import { useTranslation } from "react-i18next";
import LaunchpadCard from "../../../components/LaunchpadCard";
import * as Styled from "./styleds";

export interface PurePresaleTabProps {
	presales: Array<any>;
}

export const PurePresaleTab = ({ presales }: PurePresaleTabProps) => {
	const { t } = useTranslation();

	return (
		<div>
			<div className="d-flex align-items-center justify-content-between mb-3">
				<Styled.PresaleCount>{presales.length} Presale</Styled.PresaleCount>
			</div>
			<div className="d-flex align-items-stretch flex-column">
				{presales.length === 0 ? (
					<Styled.NoPresale>{t("launchpad.noPresale")}</Styled.NoPresale>
				) : (
					presales.map((item, index) => {
						return (
							<LaunchpadCard
								key={item.contractAddress || `presale-${index}`}
								address={item.contractAddress}
								presale={item}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};
