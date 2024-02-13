import Logo from "../../assets/images/BilinearModel.png";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Colors } from "../theme";
import RoutesEnum from "../../types/routes.enum";

const FullScreen: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					background: Colors.lightGrey,
					border: "none",
					boxShadow: "none",
					minHeight: "5rem",
				}}
			>
				<Toolbar
					sx={{
						width: "80%",
						margin: "auto",
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
						<Button
							sx={{ gap: "2rem" }}
							onClick={() => navigate(RoutesEnum.HOME)}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img src={Logo} style={{ width: "5rem" }} />
							</Box>
						</Button>
						<Typography
							fontFamily={"Nunito"}
							fontSize={"1.25rem"}
							fontWeight={600}
							sx={{ color: Colors.primary.dark }}
						>
							Bilinear Model for fNIRS
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>

			<Box
				sx={{
					pt: "7rem",
					minHeight: "100vh",
					background: Colors.lightGrey,
					boxSizing: "border-box",
					minWidth: "1050px",
				}}
			>
				<Outlet />
			</Box>
		</>
	);
};

export default FullScreen;
