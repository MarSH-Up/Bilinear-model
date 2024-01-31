import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Colors } from "../design/theme";
import { Box } from "@mui/material";

let startTime: Date, endTime: Date;

type PlotGeneratorProps = Record<string, never>;
type PlotGeneratorState = Record<string, never>;
class PlotGenerator extends Component<PlotGeneratorProps, PlotGeneratorState> {
	chart: CanvasJSReact.CanvasJSChart | null = null;

	componentDidMount() {
		endTime = new Date();
		document.getElementById("timeToRender")!.innerHTML =
			"Time to Render: " + (endTime.getTime() - startTime) + "ms";
	}

	render() {
		let limit = 50000;
		let y = 100;
		let data = [];
		let dataSeries = { type: "line" };
		let dataPoints = [];

		for (let i = 0; i < limit; i += 1) {
			y += Math.round(Math.random() * 10 - 5);
			dataPoints.push({
				x: i,
				y: y,
			});
		}
		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);

		const spanStyle = {
			position: "absolute",
			top: "10px",
			fontSize: "20px",
			fontWeight: "bold",
			backgroundColor: "#d85757",
			padding: "0px 4px",
			color: `${Colors.shadowWhite}`,
		};

		const options = {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Plot-Example",
			},
			data: data,
			theme: "dark2",
		};

		startTime = new Date();

		return (
			<Box>
				<CanvasJSReact.CanvasJSChart
					options={options}
					onRef={(ref) => (this.chart = ref)}
				/>
				<span id="timeToRender" style={spanStyle}></span>
			</Box>
		);
	}
}

export default PlotGenerator;
