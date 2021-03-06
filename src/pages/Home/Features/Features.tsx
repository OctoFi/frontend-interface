import { useTranslation } from "react-i18next";
import Slider from "react-slick";

import { FeatureItems } from "../../../data/FeatureItems";
import FeatureItem from "../../../components/FeatureItem";
import * as Styled from "./styleds";

export const Features = () => {
	const { t } = useTranslation();

	const settings = {
		className: "slider w-100",
		dots: true,
		arrows: false,
		infinite: false,
		centerMode: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		centerPadding: "20px",
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
		],
		dotsClass: "features__dots slick-dots",
	};

	return (
		<Styled.Features>
			<h3 className="text-center mb-5">{t("app.getInTouch")}</h3>
			<Styled.Container>
				<Styled.Inner>
					<Slider {...settings}>
						{FeatureItems.map((feature, index) => {
							return (
								<FeatureItem
									key={`feature-${index}`}
									href={feature.href}
									iconName={feature.iconName}
									title={t(feature.title)}
								>
									{t(feature.desc)}
								</FeatureItem>
							);
						})}
					</Slider>
				</Styled.Inner>
			</Styled.Container>
		</Styled.Features>
	);
};
