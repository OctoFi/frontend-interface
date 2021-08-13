import { useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import OpenSeaApi from "../../../http/opensea";
import { useActiveWeb3React } from "../../../hooks";
import NftItem from "../NftItem";

export interface NftWalletProps {
	query?: any;
}

export const NftWallet = ({ query }: NftWalletProps) => {
	const { account } = useActiveWeb3React();
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const loader = useRef(null);
	const api = new OpenSeaApi();
	const PAGE_SIZE: number = 20;

	const loadMore = () => {
		setPage((p) => {
			return p + 1;
		});
	};

	const handleObserver = (entities: any) => {
		const target = entities[0];
		if (target.isIntersecting) {
			loadMore();
		}
	};

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};

		const observer = new IntersectionObserver(handleObserver, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
	}, []);

	useEffect(() => {
		if (hasMore) {
			api.get("userAssets", {
				params: {
					limit: PAGE_SIZE,
					offset: (page - 1) * PAGE_SIZE,
				},
				// @ts-ignore
				address: account,
			}).then((response) => {
				setLoading(false);

				if (response?.data) {
					setData((data) => data.concat(response.data?.assets));
					if (response.data.assets?.length < PAGE_SIZE) {
						setHasMore(false);
					}
				}
			});
		}
	}, [page]);

	const filteredData = useMemo(() => {
		if (query === "") {
			return data;
		} else {
			const lowerQuery = query.toLowerCase();
			return data.filter((token: any) => JSON.stringify(token.metadata).toLowerCase().includes(lowerQuery));
		}
	}, [data, query]);

	return (
		<>
			<Row>
				{filteredData.map((item: any, index: number) => {
					return (
						<Col key={`nft-${index}`}>
							<NftItem item={item} />
						</Col>
					);
				})}
			</Row>

			<div className="d-flex align-items-center justify-content-center mt-3" ref={loader}>
				{loading ||
					(hasMore && (
						<div className="py-3">
							<Spinner animation="border" variant="primary" id="nft-wallet-loader" />
						</div>
					))}
			</div>
		</>
	);
};
