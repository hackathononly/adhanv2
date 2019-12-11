import React, { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();
export const StateProvider = ({
	i18n,
	reducer,
	locations,
	languages,
	prayerTimes,
	userSettings,
	initialState,
	locationSettings,
	children
}) => (
	<StateContext.Provider
		value={useReducer(reducer, {
			i18n,
			locations,
			languages,
			prayerTimes,
			userSettings,
			initialState,
			locationSettings
		})}>
		{children}
	</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
