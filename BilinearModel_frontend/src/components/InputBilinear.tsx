import React, { useState } from "react";
import { useFormik } from "formik";
import MatrixInput from "./MatrixInput";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { Colors } from "../design/theme";

import { MatrixErrors, MatrixValues } from "../types/matrix.interface";
import MatrixTypography from "./MatrixTypography";

const InputBilinear: React.FC = () => {
	const [matrixSize, setMatrixSize] = useState<number>(2);
	const widthPerInput = 120;
	const totalMatrixWidth = matrixSize * widthPerInput;

	const formik = useFormik<MatrixValues>({
		initialValues: {
			matrixA: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
			matrixB: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
			matrixC: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
		},
		validate: (values) => {
			const errors: MatrixErrors = {};
			["matrixA", "matrixB"].forEach((matrixKey) => {
				if (
					values[matrixKey as keyof MatrixValues].some((row) =>
						row.some((cell) => cell === "")
					)
				) {
					errors[matrixKey as keyof MatrixErrors] = "All fields must be filled";
				}
			});
			return errors;
		},
		onSubmit: (values) => {
			console.log("Form Data:", values);
		},
	});

	const handleMatrixChange = (
		matrixKey: keyof MatrixValues,
		newMatrix: string[][]
	) => {
		formik.setFieldValue(matrixKey, newMatrix);
	};

	const handleMatrixSizeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newSize = Math.max(2, Math.min(Number(event.target.value), 10));
		setMatrixSize(newSize);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container sx={{ justifyContent: "space-around" }}>
				<Grid item>
					<TextField
						label="Number of regions"
						type="number"
						value={matrixSize}
						onChange={handleMatrixSizeChange}
						inputProps={{ min: 2 }}
						sx={{ margin: "1rem" }}
					/>
				</Grid>
				{matrixSize > 0 && (
					<Grid container sx={{ justifyContent: "space-around" }}>
						<Grid item sx={{ ...commonGridStyles, width: totalMatrixWidth }}>
							<MatrixTypography
								title="Average connectivity among regions"
								label="A"
							/>
							<MatrixInput
								N={matrixSize}
								onMatrixChange={(matrixData) =>
									handleMatrixChange("matrixA", matrixData)
								}
								parameterLabel={"A"}
							/>
							{formik.errors.matrixA && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.matrixA}
								</Typography>
							)}
						</Grid>
						<Grid item sx={{ ...commonGridStyles, width: totalMatrixWidth }}>
							<MatrixTypography
								title="Modulation of effective connectivity by experimental manipulation"
								label="B"
							/>
							<MatrixInput
								N={matrixSize}
								onMatrixChange={(matrixData) =>
									handleMatrixChange("matrixB", matrixData)
								}
								parameterLabel={"B"}
							/>
							{formik.errors.matrixB && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.matrixB}
								</Typography>
							)}
						</Grid>
						<Grid item sx={{ ...commonGridStyles, width: totalMatrixWidth }}>
							<MatrixTypography
								title="Average connectivity among regions"
								label="C"
							/>
							<MatrixInput
								N={matrixSize}
								onMatrixChange={(matrixData) =>
									handleMatrixChange("matrixC", matrixData)
								}
								parameterLabel={"C"}
							/>
							{formik.errors.matrixB && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.matrixB}
								</Typography>
							)}
						</Grid>
					</Grid>
				)}
			</Grid>
			<Box
				sx={{
					width: "95%",
					display: "flex",
					justifyContent: "flex-end",
					marginTop: "1rem",
				}}
			>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Box>
		</form>
	);
};

const commonGridStyles = {
	border: `1px solid ${Colors.primary.dark}`,
	borderRadius: "1rem",
	padding: "1rem",
	maxWidth: "100%",
	margin: "1rem",
};

export default InputBilinear;
