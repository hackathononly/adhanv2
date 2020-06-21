import React, { useContext, Suspense } from "react";
import Constants from "./constants";
import { Reducer } from "./reducer";
import { StateProvider } from "./state";
import { SettingsContext } from "./components/SettingsProvider";

import { Body, ThemeSelector, i18n, SettingsProvider } from "./index";

export default function AppWrapper() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
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
			locations={Constants.locations}
			languages={Constants.languages}
			locationSettings={settings[0]}
			prayerTimes={settings[1]}
			userSettings={settings[2]}
			initialState={Constants.defaultSettings}
		>
			<ThemeSelector>
				<Body />
			</ThemeSelector>
		</StateProvider>
	);
};
