import { useTranslation } from "react-i18next";
import * as Styled from "./styleds";

// TODO: move to constants
const OrderType = {
	Limit: "Limit",
	Market: "Market",
};

export interface PureOrderDetailsProps {
    cost: string;
    label: string;
    orderType?: any;
    medianPrice?: string;
}

export const PureOrderDetails = ({ cost, label, orderType, medianPrice }: PureOrderDetailsProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Styled.Row>
                <Styled.Text>{label}</Styled.Text>
                <Styled.Text>{cost}</Styled.Text>
            </Styled.Row>
            {orderType === OrderType.Market && (
                <Styled.Row>
                    <Styled.Text>{t("medianPrice")}:</Styled.Text>
                    <Styled.Text>{medianPrice}</Styled.Text>
                </Styled.Row>
            )}
        </>
    );
}
