import axios from "axios";
import moment from "moment";
import { openDB } from "idb";

import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
import Constants from "../constants";

export const useSetPrayerTimes = () => {
	const [
			{ locationSettings, prayerTimes, userSettings },
			dispatch,
		] = useStateValue(),
		// { getTranslation: translate } = useGetTranslation(),
		{ setUserSettings } = useChangeUserSettings(),
		{
			addToStore,
			isRecordExist,
			updateRecord,
			getRecordByKey,
		} = useAdhanAppDB(),
		selectedLang = userSettings.selectedLang;

	const hijriDate = prayerTimes.hijriDate[selectedLang],
		nextPrayer = prayerTimes.nextPrayer,
		serverTime = prayerTimes.serverTime,
		getSilencedTime = prayerTimes.silenced,
		timeToNextPrayer = prayerTimes.timeToNextPrayer;

	const dateToday = moment().format("DD-MM-YYYY"),
		dateTodayMalay = function () {
			const dateSplit = dateToday.split(/\D/),
				month = Constants.monthMalay[dateSplit[1]];
			return dateSplit[0].concat("-", month, "-", dateSplit[2]);
		};

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
	function getTodayPrayerTime(obj) {
		if (obj) {
			let object = obj.prayerTime,
				val = Object.keys(object).find((key) => {
					return object[key].date === dateTodayMalay();
				});
			return object[val];
		} else {
			console.error(obj, " obj undefined");
			return {};
		}
	}
	function getHijriFullDate(response) {
		const hijriFull = response.hijri.split("-"),
			hijriMonth = Constants.islamicMonthMalay[hijriFull[1]],
			hijrifullDate =
				hijriFull[2] + " " + hijriMonth + " \u200E" + hijriFull[0],
			hijriMonthArabic = Constants.islamicMonthArab[hijriFull[1]],
			hijrifullDateArabic =
				hijriFull[2] +
				" " +
				hijriMonthArabic +
				" \u200E" +
				hijriFull[0];

		setPrayerTimes({
			arabic: hijrifullDateArabic,
			bahasa: hijrifullDate,
			english: hijrifullDate,
		});
	}
	function calculateCurrentNextPrayerTimes(datas) {
		const dateTomorrow = moment().add(1, "days").format("DD-MM-YYYY"),
			currentTime = moment().format("HH:mm:ss"),
			prayerTimeData = datas.list;

		const timeStatus = Object.values(prayerTimeData || {}).every(function (
			dataTime
		) {
			return dataTime < currentTime;
		});

		const next = Object.values(prayerTimeData || {})
			.map(function (s) {
				return timeStatus
					? moment(dateTomorrow + " " + s, "DD/MM/YYYY HH:mm:ss")
					: moment(dateToday + " " + s, "DD/MM/YYYY HH:mm:ss");
			})
			.find(function (m) {
				return m.isAfter();
			});

		const obj = Object.keys(prayerTimeData),
			nextPrayerTime = obj.find(
				(key) => prayerTimeData[key] === next.format("HH:mm:ss")
			),
			objIndex = obj.indexOf(nextPrayerTime),
			currentPrayerTime = objIndex === 0 ? obj[5] : obj[objIndex - 1];

		setPrayerTimes({
			timeToNextPrayer: next.fromNow(),
			currentPrayerTime: currentPrayerTime,
			nextPrayer: nextPrayerTime,
			serverDate: "21-06-2020",
		});
	}
	function getInitalPrayerTimes(todayPrayerTime) {
		return {
			list: {
				fajr: todayPrayerTime.fajr,
				syuruk: todayPrayerTime.syuruk,
				dhuhr: todayPrayerTime.dhuhr,
				asr: todayPrayerTime.asr,
				maghrib: todayPrayerTime.maghrib,
				isha: todayPrayerTime.isha,
			},
			serverTime: todayPrayerTime.date,
		};
	}
	function initIDB() {
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

		openDB(dbName, 1, {
			upgrade(db) {
				db.createObjectStore("settings", aaTables.settings);
				db.createObjectStore("prayerTime", aaTables.prayerTime);
			},
		});
	}
	async function initAdhanApp() {
		try {
			// Initiate Indexed DB
			initIDB();

			// Show Loading Bar
			setUserSettings({ showLoadingBar: true });

			// Add stores to IDB
			addToStore("settings", [userSettings, locationSettings]);

			const getYearlyPrayerTimes = (stateCode) => {
				return axios.get(Constants.waktuSolatURLYearly(stateCode));
			};

			async function setYearlyPrayerTimes() {
				const stateCodes = await getStateCodes();
				for (const stateCode of stateCodes) {
					const hasStateAdded = await isRecordExist(
						"prayerTime",
						stateCode
					);
					if (hasStateAdded) {
						console.info("State already exist in index DB");
					} else {
						const result = await getYearlyPrayerTimes(stateCode);
						addToStore("prayerTime", result.data);
					}
				}
			}

			setYearlyPrayerTimes().then(async () => {
				const selectedStatePrayerTime = await getRecordByKey(
						"prayerTime",
						locationSettings.selectedStateCode
					),
					todayPrayerTime = await getTodayPrayerTime(
						selectedStatePrayerTime
					),
					prayerTimeFull = getInitalPrayerTimes(todayPrayerTime);

				getHijriFullDate(todayPrayerTime);
				calculateCurrentNextPrayerTimes(prayerTimeFull);
			});
		} catch (error) {
			console.error(error.message);
		} finally {
			setUserSettings({ showLoadingBar: false });
		}
	}
	function setSilencedTime(prayerTime) {
		const isPrayerTimeSilenced = getSilencedTime.indexOf(prayerTime);

		if (isPrayerTimeSilenced === -1) {
			// prayerTime does not silenced
			setPrayerTimes({
				silenced: [...getSilencedTime, prayerTime],
			});
		} else {
			// prayerTime already silenced
			getSilencedTime.splice(isPrayerTimeSilenced, 1);
			setPrayerTimes({
				silenced: [...getSilencedTime],
			});
		}
	}
	function getPrayerTimeList() {
		return prayerTimes.list;
		// return Object.keys(prayerTimes.list || {}).reduce((result, key) => {
		// 	const waktuSolat = translate.prayerList[key];
		// 	result[waktuSolat] = moment(
		// 		`${prayerTimes.serverDate} ${prayerTimes.list[key]}`,
		// 		"YYYY-MM-DD HH:mm:ss"
		// 	).format("hh:mm A");
		// 	return result;
		// }, {});
	}
	async function setPrayerTimes(value) {
		try {
			const prayerTimeRecord = await getRecordByKey(
				"settings",
				"prayertime"
			);

			if (prayerTimeRecord === undefined) {
				addToStore("settings", {
					type: "prayertime",
					...value,
				});
			} else {
				updateRecord("prayertime", {
					...prayerTimeRecord,
					...value,
				});
			}

			Object.keys(value || {}).map((key) => {
				return dispatch({
					type: "setPrayerTimes",
					mode: key,
					value: value[key],
				});
			});
		} catch (error) {
			console.error(error);
		}
	}

	return {
		nextPrayer,
		timeToNextPrayer,
		hijriDate,
		serverTime,
		getPrayerTimeList: getPrayerTimeList(),
		setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		initAdhanApp,
		getTodayPrayerTime,
		calculateCurrentNextPrayerTimes,
	};
};
