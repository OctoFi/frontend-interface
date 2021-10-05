import Page from "../../components/Page";
import GraphQlProvider from "./Provider";
import GlobalOverall from "./GlobalOverall";
import LoansCommon from "./LoansCommon";
import ModalProvider from "./ModalProvider";

const Loans = () => {
	return (
		<Page title={"Loans"} networkSensitive={true}>
			<GraphQlProvider>
				<ModalProvider />
				<GlobalOverall />
				<LoansCommon />
			</GraphQlProvider>
		</Page>
	);
};

export default Loans;
