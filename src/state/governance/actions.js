import { createAction } from "@reduxjs/toolkit";

import Snapshot from "../../http/snapshot";
import { formatProposals } from "./hooks";
const api = new Snapshot();

export const setLoading = createAction("governance/loading", (value) => {
	return {
		payload: {
			value,
		},
	};
});

export const setSpaces = createAction("governance/spaces", (spaces) => {
	return {
		payload: {
			spaces,
		},
	};
});

export const setProposals = createAction("governance/proposals", (proposals, id) => {
	return {
		payload: {
			proposals,
			id,
		},
	};
});

export const fetchSpaces = () => {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const res = await api.get("spaces");
			dispatch(setSpaces(res));
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
		}
	};
};

export const fetchProposals = (id) => {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			let proposals = await api.get("proposals", { id });
			dispatch(setProposals(formatProposals(proposals), id));
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
		}
	};
};
