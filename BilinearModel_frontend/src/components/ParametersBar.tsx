import {
	Box,
	Grid,
	TextField,
	Typography,
	Button,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";

import { MatrixErrors, MatrixValues } from "../types/matrix.interface";
import { processData, ResponseData } from "../../apis/model.api";
import MatrixTypography from "./MatrixTypography";
import MatrixInput from "./MatrixInput";
import { commonGridStyles } from "./InputBilinear";

interface InputBilinearProps {
	onResponseData: (data: ResponseData) => void;
	tabHandle: (index: number) => void;
}

export const ParametersBar: React.FC<InputBilinearProps> = ({
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
	const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
	const [syntheticNoise, setSyntheticNoise] = useState<boolean>(false);
	const [semisyntheticNoise, setSemisyntheticNoise] = useState<boolean>(false);
	const widthPerInput = 160;
	const totalMatrixWidth = matrixSize * widthPerInput;
	const [selectedNoiseOptions, setSelectedNoiseOptions] = useState({
		heartRate: false,
		breathing: false,
		vasomotion: false,
		coloredNoise: false,
	});

	const handleMatrixSizeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newSize = Math.max(2, Math.min(Number(event.target.value), 10));
		setMatrixSize(newSize);
		setIsConfirmed(false);
	};

	const handleConfirmClick = () => {
		setIsConfirmed(true);
	};

	const handleResetClick = () => {
		setIsConfirmed(false);
	};
	const handleNoiseOptionChange = (
		option: keyof typeof selectedNoiseOptions
	) => {
		setSelectedNoiseOptions((prev) => ({
			...prev,
			[option]: !prev[option],
		}));
	};

	// Ensures only one noise type is selected at a time
	const handleSyntheticNoiseChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSyntheticNoise(event.target.checked);
		if (event.target.checked) {
			setSemisyntheticNoise(false); // Deselect the other option
		}
	};

	const handleSemisyntheticNoiseChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSemisyntheticNoise(event.target.checked);
		if (event.target.checked) {
			setSyntheticNoise(false); // Deselect the other option
		}
	};
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

	return (
		<Grid
			container
			spacing={1}
			sx={{
				minWidth: "100%",
				background: "rgba(6, 147, 227, 0.4)",
				justifyContent: "space-between",
				alignItems: "stretch", // Ensure all items stretch to the same height
				padding: "2rem",
			}}
		>
			<Grid
				item
				xs={4.5}
				sx={{
					display: "flex", // Use flexbox for full height stretching
					flexDirection: "column",
					padding: "0.75rem",
					border: "1px solid",
					borderRadius: "0.5rem",
					background: "rgba(6, 147, 227, 0.1)",
					flexGrow: 1,
					margin: "0.25rem",
				}}
			>
				<Typography
					fontSize={"0.825rem"}
					fontWeight={600}
					sx={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
				>
					Model Parameters
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						flexGrow: 1,
					}}
				>
					{isConfirmed ? (
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
								alignItems: "center",
								gap: "1rem",
							}}
						>
							<Typography
								fontSize={"0.825rem"}
								sx={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
							>
								Regions: {matrixSize}
							</Typography>

							{matrixSize > 0 && (
								<Grid
									container
									sx={{
										justifyContent: "space-around",
										padding: "0",
									}}
								>
									<Grid
										item
										xs={3}
										sx={{
											...commonGridStyles,
											width: totalMatrixWidth,
											marginLeft: "0",
											marginRight: "0",
										}}
									>
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
											<Typography color="error" sx={{ marginTop: "0.25rem" }}>
												{formik.errors.Matrix_A}
											</Typography>
										)}
									</Grid>
									<Grid
										item
										xs={3}
										sx={{ ...commonGridStyles, width: totalMatrixWidth }}
									>
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
											<Typography color="error" sx={{ marginTop: "0.25rem" }}>
												{formik.errors.Matrix_B}
											</Typography>
										)}
									</Grid>
									<Grid
										item
										xs={3}
										sx={{ ...commonGridStyles, width: totalMatrixWidth }}
									>
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
											<Typography color="error" sx={{ marginTop: "0.25rem" }}>
												{formik.errors.Matrix_C}
											</Typography>
										)}
									</Grid>
								</Grid>
							)}
						</Box>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								gap: "1rem",
								padding: "1px",
							}}
						>
							<TextField
								label="Regions"
								type="number"
								value={matrixSize}
								onChange={handleMatrixSizeChange}
								inputProps={{ min: 2 }}
								sx={{ width: "5rem" }}
							/>
							<Button
								variant="contained"
								color="primary"
								onClick={handleConfirmClick}
								sx={{
									width: "65px",
									height: "65px",
									minWidth: "50px",
									borderRadius: "8px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography>Confirm</Typography>
							</Button>
						</Box>
					)}
				</Box>
			</Grid>

			{/* Noise Type Section */}
			<Grid
				item
				xs={2}
				sx={{
					display: "flex", // Flexbox for height consistency
					flexDirection: "column",
					padding: "0.75rem",
					border: "1px solid",
					borderRadius: "0.5rem",
					background: "rgba(6, 147, 227, 0.1)",
					flexGrow: 1,
					margin: "0.25rem",
				}}
			>
				<Typography
					fontSize={"0.825rem"}
					fontWeight={600}
					sx={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
				>
					Noise type
				</Typography>
				<Box
					sx={{
						flexGrow: 1, // Ensures the content inside also stretches
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "left",
						paddingLeft: "1rem",
					}}
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={syntheticNoise}
								onChange={handleSyntheticNoiseChange}
								color="primary"
							/>
						}
						label="Synthetic"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={semisyntheticNoise}
								onChange={handleSemisyntheticNoiseChange}
								color="primary"
							/>
						}
						label="Semisynthetic"
					/>
				</Box>
			</Grid>

			{/* Render case based on noise selection in Grid item C */}
			<Grid
				item
				xs={4}
				sx={{
					display: "flex", // Flexbox for height consistency
					flexDirection: "column",
					padding: "0.75rem",
					border: "1px solid",
					borderRadius: "0.5rem",
					background: "rgba(6, 147, 227, 0.1)",
					flexGrow: 1,
					margin: "0.25rem",
				}}
			>
				<Typography
					fontSize={"0.825rem"}
					fontWeight={600}
					sx={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
				>
					Noise Parameters
				</Typography>
				<Box
					sx={{
						textAlign: "center",
						flexGrow: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{syntheticNoise ? (
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="body1">Synthetic Noise Options</Typography>
							<Grid container>
								<Grid item xs={3}>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedNoiseOptions.heartRate}
												onChange={() => handleNoiseOptionChange("heartRate")}
											/>
										}
										label="Heart Rate"
									/>
								</Grid>
								<Grid item xs={3}>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedNoiseOptions.breathing}
												onChange={() => handleNoiseOptionChange("breathing")}
											/>
										}
										label="Breathing"
									/>
								</Grid>
								<Grid item xs={3}>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedNoiseOptions.vasomotion}
												onChange={() => handleNoiseOptionChange("vasomotion")}
											/>
										}
										label="Vasomotion"
									/>
								</Grid>
								<Grid item xs={3}>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedNoiseOptions.coloredNoise}
												onChange={() => handleNoiseOptionChange("coloredNoise")}
											/>
										}
										label="Colored Noise"
									/>
								</Grid>
								{/* Noise Percentage Input */}
								<TextField
									label="Noise Percentage (%)"
									type="number"
									value={noisePercent}
									onChange={(e) => {
										const value = Number(e.target.value);
										if (value >= 0) {
											setNoisePercent(value);
										}
									}}
									disabled={
										!selectedNoiseOptions.heartRate &&
										!selectedNoiseOptions.breathing &&
										!selectedNoiseOptions.vasomotion &&
										!selectedNoiseOptions.coloredNoise
									}
									sx={{ mt: 2, width: "100%" }}
									InputProps={{
										inputProps: { min: 0 },
									}}
								/>
							</Grid>
						</Box>
					) : semisyntheticNoise ? (
						<Typography variant="body1">
							Selected: Semisynthetic Noise
						</Typography>
					) : (
						<Typography variant="body1">No Noise Type Selected</Typography>
					)}
				</Box>
			</Grid>

			<Grid
				item
				xs={1}
				sx={{
					display: "flex", // Flexbox for height consistency
					flexDirection: "column",
					padding: "0.75rem",
					flexGrow: 1, // Ensures height grows equally
					margin: "0.25rem",
					border: "1px solid",
					borderRadius: "0.5rem",
					background: "rgba(6, 147, 227, 0.1)",
				}}
			>
				<Typography
					fontSize={"0.825rem"}
					fontWeight={600}
					sx={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
				>
					Runner
				</Typography>
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: "1rem",
						}}
					>
						<Button
							variant="contained"
							color="success"
							onClick={handleConfirmClick}
							sx={{
								width: "65px",
								height: "35px",
								minWidth: "50px",
								borderRadius: "8px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography>Start</Typography>
						</Button>
						<Button
							variant="contained"
							color="warning"
							onClick={handleResetClick}
							sx={{
								width: "65px",
								height: "35px",
								minWidth: "50px",
								borderRadius: "8px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography>Reset</Typography>
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
