import { createTheme } from "@mui/material/styles";

export const evo2FontFamily = "'Exo 2', sans-serif";

const secondary = {
	dark: "#F59E0B", // Warm Amber for secondary elements like buttons, links, or accent sections
	main: "#F3F4F6", // Light Gray for main backgrounds or secondary backgrounds
	light: "#F9FAFB", // Off-white for even lighter background sections or highlights
};

const primary = {
	dark: "#1E3A8A", // Deep Indigo for header, footer, and other important elements
	main: "#4759FF", // Blue as an additional accent for primary actions, used in interactive elements
	light: "#CFE0E2", // Soft blueish tone to highlight secondary elements
};

export const Colors = {
	white: "#FFFFFF", // Standard white for general backgrounds or content areas
	black: "#111827", // Almost black for body text and high contrast
	successful: "#10B981", // Emerald Green for success messages, buttons, or alerts
	primary,
	secondary,
	neutral: "#B9B0AA", // Soft gray for borders or inactive elements
	grey: "#E9E7E5", // Light gray for backgrounds or borders
	lightGrey: "#DFDFDF", // Lighter gray for subtle backgrounds or dividers
	shadowWhite: "#F5F5F5", // Very light background for sections that need contrast without being harsh
};

const theme = createTheme({
	palette: {
		mode: "light",
		primary,
		secondary,
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: Colors.white,
				},
			},
		},
		MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
	},
	typography: {
		fontFamily: [
			"Nunito",
			'"Inter"',
			"-apple-system",
			"BlinkMacSystemFont",
			'"Poppins"',
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

export default theme;
