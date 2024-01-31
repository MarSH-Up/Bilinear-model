import React, { useEffect, useState } from "react";
import { Person, getNames } from "../../apis/model.api";
import { Box, Typography } from "@mui/material";

export const HowTo: React.FC = () => {
	const [names, setNames] = useState<Person[]>([]);

	const getNamesData = async () => {
		try {
			const data = await getNames();
			setNames(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getNamesData();
	}, []);

	return (
		<Box>
			{names.length > 0 ? (
				names.map((person) => (
					<Box key={person.id} sx={{ margin: "10px" }}>
						<Typography variant="h6">{person.name}</Typography>
						<Typography>Age: {person.age}</Typography>
					</Box>
				))
			) : (
				<p>none</p>
			)}
		</Box>
	);
};

export default HowTo;
