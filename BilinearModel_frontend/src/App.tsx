import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./design/theme";
import Routes from "./components/Routes";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
