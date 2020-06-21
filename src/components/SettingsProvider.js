import React, { createContext, useState } from "react";
import { openDB } from "idb";
import Constants from "../constants";
import suspender from "../lib/suspender";

const SettingsContext = createContext({});

async function getSettings() {
	try {
		const idb = await openDB("adhanapp", 1),
			idbTable = idb.transaction(["settings"], "readwrite"),
			store = idbTable.objectStore("settings");
		return store.getAll();
	} catch (error) {
		return [
			Constants.locationSettings,
			Constants.prayerTimes,
			Constants.userSettings,
		];
	}
}

const idbRecords = suspender(getSettings());

function StatesProvider({ children }) {
	const records = idbRecords.data.read(),
		[settings] = useState(records);

	return (
		<SettingsContext.Provider value={{ settings }}>
			{children}
		</SettingsContext.Provider>
	);
}

export default StatesProvider;
export { SettingsContext };
