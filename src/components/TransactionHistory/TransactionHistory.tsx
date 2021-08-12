import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ExchangeIcon from "../Icons/Exchange";
import * as Styled from "./styleds";

export type HistorySection = {
	title: string;
	content: JSX.Element[];
	description?: string;
	headerAction?: any;
};

export type PureTransactionHistoryProps = {
	sections: Array<HistorySection>;
	finished?: boolean;
	loading?: boolean;
	onLoadMore?: () => void;
};

export const PureTransactionHistory = ({ sections, finished, loading, onLoadMore }: PureTransactionHistoryProps) => {
	const { t } = useTranslation();

	if (!sections.length) {
		return null;
	}

	return (
		<>
			{finished && sections.length === 0 && (
				<div className="d-flex flex-column align-items-center justify-content-center py-5 px-4">
					<ExchangeIcon size={48} fill={"#6993FF"} color={"#6993FF"} />
					<h5 className="text-primary font-weight-bolder mb-3 mt-5">{t("errors.noTransaction")}</h5>
					<span className="text-muted font-weight-light font-size-lg">{t("errors.noTransactionDesc")}</span>
				</div>
			)}

			{sections.map((section, index) => {
				return (
					<section key={`${section.title}-${index}`}>
						<Styled.SectionHeader>
							<div>
								<Styled.SectionTitle>{section.title}</Styled.SectionTitle>
								{section.description && (
									<Styled.SectionSubTitle>{section.description}</Styled.SectionSubTitle>
								)}
							</div>
							{section.headerAction || null}
						</Styled.SectionHeader>

						<div>{section.content}</div>
					</section>
				);
			})}

			{!finished && (
				<div className="d-flex flex-column align-items-center py-4">
					<Button onClick={onLoadMore} disabled={loading}>
						{loading ? "Loading…" : "Load More"}
					</Button>
				</div>
			)}
		</>
	);
};
