export interface MatrixValues {
	Matrix_A: string[][];
	Matrix_B: string[][];
	Matrix_C: string[][];
}

export interface MatrixErrors {
	Matrix_A?: string;
	Matrix_B?: string;
	Matrix_C?: string;
	actionTime?: string;
	restTime?: string;
	cycles?: string;
}

export interface MatrixTypographyProps {
	title: string;
	label: string;
}
