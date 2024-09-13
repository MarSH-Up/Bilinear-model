import React from "react";
import { Box, Typography } from "@mui/material";

import screenBlockImage from "../../assets/ScreenBlock.png";

export const DimmensionBlock: React.FC = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				color: "#fff",
				zIndex: 9999,
			}}
		>
			<Box
				sx={{
					p: 4,
					borderRadius: "10px",
					textAlign: "center",
					width: "75%",
				}}
			>
				<Typography
					variant="h4"
					fontSize={"2rem"}
					gutterBottom
					sx={{ margin: "1rem" }}
				>
					Your browser window is too small!
				</Typography>

				{/* Display the PNG image */}
				<Box
					component="img"
					src={screenBlockImage}
					alt="Screen Block Icon"
					sx={{ width: "200px", marginBottom: "20px", margin: "1rem" }}
				/>

				<Typography
					variant="body1"
					fontSize={"1rem"}
					lineHeight={"2rem"}
					sx={{ margin: "1rem" }}
				>
					To get the most out of your experience, please use a laptop or PC or
					resize your browser to at least 1280px wide.
				</Typography>
			</Box>
		</Box>
	);
};
