import { Row, Col } from "react-bootstrap";
import Card from "../../Card";
import * as Styled from "./styleds";

export interface CoinInformationProps {
	coin: any;
}

export const CoinInformation = ({ coin }: CoinInformationProps) => {
	if(!coin) {
		return null;
	}
	return (
		<Card header={true} title={"Coin Information"}>
			<Row>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Currency Name</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsValue>{coin.name}</Styled.DetailsValue>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Symbol</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsValue>{coin.symbol.toUpperCase()}</Styled.DetailsValue>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Website</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.homepage[0]}
								href={coin.links.homepage[0]}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.homepage[0]}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Whitepaper</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.ico_data}
								href={coin.ico_data ? coin.ico_data.links.whitepaper : "#"}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.ico_data ? coin.ico_data.links.whitepaper : "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Block Explorer</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.blockchain_site[0]}
								href={coin.links.blockchain_site[0] || "#"}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.blockchain_site[0] || "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Github</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.repos_url.github[0]}
								href={coin.links.repos_url.github[0] || "#"}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.repos_url.github[0] || "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Twitter</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.twitter_screen_name}
								href={
									coin.links.twitter_screen_name
										? `https://twitter.com/${coin.links.twitter_screen_name}`
										: "#"
								}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.twitter_screen_name
									? `https://twitter.com/${coin.links.twitter_screen_name}`
									: "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Facebook</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.facebook_username}
								href={
									coin.links.facebook_username
										? `https://facebook.com/${coin.links.facebook_username}`
										: "#"
								}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.facebook_username
									? `https://facebook.com/${coin.links.facebook_username}`
									: "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Reddit</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.subreddit_url}
								href={coin.links.subreddit_url || "#"}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.subreddit_url || "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Telegram</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.telegram_channel_identifier}
								href={
									coin.links.telegram_channel_identifier
										? `https://t.me/${coin.links.telegram_channel_identifier}`
										: "#"
								}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.telegram_channel_identifier
									? `https://t.me/${coin.links.telegram_channel_identifier}`
									: "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
				<Col className="mb-3" xs={12} md={6}>
					<Row className="d-flex flex-row align-items-center justify-content-between">
						<Styled.DetailsInnerCol lg={4}>
							<Styled.DetailsDesc>Bitcoin Talk</Styled.DetailsDesc>
						</Styled.DetailsInnerCol>
						<Styled.DetailsInnerCol
							lg={8}
							className="d-flex align-items-center justify-content-end justify-content-lg-start"
						>
							<Styled.DetailsLink
								withUnderline={coin.links.bitcointalk_thread_identifier}
								href={
									coin.links.bitcointalk_thread_identifier
										? `https://bitcointalk.org/index.php?topic=${coin.links.bitcointalk_thread_identifier}`
										: "#"
								}
								target={"_blank"}
								rel={"noopener noreferrer"}
							>
								{coin.links.bitcointalk_thread_identifier
									? `https://bitcointalk.org/index.php?topic=${coin.links.bitcointalk_thread_identifier}`
									: "-"}
							</Styled.DetailsLink>
						</Styled.DetailsInnerCol>
					</Row>
				</Col>
			</Row>
		</Card>
	);
};
