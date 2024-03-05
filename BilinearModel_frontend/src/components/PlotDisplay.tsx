import React, { useState } from "react";
import { ResponseData } from "../../apis/model.api";
import { LineChart } from "@mui/x-charts";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

interface PlotData {
	bilinearModelData: ResponseData | null;
}
export const PlotDisplay: React.FC<PlotData> = ({ bilinearModelData }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const series = bilinearModelData
		? bilinearModelData.Y.map((yData) => ({
				data: yData,
				showMark: false,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }))
		: [];
	const seriesZ = bilinearModelData
		? bilinearModelData.Z.map((zData) => ({
				data: zData,
				showMark: false,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }))
		: [];
	const seriesDH = bilinearModelData
		? bilinearModelData.dh.map((dhData) => ({
				data: dhData,
				showMark: false,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }))
		: [];
	const seriesDQ = bilinearModelData
		? bilinearModelData.dq.map((dqData) => ({
				data: dqData,
				showMark: false,
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }))
		: [];
	if (!bilinearModelData) {
		setIsLoading(true);
	}
	const handleDownload = () => {
		if (bilinearModelData) {
			const { Y, timestamps } = bilinearModelData;
			const csvContent = convertToCSV(Y, timestamps);
			const encodedUri = encodeURI(csvContent);
			const link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "data.csv");
			document.body.appendChild(link);

			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<Container>
			{isLoading ? (
				<Box>Loading data</Box>
			) : (
				<>
					<Grid
						container
						sx={{
							border: `1px solid #293937`,
							borderRadius: "1rem",
							margin: "1rem",
						}}
					>
						<Grid
							item
							xs={12}
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<Button onClick={handleDownload}>Download CSV</Button>
						</Grid>
						<Grid item xs={12}>
							<Typography
								fontSize={"2rem"}
								textAlign="center"
								sx={{ color: "#293937" }}
							>
								Stimulus vs Time
							</Typography>
						</Grid>

						<Grid
							item
							sm={12}
							md={6}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignContent: "center",
							}}
						>
							<LineChart
								xAxis={[{ data: bilinearModelData?.timestamps }]}
								series={[
									{
										data: bilinearModelData?.U_stimulus[0],
										showMark: false,
									},
								]}
								width={450}
								height={300}
								disableLineItemHighlight
							/>
						</Grid>

						<Grid
							item
							sm={12}
							md={6}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignContent: "center",
							}}
						>
							<LineChart
								xAxis={[{ data: bilinearModelData?.timestamps }]}
								series={[
									{
										data: bilinearModelData?.U_stimulus[1],
										showMark: false,
									},
								]}
								width={450}
								height={300}
								disableLineItemHighlight
							/>
						</Grid>
					</Grid>
					<Grid
						container
						sx={{
							border: `1px solid #293937`,
							borderRadius: "1rem",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: "1rem",
							padding: "1rem",
							margin: "1rem",
						}}
					>
						<Grid item xs={12}>
							<Typography
								fontSize={"2rem"}
								textAlign="center"
								sx={{ color: "#293937" }}
							>
								Optical Density Changes over time for dxy-Hb and oxy-Hb
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<LineChart
								xAxis={[{ data: bilinearModelData?.timestamps }]}
								series={series}
								width={900}
								height={600}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography
								fontSize={"2rem"}
								textAlign="center"
								sx={{ color: "#293937" }}
							>
								Neuronal Response
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<LineChart
								xAxis={[{ data: bilinearModelData?.timestamps }]}
								series={seriesZ}
								width={900}
								height={600}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography
								fontSize={"2rem"}
								textAlign="center"
								sx={{ color: "#293937" }}
							>
								Hemodynamics Response
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<LineChart
								xAxis={[{ data: bilinearModelData?.timestamps }]}
								series={[...seriesDH, ...seriesDQ]}
								width={900}
								height={600}
							/>
						</Grid>
					</Grid>
				</>
			)}
		</Container>
	);
};

const convertToCSV = (Y: number[][], timestamps: number[]): string => {
	let csvContent = "data:text/csv;charset=utf-8,Timestamps,";
	csvContent += Y.map((_, i) => `Region_${i + 1}`).join(",") + "\n";

	for (let j = 0; j < timestamps.length; j++) {
		const row = [
			timestamps[j].toString(),
			...Y.map((region) => region[j].toString()),
		];
		csvContent += row.join(",") + "\n";
	}

	return csvContent;
};
