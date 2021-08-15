import { useTranslation } from "react-i18next";
import CircleLoading from "../../CircleLoading";
import * as Styled from "./styleds";

export type RefreshRatesButtonProps = {
	loading?: boolean;
	priceLoading?: boolean;
	onRefresh: () => void;
};

const RefreshRatesButton = ({ loading, priceLoading, onRefresh }: RefreshRatesButtonProps) => {
	const { t } = useTranslation();

	return (
		<Styled.LoadingContainer onClick={onRefresh}>
			<Styled.LoadingText>{t("instantSwap.refreshPrice")}</Styled.LoadingText>
			<span className="text-primary">
				<CircleLoading paused={loading || priceLoading} />
			</span>
		</Styled.LoadingContainer>
	);
};

export default RefreshRatesButton;
