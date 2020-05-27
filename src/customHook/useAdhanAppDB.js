import { openDB } from "idb";
import { useStateValue } from "../state";
import Constants from "../constants";
import { useLayoutEffect } from "react";

export const useAdhanAppDB = () => {
	const [{ locationSettings, userSettings, prayerTimes }] = useStateValue(),
		tableName = Constants.db.table,
		dbName = Constants.db.name,
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

	(async () => {
		openDB(dbName, 1, {
			upgrade(db) {
				db.createObjectStore("settings", aaTables.settings);
				db.createObjectStore("prayerTime", aaTables.prayerTime);
			},
		});
	})();

	async function IDBStore() {
		return await openDB(dbName, 1);
	}

	async function transactionIDB() {
		return (await IDBStore()).transaction(tableName, "readwrite");
	}

	async function isRecordExist(storeName, keyPath) {
		const store = (await transactionIDB()).objectStore(storeName),
			cursor = (await store.openCursor(keyPath)) !== null;
		return cursor;
	}

	async function getRecordByKey(storeName, keyPath) {
		const store = (await transactionIDB()).objectStore(storeName);
		return store.get(keyPath);
	}

	async function addToStore(storeName, value) {
		const isValueInArray = Array.isArray(value),
			add = async (key, value) => {
				(await IDBStore()).add(storeName, {
					...value,
					type: key,
				});
			},
			checkRecordStatus = async (key, value) => {
				const recordStatus = await isRecordExist(storeName, key);
				recordStatus
					? console.log(storeName, key, "record exist in IDB")
					: add(key, value);
			};

		if (isValueInArray) {
			value.forEach((value) => {
				checkRecordStatus(value.type, value);
			});
		} else {
			checkRecordStatus(value.type || value.zone, value);
		}
	}

	async function updateRecord(key, value) {
		const store = (await transactionIDB()).objectStore("settings"),
			newKey = key,
			data =
				key === "user"
					? userSettings
					: key === "location"
					? locationSettings
					: await store.get("prayertime"),
			newData = Object.keys(data || {})
				.map((key) => {
					return value[key] !== undefined
						? {
								...data,
								type: newKey,
								[key]: value[key],
						  }
						: "";
				})
				.filter((item) => item !== "")[0]; // filter for first, non-empty item
		try {
			store.put(key === "prayertime" ? value : newData);
		} catch (error) {
			console.log(error);
		}
	}

	return {
		addToStore,
		updateRecord,
		isRecordExist,
		getRecordByKey,
	};
};
