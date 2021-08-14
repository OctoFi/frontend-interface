import { Ratio } from "react-bootstrap";
// import moment from "moment";
import * as Styled from "./styleds";

export interface PureNftItemProps {
	item: any;
}

export const PureNftItem = ({ item }: PureNftItemProps) => {
	return (
		<Styled.Item href={item.permalink} target={"_blank"} rel={"noopener noreferrer"}>
			<Styled.Thumbnail as={Ratio} aspectRatio={"1x1"}>
				<Styled.ThumbnailImg
					src={item.image_preview_url || item.image_thumbnail_url || item.image_url}
					alt={item.name}
				/>
			</Styled.Thumbnail>
			<Styled.Name className={"mb-1"}>
				{item.name?.length > 16 ? item.name?.slice(0, 16) + "..." : item.name}
			</Styled.Name>

			{/* <Styled.Description>
				{item?.description?.length > 120 ? item?.description?.slice(0, 120) + "..." : item?.description}
			</Styled.Description>

			{item.collection && (
				<div className="d-flex align-items-center flex-row-reverse flex-lg-row">
					{item.collection.image_url !== null && (
						<Ratio aspectRatio={"1x1"} className="mb-2">
							<Styled.CollectionLogo src={item.collection.image_url} alt={item.name} />
						</Ratio>
					)}
					<p>{item.collection.name}</p>
				</div>
			)}

			<div className="d-flex align-items-center flex-row-reverse flex-lg-row">
				<p>{moment(item.asset_contract.created_date).format("YYYY-MM-DD<br/>HH:mm:ss")}</p>
			</div> */}
		</Styled.Item>
	);
};
