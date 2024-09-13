import React, { useState } from "react";
import { useFormik } from "formik";
import MatrixInput from "./MatrixInput";
import {
	Box,
	Typography,
	Grid,
	Button,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import { Colors } from "../design/theme";

import { MatrixErrors, MatrixValues } from "../types/matrix.interface";
import MatrixTypography from "./MatrixTypography";
import { ResponseData, processData } from "../../apis/model.api";
import ArrayInput from "./ArrayInput";

interface InputBilinearProps {
	onResponseData: (data: ResponseData) => void;
	tabHandle: (index: number) => void;
}

const InputBilinear: React.FC<InputBilinearProps> = ({
	onResponseData,
	tabHandle,
}) => {
	const [matrixSize, setMatrixSize] = useState<number>(2);
	const [freq, setFrequency] = useState<number>(0.0);
	const [actionTime, setActionTime] = useState<number[]>([5, 5]);
	const [restTime] = useState<number[]>([25, 25]);
	const [cycles] = useState<number[]>([3, 3]);
	const [noise, setNoise] = useState<string>("Synthetic");
	const [noisePercent, setNoisePercent] = useState<number>(0);
	const widthPerInput = 120;
	const totalMatrixWidth = matrixSize * widthPerInput;

	const formik = useFormik<MatrixValues>({
		initialValues: {
			Matrix_A: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
			Matrix_B: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
			Matrix_C: Array.from({ length: matrixSize }, () =>
				Array.from({ length: matrixSize }, () => "0")
			),
		},
		validate: (values) => {
			const errors: MatrixErrors = {};
			const matrixSize = values.Matrix_A.length;

			["Matrix_A", "Matrix_B", "Matrix_C"].forEach((matrixKey) => {
				if (
					values[matrixKey as keyof MatrixValues].some((row) =>
						row.some((cell) => cell === "")
					)
				) {
					errors[matrixKey as keyof MatrixErrors] = "All fields must be filled";
				}
				if (
					(matrixKey === "Matrix_A" || matrixKey === "Matrix_B") &&
					values[matrixKey as keyof MatrixValues].some((row) =>
						row.some((cell) => cell === "0")
					)
				) {
					errors[
						matrixKey as keyof MatrixErrors
					] = `${matrixKey} cannot contain only zeros`;
				}
			});

			if (actionTime.length !== matrixSize) {
				errors.actionTime = `Action Time must have exactly ${matrixSize} elements to match the number of regions.`;
			}
			if (restTime.length !== matrixSize) {
				errors.restTime = `Rest Time must have exactly ${matrixSize} elements to match the number of regions.`;
			}
			if (cycles.length !== matrixSize) {
				errors.cycles = `Cycles must have exactly ${matrixSize} elements to match the number of regions.`;
			}

			return errors;
		},
		onSubmit: async (values) => {
			const payload = {
				A: values.Matrix_A.map((row) => row.map(Number)),
				B1: values.Matrix_B.map((row) => row.map(() => 0)),
				B2: values.Matrix_B.map((row) => row.map(Number)),
				C: values.Matrix_C.map((row) => row.map(Number)),
				P_SD: [],
				freq: freq,
				step: 1 / freq,
				actionTime: actionTime,
				restTime: restTime,
				cycles: cycles,
				noise: noise,
				noisePercent: noisePercent,
			};

			try {
				const responseData = await processData(payload);
				onResponseData(responseData);
				tabHandle(2);
			} catch (error) {
				console.error("Error submitting the form:", error);
			}
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
									handleMatrixChange("Matrix_A", matrixData)
								}
								parameterLabel={"A"}
							/>
							{formik.errors.Matrix_A && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.Matrix_A}
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
									handleMatrixChange("Matrix_B", matrixData)
								}
								parameterLabel={"B"}
							/>
							{formik.errors.Matrix_B && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.Matrix_B}
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
									handleMatrixChange("Matrix_C", matrixData)
								}
								parameterLabel={"C"}
							/>
							{formik.errors.Matrix_C && (
								<Typography color="error" sx={{ marginTop: "0.5rem" }}>
									{formik.errors.Matrix_C}
								</Typography>
							)}
						</Grid>

						<Grid item sx={{ ...commonGridStyles, width: totalMatrixWidth }}>
							<MatrixTypography title="Rest Time" label="Rest Time" />
							<ArrayInput
								N={matrixSize}
								onMatrixChange={(newMatrix) => {
									const updatedActionTime = newMatrix.map((value) =>
										parseFloat(value)
									);
									setActionTime(updatedActionTime);
								}}
								parameterLabel="RestTime"
							/>
							<MatrixTypography
								title="Cycles (comma-separated)"
								label="Cycles"
							/>
							<ArrayInput
								N={matrixSize}
								onMatrixChange={(newMatrix) => {
									const updatedActionTime = newMatrix.map((value) =>
										parseFloat(value)
									);
									setActionTime(updatedActionTime);
								}}
								parameterLabel="Cycles"
							/>
							<MatrixTypography title="Time" label="ActionTime" />
							<ArrayInput
								N={matrixSize}
								onMatrixChange={(newMatrix) => {
									const updatedActionTime = newMatrix.map((value) =>
										parseFloat(value)
									);
									setActionTime(updatedActionTime);
								}}
								parameterLabel="ActionTime"
							/>
						</Grid>
						<Grid
							item
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignContent: "center",
								border: `1px solid ${Colors.primary.dark}`,
								borderRadius: "1rem",
								padding: "1rem",
								maxWidth: "100%",
								margin: "1rem",
								width: totalMatrixWidth,
							}}
						>
							<TextField
								type="number"
								label="Frequency"
								value={freq}
								onChange={(e) => setFrequency(parseFloat(e.target.value))}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: "0.1",
								}}
								sx={{ margin: "1rem" }}
							/>
							<FormControl sx={{ margin: "1rem" }}>
								<InputLabel id="demo-simple-select-helper-label">
									Noise
								</InputLabel>
								<Select
									labelId="NoiseType"
									id="NoiseType"
									label="Noise"
									value={noise}
									onChange={(e) => setNoise(e.target.value)}
									sx={{
										color: "#293937",
									}}
								>
									<MenuItem value={"Synthetic"}>Synthetic</MenuItem>
									<MenuItem value={"Semisynthetic"}>SemiSynthetic</MenuItem>
									<MenuItem value={""}>None</MenuItem>
								</Select>
							</FormControl>
							<TextField
								type="number"
								label="Noise Percent"
								value={noisePercent}
								onChange={(e) => setNoisePercent(parseFloat(e.target.value))}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: "0.05",
								}}
								sx={{ margin: "1rem" }}
							/>
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

export const commonGridStyles = {
	border: `1px solid ${Colors.primary.dark}`,
	borderRadius: "1rem",
	padding: "1rem",
	minWidth: "11rem",
	maxWidth: "100%",
};

export default InputBilinear;
