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
	useEffect(() => {
		setMatrix(
			Array.from({ length: N }, () => Array.from({ length: N }, () => "0"))
		);
	}, [N]);

	const handleMatrixChange = (row: number, col: number, value: string) => {
		const updatedMatrix = matrix.map((r, ri) =>
			ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
		);
		setMatrix(updatedMatrix);
		onMatrixChange(updatedMatrix);
	};

	return (
		<Grid container spacing={2} minWidth={"12rem"}>
			{matrix.map((row, rowIndex) => (
				<Grid container item key={rowIndex} spacing={1}>
					{row.map((value, colIndex) => (
						<Grid
							item
							key={`${rowIndex}-${colIndex}`}
							sx={{ width: "6rem", margin: "0.25rem" }}
						>
							<TextField
								label={`${parameterLabel}[${rowIndex}, ${colIndex}]`}
								type="text"
								value={value}
								onChange={(e) =>
									handleMatrixChange(rowIndex, colIndex, e.target.value)
								}
								variant="outlined"
							/>
						</Grid>
					))}
				</Grid>
			))}
		</Grid>
	);
};

export default MatrixInput;
