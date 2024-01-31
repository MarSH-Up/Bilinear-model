import React from "react";
import { MatrixTypographyProps } from "../types/matrix.interface";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Colors } from "../design/theme";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const MatrixTypography: React.FC<MatrixTypographyProps> = ({
	title,
	label,
}) => (
	<Typography
		fontFamily={"Nunito"}
		fontSize={"1rem"}
		sx={{
			color: Colors.primary.dark,
			display: "flex",
			alignItems: "center",
			marginBottom: "0.5rem",
		}}
	>
		{label}
		<Tooltip title={title}>
			<IconButton>
				<InfoOutlinedIcon fontSize="small" />
			</IconButton>
		</Tooltip>
		:
	</Typography>
);

export default MatrixTypography;
