import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { Menu } from "react-feather";
import { isMobile } from "react-device-detect";
import LogoImage from "../../assets/images/logo.svg";
import { useActiveWeb3React } from "../../hooks";
import { emitter } from "../../lib/helper";
import { useWalletModalToggle } from "../../state/application/hooks";
import HeaderDropdown from "../HeaderDropdown";
import BrandLogo from "../BrandLogo";
import MobileMenu from "../MobileMenu";

const Header = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [callback, setCallback] = useState({
		action: undefined,
	});

	const dismissHandler = () => {
		setMobileMenu(false);
	};

	useEffect(() => {
		// @ts-ignore
		const setModalCallback = (e) => {
			setCallback({
				action: e.action,
			});
		};

		const removeModalCallback = () => {
			setCallback({
				action: undefined,
			});
		};

		emitter.on("open-modal", setModalCallback);
		emitter.on("close-modal", removeModalCallback);

		return () => {
			emitter.off("open-modal", setModalCallback);
			emitter.off("close-modal", removeModalCallback);
		};
	}, []);

	return (
		<>
			<MobileMenu open={mobileMenu} onDismiss={dismissHandler} />
			{/* @ts-ignore */}
			<Styled.Container hasCallback={callback.action !== undefined}>
				<div className="container-lg">
					<Styled.HeadNavbar expand={"lg"}>
						<div className="back-button d-lg-none">
							<Styled.BackButton onClick={callback.action} hasCallback={callback.action !== undefined}>
								<SVG src={require("../../assets/images/global/arrow-left.svg").default} />
							</Styled.BackButton>
						</div>

						<Styled.HeaderInner>
							<Styled.NavbarBrand hasCallback={callback.action !== undefined}>
								{isMobile ? (
									<BrandLogo logo={LogoImage} name={process.env.REACT_APP_BRAND} hideName={true} />
								) : (
									<BrandLogo logo={LogoImage} name={process.env.REACT_APP_BRAND} />
								)}
							</Styled.NavbarBrand>
							<Styled.MenuButton
								variant="link"
								onClick={() => setMobileMenu(true)}
								className="d-flex d-lg-none"
							>
								{/* src={require("../../assets/images/menu.svg").default} */}
								<Menu size={24} />
							</Styled.MenuButton>
						</Styled.HeaderInner>
					</Styled.HeadNavbar>
				</div>
			</Styled.Container>
		</>
	);
};

export default Header;
