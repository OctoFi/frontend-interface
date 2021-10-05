import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ExchangeIcon from "../Icons/Exchange";

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

	return (
		<>
			{finished && sections.length === 0 && (
				<div className="d-flex flex-column align-items-center justify-content-center py-5 px-4">
					<ExchangeIcon size={48} fill={"#6993FF"} color={"#6993FF"} />
					<h5 className="text-primary fw-bolder mb-3 mt-5">{t("errors.noTransaction")}</h5>
					<span className="text-muted fw-light fs-5">{t("errors.noTransactionDesc")}</span>
				</div>
			)}

			{sections.map((section, index) => {
				return (
					<Card key={`${section.title}-${index}`} className="bg-dark text-white">
						<Card.Header className="d-flex align-items-center justify-content-between">
							<div>
								<h3 className="mb-0 fs-5">{section.title}</h3>
								{section.description && <p className="fw-bold mt-2 mb-0">{section.description}</p>}
							</div>
							{section.headerAction || null}
						</Card.Header>
						<Card.Body className="p-0">
							<Accordion flush defaultActiveKey={`accordion-${index}-0`}>
								{section.content}
							</Accordion>
						</Card.Body>
					</Card>
				);
			})}

			{!finished && (
				<div className="d-flex align-items-center justify-content-around py-4">
					<Button onClick={onLoadMore} disabled={loading}>
						{loading ? <Spinner animation="border" role="status" /> : "Load More"}
					</Button>
				</div>
			)}
		</>
	);
};
