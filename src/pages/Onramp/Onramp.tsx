import { Row, Col } from "react-bootstrap";
import Card from "../../components/Card";
import Page from "../../components/Page";
import TransakButton from "../../components/TransakButton";
import TransakLogo from "../../assets/images/transak.png";

export const Onramp = () => {
	return (
		<Page title="Onramp">
			<Row>
				<Col xs={12} lg={4}>
					<Card>
						<img src={TransakLogo} height="60" alt="Transak logo" />
						<ul className="list-unstyled px-2 mt-3 mb-4">
							<li className="mb-1">Use credit, debit, or bank transfer.</li>
							<li className="mb-1">Receive it in your wallet.</li>
							<li className="mb-1">Start trading and investing instantly.</li>
						</ul>
						<div className="d-grid">
							<TransakButton />
						</div>
					</Card>
				</Col>
			</Row>
		</Page>
	);
};
