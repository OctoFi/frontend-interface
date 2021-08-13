import { useEffect, useState, useMemo, useCallback } from "react";

import OpenSeaApi from "../../http/opensea";
import { useActiveWeb3React } from "../../hooks";
import { PureCollections } from "./Collections";

const api = new OpenSeaApi();

export interface CollectionsProps {
	onChangeCollection?: () => void;
	selected?: boolean;
}

const Collections = ({ onChangeCollection, selected }: CollectionsProps) => {
	const { account } = useActiveWeb3React();
	const [loading, setLoading] = useState(true);
	const [collections, setCollections] = useState([]);
	const [query, setQuery] = useState("");

	const filteredCollections = useMemo(() => {
		if (query === "") {
			return collections;
		} else {
			const lowerQuery = query.toLowerCase();
			return collections.filter((c) => JSON.stringify({ n: c.name, d: c.description }).includes(lowerQuery));
		}
	}, [collections, query]);

	const changeQueryHandler = useCallback((e) => {
		setQuery(e.target.value);
	}, []);

	useEffect(() => {
		setLoading(true);
		api.get("collections", {
			params: {
				limit: 300,
			},
		})
			.then((response) => {
				setLoading(false);
				if (response.data.hasOwnProperty("collections")) {
					setCollections(response.data.collections);
				}
			})
			.catch((e) => {
				setLoading(false);
			});
	}, [account]);

	return (
		<PureCollections
			onSearch={changeQueryHandler}
			collections={filteredCollections}
			loading={loading}
			onChangeCollection={onChangeCollection}
			selected={selected}
		/>
	);
};

export default Collections;
