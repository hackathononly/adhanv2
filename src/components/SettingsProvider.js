import React, { createContext, useState } from "react";
import axios from "axios";
import { openDB } from "idb";
import Constants from "../constants";
import suspender from "../lib/suspender";

const SettingsContext = createContext({});

async function IDBStore() {
	return await openDB(Constants.db.name, Constants.db.version);
}

function getYearlyPrayerTimes(stateCode) {
	return axios.get(Constants.waktuSolatURLYearly(stateCode));
}

function getStateCodes() {
	return Object.keys(Constants.locations || {})
		.map((state) => {
			return Object.keys(Constants.locations[state] || {}).map(
				(stateCode) => {
					return stateCode;
				}
			);
		})
		.flat();
}

async function initIDB() {
	try {
		const dbName = Constants.db.name,
			aaTables = {
				settings: {
					autoIncrement: true,
					keyPath: "type",
				},
				prayerTime: {
					autoIncrement: true,
					keyPath: "zone",
				},
			};

		// Create 2 table : settings, prayerTime
		openDB(dbName, Constants.db.version, {
			upgrade(db) {
				db.createObjectStore("settings", aaTables.settings);
				db.createObjectStore("prayerTime", aaTables.prayerTime);
			},
		});

		// Add initial data for user and locations
		const dbConnection = await IDBStore(),
			tx = dbConnection.transaction(Constants.db.table, "readwrite"),
			store = tx.objectStore("settings"),
			hasRecordExist = await store.openCursor("prayertime");

		if (hasRecordExist === null) {
			// get Yearly Prayer Time Data
			const stateCodes = getStateCodes();
			for (const stateCode of stateCodes) {
				const result = await getYearlyPrayerTimes(stateCode);
				dbConnection.add("prayerTime", result.data);
			}

			// [0] Location
			dbConnection.add("settings", {
				...Constants.locationSettings,
			});
			// [1] prayerTimes
			dbConnection.add("settings", {
				// type: "prayertime",
				...Constants.prayerTimes,
			});
			// [2] User
			dbConnection.add("settings", {
				...Constants.userSettings,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

async function getSettings() {
	try {
		await initIDB();
		const dbConnection = await IDBStore(),
			idbTable = dbConnection.transaction(["settings"], "readwrite"),
			store = idbTable.objectStore("settings");
		return store.getAll();
	} catch (error) {
		console.log(error);
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
