import { Route, Routes as RoutesFromRouter } from "react-router-dom";

import RoutesEnum from "../types/routes.enum";
import FullScreen from "../design/Layouts/FullScreen";
import Home from "../pages/Home";

const Routes = () => (
	<RoutesFromRouter>
		<Route element={<FullScreen />}>
			<Route path={RoutesEnum.HOME} element={<Home />} />
		</Route>

		<Route path="*" element={<FullScreen />}></Route>
	</RoutesFromRouter>
);
export default Routes;
