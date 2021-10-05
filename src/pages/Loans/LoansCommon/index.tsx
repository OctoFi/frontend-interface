import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { useActiveWeb3React } from "../../../hooks";
import useInterval from "../../../hooks/useInterval";
import { GET_AAVE_RESERVES } from "../../../services/aave/gql";
import { getAaveGraphClient } from "../../../services/aave/aave";
import { getAaveLoadingState } from "../../../state/selectors";
import { fetchAave, initAave, setAaveReservesGQLResponse } from "../../../state/aave/actions";
import { AaveLoadingState } from "../../../utils/aave/types";
import { PureLoansCommon } from "./LoansCommon";

const LoansCommon = () => {
	const { account } = useActiveWeb3React();
	const { loading, error, data } = useQuery(GET_AAVE_RESERVES, {
		client: getAaveGraphClient(),
		pollInterval: 1000,
	});
	const dispatch = useDispatch();
	const aaveLoadingState = useSelector(getAaveLoadingState);

	useEffect(() => {
		if (!loading && !error && data) {
			dispatch(setAaveReservesGQLResponse(data.reserves));
			if (aaveLoadingState === AaveLoadingState.NotLoaded) {
				dispatch(initAave(account));
			} else {
				dispatch(fetchAave(account));
			}
		}
	}, [loading, data, account]);

	// Update Aaave state each 60 seconds
	useInterval(async () => {
		if (account && data && !loading && !error) {
			dispatch(fetchAave(account));
		}
	}, 60 * 1000);

	return <PureLoansCommon />;
};

export default LoansCommon;
