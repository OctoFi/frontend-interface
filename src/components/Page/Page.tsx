import { PropsWithChildren } from "react";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import AppBar from "../AppBar";
import Header from "../Header";
// import Toolbar from "../Toolbar";
import Footer from "../Footer";
import WrongNetwork from "../WrongNetwork";
import * as Styled from "./styleds";

export type PageProps = {
	title?: string;
	fluid?: boolean;
	networkSensitive?: boolean;
	hero?: any;
};

export const Page = ({
	title,
	fluid = false,
	networkSensitive = false,
	hero,
	children,
}: PropsWithChildren<PageProps>) => {
	const { chainId } = useActiveWeb3React();

	// TODO: verify this isn't needed
	// useEffect(() => {
	// 	document.body.scrollTo(0, 0);
	// }, []);

	return (
		<Styled.PageWrap>
			<Styled.PageContent>
				<Header />
				{/* <Toolbar /> */}
				{hero}
				<Styled.PageContainer className={`page ${fluid ? "container-fluid" : "container-lg"}`}>
					<div>
						{title && <Styled.Title>{title}</Styled.Title>}
						{networkSensitive ? !chainId || chainId === 1 ? children : <WrongNetwork /> : children}
					</div>
				</Styled.PageContainer>
				<Footer />
			</Styled.PageContent>

			<div className="d-block d-lg-none">
				<AppBar />
			</div>
		</Styled.PageWrap>
	);
};
