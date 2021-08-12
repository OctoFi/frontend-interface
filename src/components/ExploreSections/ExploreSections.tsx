import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import { Button, Spinner } from "react-bootstrap";
import Slider from "react-slick";

import { AppState } from "../../state";
import { fetchTokens } from "../../state/explore/actions";

import ExploreCard from "../ExploreCard";
import ExploreSection from "../ExploreSection";
import ExchangeIcon from "../Icons/Exchange";

import "./style.scss";
import * as Styled from "./styleds";

export const ExploreSections = () => {
	const exploreSections = useSelector((state: AppState) => state.explore);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTokens());
	}, []);

	const sections = Object.keys(exploreSections).map((sec) => {
		const data = exploreSections[sec];

		const settings = {
			className: "slider w-100",
			dots: true,
			arrows: false,
			infinite: false,
			centerMode: false,
			slidesToShow: 3,
			slidesToScroll: 3,
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

			dotsClass: "explore__dots slick-dots",
		};

		return {
			title: data.title,
			description: data.description,
			headerAction: data.seeMore && (
				<div>
					<Button variant={"outline-primary"} href={data.seeMore}>
						See More
					</Button>
				</div>
			),
			content: data.loading ? (
				<div className="d-flex align-items-center justify-content-center py-6 w-100">
					<Spinner animation="border" variant="primary" id={"explore-loading"} />
				</div>
			) : (
				<Slider {...settings}>
					{[...Array(5)].map((item, index) => {
						let row = data.data[index];
						let imageComponent = sec === "derivatives" && (
							<Styled.TypeIcon>
								<ExchangeIcon size={isMobile ? 16 : 28} color={"#1BC5BD"} fill={"#1BC5BD"} />
							</Styled.TypeIcon>
						);

						let dataItem = data.schema(row, imageComponent);
						return (
							<div className={"h-100"} key={index}>
								<ExploreCard key={index + data.title} {...dataItem} />
							</div>
						);
					})}
				</Slider>
			),
		};
	});

	return (
		<>
			{sections.map((section, index) => {
				return (
					<ExploreSection
						key={`section-list-${index}`}
						title={section.title}
						description={section.description}
						headerAction={section.headerAction}
						content={section.content}
						direction={"row"}
					/>
				);
			})}
		</>
	);
};
