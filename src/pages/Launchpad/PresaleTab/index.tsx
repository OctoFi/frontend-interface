import { useMemo } from "react";
import { PurePresaleTab } from "./PresaleTab";

export interface PresaleTabProps {
	presales?: Array<any>;
	query?: string;
	state?: number;
}

const PresaleTab = ({ presales, query = "", state }: PresaleTabProps) => {
	const filteredPresales = useMemo(() => {
		if (!presales) {
			return [];
		}
		const stateFiltered = presales.filter((item: any) => item.state === state);
		if (query === "" || !query) {
			return stateFiltered;
		}
		return presales.filter((item: any) => JSON.stringify(item).indexOf(query) > -1);
	}, [query, state, presales]);

	return <PurePresaleTab presales={filteredPresales} />;
};

export default PresaleTab;
