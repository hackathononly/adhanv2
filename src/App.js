import React, { useContext, Suspense } from "react";
import Constants from "./constants";
import { Reducer } from "./reducer";
import { StateProvider } from "./state";
import { SettingsContext } from "./components/SettingsProvider";

import {
	Body,
	i18n,
	LoadingBar,
	ThemeSelector,
	SettingsProvider,
} from "./index";

export default function AppWrapper() {
	return (
		<Suspense
			fallback={
				<LoadingBar
					key={"loadingbarThemeSelector"}
				// translate={translate}
				/>
			}
		>
			{/* // <Suspense fallback={<p>Loading...</p>}> */}
			<SettingsProvider>
				<App />
			</SettingsProvider>
		</Suspense>
	);
}

const App = () => {
	const { settings } = useContext(SettingsContext);

	return (
		<StateProvider
			i18n={i18n}
			reducer={Reducer}
			prayerTimes={settings[1]}
			userSettings={settings[2]}
			locationSettings={settings[0]}
			locations={Constants.locations}
			languages={Constants.languages}
			initialState={Constants.defaultSettings}
		>
			<ThemeSelector>
				<Body />
			</ThemeSelector>
		</StateProvider>
	);
};
