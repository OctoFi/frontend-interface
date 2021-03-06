import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import aos from "aos";
import Web3 from "web3";

import { useActiveWeb3React } from "../../hooks";
import useParsedQueryString from "../../hooks/useParsedQueryString";
import { PureHome } from "./Home";

const Home = () => {
	const { account } = useActiveWeb3React();
	const queryString = useParsedQueryString();
	const { t } = useTranslation();
	const message = account ? t("errors.notFound") : t("errors.walletConnect");

	useEffect(() => {
		const web3 = new Web3(Web3.givenProvider);
		web3.eth.getAccounts((err, res) => {
			if (err) {
				console.log(err);
			}

			console.log(res);
		});
	}, []);

	useEffect(() => {
		aos.init();
	}, []);

	useEffect(() => {
		if (queryString && queryString.error) {
			toast.error(message);
		}
	}, [queryString, message]);

	return <PureHome />;
};

export default Home;
