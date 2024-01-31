import { createTheme } from "@mui/material/styles";

export const evo2FontFamily = "'Exo 2', sans-serif";

const secondary = {
	dark: "#293937",
	main: "#427E83",
	light: "#CFE0E2",
};

const primary = {
	dark: "#000000",
	main: "#4759FF",
	light: "#FEF9F6",
};

export const Colors = {
	white: "#FFFFFF",
	black: "#293937",
	successful: "#03BB50",
	primary,
	secondary,
	neutral: "#B9B0AA",
	grey: "#E9E7E5",
	lightGrey: "#DFDFDF",
	shadowWhite: "#F5F5F5",
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
