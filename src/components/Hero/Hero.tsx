import { useTranslation } from "react-i18next";
import SVG from "react-inlinesvg";
import Hero1 from "../../assets/images/hero.png";
import Wave from "../../assets/wave.svg";
import * as Styled from "./styleds";

export interface PureHeroProps {
	connected: boolean;
	onCallToAction?: () => void;
}

export const PureHero = ({ connected = false, onCallToAction }: PureHeroProps) => {
	const { t } = useTranslation();

	return (
		<Styled.Hero>
			<div className="text-center">
				<Styled.Image src={Hero1} alt="OctoFi" />
			</div>

			<div className="text-center">
				<Styled.Title>{t("app.description")}</Styled.Title>
				<div className="align-items-center align-self-stretch align-self-sm-auto justify-content-center text-center">
					<Styled.CtaButton variant={"outline-light"} onClick={onCallToAction} size={"lg"}>
						{connected ? t("homepage.callToAction") : t("wallet.connect")}
					</Styled.CtaButton>
				</div>
			</div>

			<Styled.WavePosition>
				<SVG src={Wave} />
			</Styled.WavePosition>
		</Styled.Hero>
	);
};
