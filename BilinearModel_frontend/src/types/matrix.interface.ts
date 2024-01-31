export interface MatrixValues {
	matrixA: string[][];
	matrixB: string[][];
	matrixC: string[][];
}

export interface MatrixErrors {
	matrixA?: string;
	matrixB?: string;
	matrixC?: string;
}

export interface MatrixTypographyProps {
	title: string;
	label: string;
}
