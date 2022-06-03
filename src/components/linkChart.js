import {Paper} from "@mui/material";
import moment from "moment";
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import {MONTHS_ARR} from '../constants/months.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LinkChart = ({link}) => {

	const months = link.clicksDate.map((mon) => moment(mon).format("MMM"));
	const clickCountByMonth = MONTHS_ARR.map(
		(month) => months.filter((m) => m === month).length
	);

	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				height: 270,
			}}
			elevation={3}
		>
			<Line
				type="line"
				data={{
									labels:MONTHS_ARR,
									datasets: [
										{
											label:'clicks',
											data:clickCountByMonth,
											backgroundColor: 'rgba(255, 99, 132, 0.2)',
											borderColor:'rgba(255, 99, 132, 1)',
											borderWidth: 3
										}
									]
								}}
				options={{
									maintainAspectRatio:false,
									responsive:true,
									scales: {
										y: {beginAtZero: true}
									},
									plugins: {
										title: {
											display: true,
											text: 'Click Statistics',
										},
									}
								}}
			/>
		</Paper>

	)
}


export default LinkChart;
