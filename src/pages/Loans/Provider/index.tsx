import { ApolloProvider } from "@apollo/react-hooks";
import { getAaveGraphClient } from "../../../services/aave/aave";

const GraphQlProvider = ({ children }: { children?: any }) => {
	return <ApolloProvider client={getAaveGraphClient()}>{children}</ApolloProvider>;
};

export default GraphQlProvider;
