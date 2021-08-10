import { PropsWithChildren } from "react";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import AppBar from "../AppBar";
import Header from "../Header";
import Footer from "../Footer";
import WrongNetwork from "../WrongNetwork";
import { PageWrap, PageContent, PageContainer, Title } from "./styleds";
import Navigation from "../Navigation";

export type PageProps = {
	title?: string;
	fluid?: boolean;
	networkSensitive?: boolean;
};

export const Page = ({ title, fluid = false, networkSensitive = false, children }: PropsWithChildren<PageProps>) => {
	const { chainId } = useActiveWeb3React();

	// TODO: verify this isn't needed
	// useEffect(() => {
	// 	document.body.scrollTo(0, 0);
	// }, []);

	return (
		<PageWrap>
			<Header />
			<Navigation />
			<PageContent>
				<PageContainer className={`page ${fluid ? "container-fluid" : "container-lg"}`}>
					<div>
						{title && <Title>{title}</Title>}
						{networkSensitive ? !chainId || chainId === 1 ? children : <WrongNetwork /> : children}
					</div>
				</PageContainer>
				<Footer />
			</PageContent>

			<div className="d-block d-lg-none">
				<AppBar />
			</div>
		</PageWrap>
	);
};
