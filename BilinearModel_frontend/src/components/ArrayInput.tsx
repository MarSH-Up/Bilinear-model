import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

interface ArrayInputProps {
	N: number;
	onMatrixChange: (matrix: string[]) => void;
	parameterLabel: string;
}

const ArrayInput: React.FC<ArrayInputProps> = ({
	N,
	onMatrixChange,
	parameterLabel,
}) => {
	const [matrix, setMatrix] = useState<string[]>([]);

	useEffect(() => {
		setMatrix(Array.from({ length: N }, () => "0"));
	}, [N]);

	const handleMatrixChange = (col: number, value: string) => {
		const updatedMatrix = matrix.map((item, index) =>
			index === col ? value : item
		);
		setMatrix(updatedMatrix);
		onMatrixChange(updatedMatrix);
	};

	return (
		<Grid container spacing={2} minWidth={"12rem"}>
			<Grid container item spacing={1}>
				{matrix.map((value, colIndex) => (
					<Grid item key={colIndex} sx={{ width: "6rem", margin: "0.25rem" }}>
						<TextField
							label={`${parameterLabel}[${colIndex}]`}
							type="text"
							value={value}
							onChange={(e) => handleMatrixChange(colIndex, e.target.value)}
							variant="outlined"
						/>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default ArrayInput;
