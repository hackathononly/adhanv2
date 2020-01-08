export const Reducer = (state, action) => {
	const locationSettingsState = {
			...state.locationSettings,
			[action.mode]: action.value
		},
		userSettingsState = {
			...state.userSettings,
			[action.mode]: action.value
		},
		prayerTimesState = {
			...state.prayerTimes,
			[action.mode]: action.value
		};

	switch (action.type) {
		case "setLocationSettings":
			return {
				...state,
				locationSettings: locationSettingsState
			};
		case "setUserSettings":
			return {
				...state,
				userSettings: userSettingsState
			};
		case "setPrayerTimes":
			return {
				...state,
				prayerTimes: prayerTimesState
			};
		default:
			return state;
	}
};
