import React from "react";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";

const ThemeSelector = React.memo(({ children }) => {
	const { isMinimal, isDarkMode } = useChangeUserSettings();
	return (
		<div
			className={[
				isDarkMode ? "enableDarkMode" : null,
				isMinimal ? "isMinimal" : null,
				"wrapper"
			].join(" ")}
		>
			{children}
		</div>
	);
});

export default ThemeSelector;
