import Logo from "../../assets/images/BilinearModel.png";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Colors } from "../theme";

const FullScreen: React.FC = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			{/* Header */}
			<AppBar
				position="fixed"
				sx={{
					background: Colors.primary.dark,
					border: "none",
					boxShadow: "none",
					minHeight: "5rem",
				}}
			>
				<Toolbar
					sx={{
						width: "100%",
						margin: "auto",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							maxWidth: "75px",
						}}
					>
						<img src={Logo} style={{ width: "100%" }} alt="Logo" />
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Typography
							variant="h1"
							fontFamily={"Nunito"}
							fontSize={"1.25rem"}
							fontWeight={700}
							sx={{ color: Colors.white }}
						>
							Modular Data Lab for Synthetic fNIRS Hubs
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Main Content Area */}
			<Box
				sx={{
					flexGrow: 1,
					pt: "5rem",
					width: "100%",
					background: Colors.secondary.main,
					boxSizing: "border-box",
				}}
			>
				<Outlet />
			</Box>

			{/* Footer */}
			<AppBar
				position="static"
				sx={{
					background: Colors.primary.dark,
					border: "none",
					boxShadow: "none",
					top: "auto",
					bottom: 0,
					minHeight: "0.25rem",
					mt: "0",
					padding: "0",
					maxHeight: "2rem",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: "1.25rem",
							padding: "0 2rem",
						}}
					>
						{/* GitHub Link */}
						<Typography
							component="a"
							href="https://github.com/MarSH-Up"
							target="_blank"
							rel="noopener noreferrer"
							fontFamily={"Nunito"}
							fontSize={"0.75rem"}
							fontWeight={500}
							sx={{
								color: Colors.white,
								padding: "0.25rem",
								textDecoration: "none",
								transition: "color 0.3s ease",
								"&:hover": {
									color: Colors.secondary.dark,
								},
							}}
						>
							GitHub
						</Typography>

						{/* Twitter Link */}
						<Typography
							component="a"
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							fontFamily={"Nunito"}
							fontSize={"0.75rem"}
							fontWeight={500}
							sx={{
								color: Colors.white,
								padding: "0.25rem",
								textDecoration: "none",
								transition: "color 0.3s ease",
								"&:hover": {
									color: Colors.secondary.dark,
								},
							}}
						>
							Twitter
						</Typography>
					</Box>

					<Box sx={{ padding: "0 2rem" }}>
						<Typography
							fontFamily={"Nunito"}
							fontSize={"0.75rem"}
							fontWeight={500}
							sx={{ color: Colors.white, padding: "0.25rem" }}
						>
							Modular Data Lab for Synthetic fNIRS Hubs by Mario De Los Santos
						</Typography>
					</Box>
				</Box>
			</AppBar>
		</Box>
	);
};

export default FullScreen;
