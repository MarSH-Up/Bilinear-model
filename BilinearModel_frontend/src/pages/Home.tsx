import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { Colors } from "../design/theme";
import HowTo from "../components/HowTo";
import InputBilinear from "../components/InputBilinear";

import { ResponseData } from "../../apis/model.api";
import { PlotDisplay } from "../components/PlotDisplay";
export const Home: React.FC = () => {
	const [value, setValue] = useState(0);

	const [responseData, setResponseData] = useState<ResponseData | null>(null);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		if (newValue === 2 && responseData === null) {
			alert(
				"Please submit the bilinear model data before viewing the plot example."
			);
			return;
		}
		setValue(newValue);
	};
	const handleResponseData = (data: ResponseData) => {
		setResponseData(data);
	};

	useEffect(() => {
		if (value === 2) {
			if (responseData === null) {
				console.log("Fetching data for the bilinear model...");
			}
		}
	}, [responseData, value]);

	return (
		<Container sx={{ width: "100%", minWidth: "1050px" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab
						label="How-to"
						sx={{ fontFamily: "Nunito", color: Colors.primary.dark }}
					/>
					<Tab label="Bilinear Model" />
					<Tab label="Bilinear Model Data" />
				</Tabs>
			</Box>
			{value === 0 && (
				<Box sx={{ p: 3 }}>
					<HowTo />
				</Box>
			)}
			{value === 1 && (
				<Box sx={{ p: 3 }}>
					<InputBilinear
						onResponseData={handleResponseData}
						tabHandle={setValue}
					/>
				</Box>
			)}
			{value === 2 && (
				<Box sx={{ p: 3 }}>
					<PlotDisplay bilinearModelData={responseData} />
				</Box>
			)}
		</Container>
	);
};

export default Home;
