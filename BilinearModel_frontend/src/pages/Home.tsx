import React, { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { Colors } from "../design/theme";
import HowTo from "../components/HowTo";
import InputBilinear from "../components/InputBilinear";
import PlotGenerator from "../components/PlotGenerator";
import { LineChart } from "@mui/x-charts";
export const Home: React.FC = () => {
	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Container sx={{ width: "90%" }}>
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
					<Tab label="Plot example" />
				</Tabs>
			</Box>
			{value === 0 && (
				<Box sx={{ p: 3 }}>
					<HowTo />
				</Box>
			)}
			{value === 1 && (
				<Box sx={{ p: 3 }}>
					<InputBilinear />
				</Box>
			)}
			{value === 2 && (
				<Box sx={{ p: 3 }}>
					<PlotGenerator />
					<>
						<LineChart
							xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
							series={[
								{
									data: [2, 5.5, 2, 8.5, 1.5, 5],
								},
							]}
							width={500}
							height={300}
						/>
					</>
				</Box>
			)}
		</Container>
	);
};

export default Home;
