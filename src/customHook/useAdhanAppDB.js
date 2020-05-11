import { openDB } from "idb";
import { useStateValue } from "../state";
import Constants from "../constants";

export const useAdhanAppDB = () => {
	const [{ locationSettings, userSettings }] = useStateValue(),
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
		const store = (await transactionIDB()).objectStore(storeName);
		let cursor = (await store.openCursor(keyPath)) !== null;
		return cursor;
	}

	// addToStore("settings", userSettings);
	async function addToStore(storeName, value) {
		const keyPath = value.type || value.zone;

		try {
			const recordStatus = await isRecordExist(storeName, keyPath);
			if (recordStatus) {
				// console.log("key exist");
				return;
			} else {
				// console.log("dont exist");
				(await IDBStore()).add(storeName, {
					...value,
					type: value.type,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function updateRecord(key, value) {
		const store = (await transactionIDB()).objectStore("settings"),
			newKey = key,
			data = key === "user" ? userSettings : locationSettings,
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
		// store.put({ type: key, newData });
		try {
			store.put(newData);
		} catch (error) {
			console.log(error);
		}
	}

	return {
		addToStore,
		updateRecord,
		isRecordExist,
	};
};
