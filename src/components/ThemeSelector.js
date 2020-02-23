import React from "react";
// import React, { useRef } from "react";
import { LoadingBar } from "../index";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";

const ThemeSelector = React.memo(({ children }) => {
	const {
		isMinimal,
		isDarkMode,
		isLoadingBarShown
	} = useChangeUserSettings();

	return (
		<div
			className={[
				isDarkMode ? "enableDarkMode" : null,
				isMinimal ? "isMinimal" : null,
				"wrapper"
			].join(" ")}
		>
			{/* <div className="loadingBarContainer"> */}
			<LoadingBar isShowing={isLoadingBarShown} />
			{children}
			{/* </div> */}
		</div>
	);
});

export default ThemeSelector;
