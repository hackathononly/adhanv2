import axios from "axios";
import moment from "moment";
import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";
import { useGetTranslation } from "../customHook/useGetTranslation";
// import { useCurrentTime } from "../customHook/useGeneralHelper";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
// import { useGeneralHelper } from "../customHook/useGeneralHelper";
import Constants from "../constants";

export const useSetPrayerTimes = () => {
	const [
			{ locationSettings, languages, prayerTimes, userSettings },
			dispatch,
		] = useStateValue(),
		{ getTranslation: translate } = useGetTranslation(),
		{ setUserSettings } = useChangeUserSettings(),
		{
			addToStore,
			isRecordExist,
			updateRecord,
			getRecordByKey,
		} = useAdhanAppDB(),
		selectedLang = userSettings.selectedLang;

	const serverTime = prayerTimes.serverTime,
		hijriDate = prayerTimes.hijriDate[selectedLang],
		nextPrayer = prayerTimes.nextPrayer,
		timeToNextPrayer = prayerTimes.timeToNextPrayer,
		currentPrayerTime = prayerTimes.currentPrayerTime,
		solatTime = Constants.waktuSolatURL(
			locationSettings.selectedStateCode ||
				Constants.defaultSettings.waktuSolatStateCode
		),
		getSilencedTime = prayerTimes.silenced,
		prayerTimeList = prayerTimes.list;

	function getCurrentAndNextWaktu(object, value) {
		const obj = Object.keys(object),
			nextWaktu = obj.find((key) => object[key] === value),
			objIndex = obj.indexOf(nextWaktu),
			currentWaktu = objIndex === 0 ? obj[5] : obj[objIndex - 1];
		return { next: nextWaktu, current: currentWaktu };
	}

	function calculatePrayerTimes(datas) {
		const dateToday = moment().format("DD-MM-YYYY"),
			dateTomorrow = moment().add(1, "days").format("DD-MM-YYYY"),
			currentTime = moment().format("HH:mm:ss");

		const timeStatus = Object.values(datas.list || {}).every(function (
			dataTime
		) {
			return dataTime < currentTime;
		});

		const next = Object.values(datas.list || {})
			.map(function (s) {
				return timeStatus
					? moment(dateTomorrow + " " + s, "DD/MM/YYYY HH:mm:ss")
					: moment(dateToday + " " + s, "DD/MM/YYYY HH:mm:ss");
			})
			.find(function (m) {
				return m.isAfter();
			});

		const time = getCurrentAndNextWaktu(
			datas.list,
			next.format("HH:mm:ss")
		);

		return {
			timeToNextPrayer: next.fromNow(),
			currentPrayerTime: time.current,
			nextPrayer: time.next,
		};
	}

	function getKeyByValue(obj) {
		const bits = obj.serverTime.split(/\D/),
			month = Constants.malayMonth[bits[1]],
			targetDate = bits[2].concat("-", month, "-", bits[0]);

		let object = obj.prayerTime,
			val = Object.keys(object).find((key) => {
				return object[key].date === targetDate;
			});
		return object[val];
	}

	function getReverseDate(response) {
		return Object.keys(response || {}).map((keys) => {
			return keys;
		});
	}

	const datasFormat = {
		statePrayerTime: (prayerTimeDatas) => {
			return {
				data: {
					...prayerTimeDatas,
					prayerTime: [getKeyByValue(prayerTimeDatas || {})],
				},
			};
		},
		dayPrayerTime: (response) => {
			const prayerTime = response.prayerTime[0],
				serverDate = response.serverTime.substr(
					0,
					response.serverTime.indexOf(" ")
				);

			return {
				silenced: [],
				list: {
					fajr: prayerTime.fajr,
					syuruk: prayerTime.syuruk,
					dhuhr: prayerTime.dhuhr,
					asr: prayerTime.asr,
					maghrib: prayerTime.maghrib,
					isha: prayerTime.isha,
				},
				serverTime: prayerTime.date,
				serverDate: serverDate.split("-").reverse().join("-"),
				serverDateReverse: serverDate,
			};
		},
	};

	async function getAllData() {
		const islamicDateAPI = Constants.hijriDate(
				moment().format("YYYY-MM-DD")
			),
			islamicDateAPIArabic = Constants.hijriDateArabic(
				moment().format("DD-MM-YYYY")
			);
		try {
			const responses = await axios.all([
				axios.get(solatTime),
				axios.get(islamicDateAPI),
				axios.get(islamicDateAPIArabic),
			]);
			return responses;
		} catch (e) {
			console.log(e);
		}
	}

	async function initAdhanApp() {
		// Show Loading Bar
		setUserSettings({ showLoadingBar: true });

		// Add stores to IDB
		addToStore("settings", [userSettings, locationSettings]);

		try {
			const getStatePrayerTime = (stateCode) => {
					return axios.get(Constants.waktuSolatURLYearly(stateCode));
				},
				processStateCode = async (stateCode) => {
					const hasStateAdded = await isRecordExist(
						"prayerTime",
						stateCode
					);
					if (hasStateAdded) {
						console.log("state existed in index db");
					} else {
						const result = await getStatePrayerTime(stateCode);
						addToStore("prayerTime", result.data);
					}
				};

			getStateCodes().map((stateCode) => {
				processStateCode(stateCode);
			});

			processStateCode()
				.then(async () => {
					return await getRecordByKey("settings", "prayertime");
				})
				.then(async function (response) {
					let dataCollections = {};
					if (response) {
						// retrieve data from IDB
						const prayerTimeResponses = response,
							dateResponses = response.hijriDate,
							currentAndNextPrayers = calculatePrayerTimes(
								prayerTimeResponses
							);

						dataCollections = {
							hijriDate: dateResponses,
							...prayerTimeResponses,
							...currentAndNextPrayers,
						};
					} else {
						const fetchDatas = await getAllData(),
							prayerTimeResponses = datasFormat.dayPrayerTime(
								fetchDatas[0].data
							),
							dateResponses = [
								fetchDatas[1].data,
								fetchDatas[2].data,
							],
							currentAndNextPrayers = calculatePrayerTimes(
								prayerTimeResponses
							),
							hijriDates = calculateHijriFullDate(dateResponses);

						dataCollections = {
							hijriDate: hijriDates,
							...prayerTimeResponses,
							...currentAndNextPrayers,
						};
					}
					setPrayerTimes(dataCollections);
				})
				.then(function () {
					setUserSettings({ showLoadingBar: false });
				});
		} catch (error) {
			console.log(error);
		}
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

	function getPrayerTimeList() {
		// calculate prayer time in AMPM -> 05:56
		return Object.keys(prayerTimeList || {}).reduce((result, key) => {
			const waktuSolat = translate.prayerList[key];
			result[waktuSolat] = moment(
				`${prayerTimes.serverDate} ${prayerTimeList[key]}`,
				"YYYY-MM-DD HH:mm:ss"
			).format("hh:mm A");
			return result;
		}, {});
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

	function calculateHijriFullDate(response) {
		const reverseTarikh = getReverseDate(response[0].takwim),
			jakimDate = response[0].takwim[reverseTarikh],
			jakimMonth = jakimDate.split("-")[1],
			jakimDay = jakimDate.split("-")[2],
			alAdhanDate = response[1].data.hijri;

		const multiLanguageHijriDates = Object.keys(languages || {})
			.map((keys) => {
				const hijriFullDate = [
					jakimDay,
					keys === "arabic"
						? alAdhanDate.month.ar
						: Constants.islamicMonth[jakimMonth],
					alAdhanDate.year,
				].join(" ");
				return { [keys]: hijriFullDate };
			})
			.reduce((result, key) => {
				Object.keys(key).forEach((lang) => {
					result[lang] = key[lang];
				});
				return result;
			}, {});
		return multiLanguageHijriDates;
	}

	async function setPrayerTimes(value) {
		const prayerTimeRecord = await getRecordByKey("settings", "prayertime");
		if (prayerTimeRecord === undefined) {
			addToStore("settings", {
				type: "prayertime",
				...value,
			});
		} else {
			const datas = {
				...prayerTimeRecord,
				...value,
			};
			updateRecord("prayertime", datas);
		}

		Object.keys(value || {}).map((key) => {
			return dispatch({
				type: "setPrayerTimes",
				mode: key,
				value: value[key],
			});
		});
	}

	return {
		nextPrayer,
		timeToNextPrayer,
		// solatTime,
		hijriDate,
		serverTime,
		prayerTimeList,
		currentPrayerTime,
		getPrayerTimeList: getPrayerTimeList(),
		// setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		initAdhanApp,
	};
};
