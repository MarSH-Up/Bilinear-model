import axios from "axios";

const BASE_URL = `http://localhost:8000`;
export interface Person {
	name: string;
	age: number;
	id: number;
}

interface BilinearParameters {
	A: number[][];
	B1: number[][];
	B2: number[][];
	C: number[][];
	P_SD: number[][];
	freq: number;
	step: number;
	actionTime: number[];
	restTime: number[];
	cycles: number[];
	noise: string;
	noisePercent: number;
}

export interface ResponseData {
	U_stimulus: number[][];
	Y: number[][];
	Z: number[][];
	dq: number[][];
	dh: number[][];
	timestamps: number[];
}

export const getNames = async (): Promise<Person[]> => {
	const response = await axios.get(`${BASE_URL}/names`);
	return response.data;
};

export const processData = async (
	parameters: BilinearParameters
): Promise<ResponseData> => {
	const response = await axios.post(`${BASE_URL}/process-data`, parameters);
	return response.data;
};
