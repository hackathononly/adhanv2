import React from "react";
import Constants from "./constants";
import { Reducer } from "./reducer";
import { StateProvider } from "./state";

/* Structure */
import { Header, Body, Credit, ThemeSelector, i18n } from "./index";

const App = () => {
	return (
		<StateProvider
			i18n={i18n}
			reducer={Reducer}
			locations={Constants.locations}
			languages={Constants.languages}
			prayerTimes={Constants.prayerTimes}
			userSettings={Constants.userSettings}
			initialState={Constants.defaultSettings}
			locationSettings={Constants.locationSettings}
		>
			<ThemeSelector>
				<Header />
				<Body />
				<Credit />
			</ThemeSelector>
		</StateProvider>
	);
};

export default App;
