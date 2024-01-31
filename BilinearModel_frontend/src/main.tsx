import { ThemeProvider } from "@emotion/react";

import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import App from "./App";
import theme from "./design/theme";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>
);
