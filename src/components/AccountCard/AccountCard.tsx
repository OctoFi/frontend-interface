import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import SVG from "react-inlinesvg";
import { Button } from "react-bootstrap";

import ArrowRightIcon from "../../assets/images/global/arrow-right.svg";
import { PureCurrencyText } from "../CurrencyText/CurrencyText";
import * as Styled from "./styleds";

export interface PureAccountCardProps {
	color?: string;
	title: string;
	value: string | number;
	assets?: any;
	onShowMore?: () => void;
	loading?: boolean;
	icon: string;
}

export const PureAccountCard = ({
	color = "primary",
	title,
	value = "0",
	assets,
	onShowMore,
	loading = false,
	icon,
	children,
}: PropsWithChildren<PureAccountCardProps>) => {
	const { t } = useTranslation();

	const showCardBody = children && assets?.balances?.length > 0;
	const showCardAction = assets?.balances?.length > 5;

	return (
		<Styled.Card>
			<Styled.CardHeader>
				<Styled.CardIcon color={color}>
					<Styled.CardImg src={icon} />
				</Styled.CardIcon>

				<Styled.CardHeaderContent>
					<Styled.Title>{title}</Styled.Title>
					<Styled.Value>{loading ? <Skeleton width={120} /> : <PureCurrencyText value={value} />}</Styled.Value>
				</Styled.CardHeaderContent>
			</Styled.CardHeader>

			{showCardBody && (
				<Styled.CardBody>
					<div className={"d-flex flex-column w-100 flex-grow-1"}>
						<div className={"flex-grow-1 align-self-stretch"}>{children}</div>

						{showCardAction && (
							<div className={"d-flex justify-content-end"}>
								<Button variant={"link"} onClick={onShowMore} className="d-flex align-items-center">
									<span>{t("more")}</span>
									<SVG src={ArrowRightIcon} width={8} height={12} className="ms-3" />
								</Button>
							</div>
						)}
					</div>
				</Styled.CardBody>
			)}
		</Styled.Card>
	);
};
