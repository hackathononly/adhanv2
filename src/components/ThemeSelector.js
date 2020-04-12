import React from "react";
import { LoadingBar } from "../index";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
import { useGetTranslation } from "../customHook/useGetTranslation";

const ThemeSelector = React.memo(({ children }) => {
	const {
			isMinimal,
			isDarkMode,
			isLoadingBarShown,
		} = useChangeUserSettings(),
		{ getTranslation: translate } = useGetTranslation();

	return (
		<main
			data-theme={isDarkMode ? "dark" : "light"}
			className={[isMinimal ? "isMinimal" : null, "wrapper"].join(" ")}
		>
			<LoadingBar
				key={"loadingbarThemeSelector"}
				translate={translate}
				isShowing={isLoadingBarShown}
			/>
			{children}
		</main>
	);
});

export default ThemeSelector;
