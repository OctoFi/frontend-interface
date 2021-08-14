import { useEffect, useMemo, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import OpenSeaApi from "../../../http/opensea";
import { useActiveWeb3React } from "../../../hooks";
import { PureNftWallet } from "./NftWallet";

export interface NftWalletProps {
	query?: any;
}

const NftWallet = ({ query }: NftWalletProps) => {
	const loader = useRef(null);
	const { account } = useActiveWeb3React();
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const api = new OpenSeaApi();
	const PAGE_SIZE: number = 20;

	const onLoadMore = () => setPage((p) => p + 1);

	const handleObserver = (entities: any) => {
		const target = entities[0];
		if (target.isIntersecting) {
			onLoadMore();
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
		setPage(1);
		setHasMore(true);
		setData([]);
		onLoadMore();
	}, [account]);

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
			return data.filter((token: any) => JSON.stringify(token).toLowerCase().includes(lowerQuery));
		}
	}, [data, query]);

	return (
		<>
			<PureNftWallet items={filteredData} />

			<div className="d-flex align-items-center justify-content-center" ref={loader}>
				{filteredData.length > 0 && (loading || hasMore) && (
					<div className="py-3 mt-3">
						<Spinner animation="border" variant="primary" id="nft-wallet-loader" />
					</div>
				)}
			</div>
		</>
	);
};

export default NftWallet;
