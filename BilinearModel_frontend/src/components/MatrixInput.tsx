import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

interface MatrixInputProps {
	N: number;
	onMatrixChange: (matrix: string[][]) => void;
	parameterLabel: string;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
	N,
	onMatrixChange,
	parameterLabel,
}) => {
	const [matrix, setMatrix] = useState<string[][]>([]);

	// Initialize the matrix to be NxN with default value "0"
	useEffect(() => {
		setMatrix(
			Array.from({ length: N }, () => Array.from({ length: N }, () => "0"))
		);
	}, [N]);

	// Handle updates to individual matrix elements
	const handleMatrixChange = (row: number, col: number, value: string) => {
		const updatedMatrix = matrix.map((r, ri) =>
			ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
		);
		setMatrix(updatedMatrix);
		onMatrixChange(updatedMatrix);
	};

	return (
		<Grid container spacing={1} minWidth={"8rem"} justifyContent="center">
			{matrix.map((row, rowIndex) => (
				<React.Fragment key={rowIndex}>
					{row.map((value, colIndex) => (
						<Grid
							item
							key={`${rowIndex}-${colIndex}`}
							xs={12 / N} // Ensure equal columns in each row
							sx={{ width: "5rem" }} // Adjust width of input
						>
							<TextField
								label={`${parameterLabel}[${rowIndex}, ${colIndex}]`}
								type="text"
								value={value}
								onChange={(e) =>
									handleMatrixChange(rowIndex, colIndex, e.target.value)
								}
								variant="outlined"
								InputProps={{
									style: { fontSize: "0.6rem" }, // Make input text smaller
								}}
								InputLabelProps={{
									style: { fontSize: "0.6rem" }, // Make label text smaller
								}}
								sx={{
									minWidth: "4.5rem", // Optionally adjust the width
								}}
							/>
						</Grid>
					))}
				</React.Fragment>
			))}
		</Grid>
	);
};

export default MatrixInput;
