import React from "react";
import ReactApexChart from "react-apexcharts";
import { isMobile } from "react-device-detect";
import moment from "moment";
// import "./style.scss";

export interface ChartProps {
	color?: any;
	selected?: any;
	categories?: any;
	theme?: any;
	series?: any;
	minHeight?: any;
	token?: any;
}

export const Chart = ({ color, selected, categories, theme, series, minHeight, token }: ChartProps) => {
	// const [options, setOptions] = useState();
	const options = {
		chart: {
			id: "area-datetime",
			height: 300,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			sparkline: {
				enabled: false,
			},
			animations: {
				enabled: false,
			},
			type: "area",
		},
		markers: {
			size: 0,
			style: "hollow",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 4,
			curve: "smooth",
		},
		colors: [color],
		xaxis: {
			categories: categories,
			tickAmount: 6,
			labels: {
				show: true,
				formatter: (value: any, timestamp: any) => {
					const m = moment(value);
					return m.format(
						selected === "day"
							? "DD MMM, HH:mm"
							: selected === "week" || selected === "month"
							? "DD MMM"
							: selected === "six_month" || selected === "year"
							? "YYYY-MM-DD"
							: "DD MMM"
					);
				},
				style: {
					cssClass: "chart__label",
				},
				rotate: !isMobile ? 0 : -89,
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				show: false,
			},
			tooltip: {
				enabled: false,
			},
		},
		yaxis: {
			labels: {
				show: false,
				style: {
					cssClass: "chart__label",
					fontSize: "14px",
					fontWeight: "500",
				},
				formatter: (val: any) => {
					return Number(val).toFixed(6);
				},
			},

			axisBorder: {
				show: false,
			},
		},
		plotOptions: {},
		tooltip: {
			theme: "dark",
			y: {
				formatter: (value: any) => {
					return value + token?.symbol;
				},
			},
			custom: ({
				series,
				seriesIndex,
				dataPointIndex,
				w,
			}: {
				series: any;
				seriesIndex: any;
				dataPointIndex: any;
				w: any;
			}) => {
				// const category = w?.globals?.lastXAxis?.categories[dataPointIndex];
				const category = categories[dataPointIndex];
				return `
						<div class="chart__tooltip d-flex flex-column justify-content-between">
							<div class="d-flex flex-column mb-3">
								<span class="chart__tooltip-title">Balance</span>
								<span class="chart__tooltip-value">${series[seriesIndex][dataPointIndex]?.toFixed(4)} ${token?.symbol}</span>
							</div>
							<div class="d-flex flex-column">
								<span class="chart__tooltip-title">Date</span>
								<span class="chart__tooltip-value">${category}</span>
							</div>
						</div>
					`;
			},
		},
		grid: {
			borderColor: theme.modalBG,
			clipMarkers: false,
			yaxis: {
				lines: {
					show: false,
				},
			},
		},
		fill: {
			gradient: {
				enabled: true,
				opacityFrom: 0.55,
				opacityTo: 0,
			},
		},
	};

	return <ReactApexChart options={options} series={series} type="line" height={minHeight || 300} />;
};
