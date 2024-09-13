import { useEffect, useState } from "react";
import theme from "../design/theme";

const useIsLargeScreen = () => {
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth >= theme.breakpoints.values.lg);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isLargeScreen;
};

export default useIsLargeScreen;
