import axios from "axios";

const BASE_URL = `http://localhost:8000`;
export interface Person {
	name: string;
	age: number;
	id: number;
}
export const getNames = async (): Promise<Person[]> => {
	const response = await axios.get(`${BASE_URL}/names`);
	return response.data;
};
