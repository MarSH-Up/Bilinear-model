import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Logo from "../assets/images/BilinearModel.png";
import { ResponseData } from "../../apis/model.api";
import { PlotDisplay } from "../components/PlotDisplay";
import useIsLargeScreen from "../utils/useIsLargeScreen";
import { DimmensionBlock } from "../components/Modals/DimmensionBlock";
import { ParametersBar } from "../components/ParametersBar";

export const Home: React.FC = () => {
	const [value, setValue] = useState(0);
	const isLargeScreen = useIsLargeScreen();
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
		if (value === 2 && responseData === null) {
			console.log("Fetching data for the bilinear model...");
		}
	}, [responseData, value]);

	if (!isLargeScreen) {
		return <DimmensionBlock />;
	}

	return (
		<Container
			sx={{
				minWidth: "100%",
				padding: "0rem",
				display: "flex",
				flexDirection: "column",
				minHeight: "88vh",
				alignContent: "center",
				justifyContent: "center",
			}}
			disableGutters
		>
			<ParametersBar />
			<Box
				sx={{
					flexGrow: 1,
					minWidth: "100%",
					display: "flex",
					alignContent: "center",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{responseData ? (
					<PlotDisplay bilinearModelData={responseData} />
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							background: "rgba(255, 255, 255, 0.2)",
							backdropFilter: "blur(10px)",
							padding: "2rem",
							borderRadius: "1rem",
						}}
					>
						<Box
							component="img"
							src={Logo}
							alt="Logo"
							sx={{
								width: "350px",
								height: "auto",
								marginBottom: "1rem",
							}}
						/>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default Home;
{
	/*
	
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Bilinear Model" />
					<Tab label="Bilinear Model Data" />
				</Tabs>
			</Box>

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
			)}*/
}
