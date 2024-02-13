import React, { useState } from "react";
import { ResponseData } from "../../apis/model.api";
import { LineChart } from "@mui/x-charts";
import { Box, Container, Grid, Typography } from "@mui/material";

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

	if (!bilinearModelData) {
		setIsLoading(true);
	}
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
					</Grid>
				</>
			)}
		</Container>
	);
};
