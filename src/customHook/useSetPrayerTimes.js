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
		{ addToStore, isRecordExist } = useAdhanAppDB(),
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

	// function getKeyByValue(object, value) {
	// 	return Object.keys(object).find(key => object[key] === value);
	// }

	function getCurrentAndNextWaktu(object, value) {
		const obj = Object.keys(object),
			nextWaktu = obj.find((key) => object[key] === value),
			objIndex = obj.indexOf(nextWaktu),
			currentWaktu = objIndex === 0 ? obj[5] : obj[objIndex - 1];
		return { next: nextWaktu, current: currentWaktu };
	}

	function calculatePrayerTimes(datas) {
		const dateToday = moment().format("DD/MM/YYYY"),
			dateTomorrow = moment().add(1, "days").format("DD/MM/YYYY"),
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

		// calcute difference time
		// var now = dateToday + currentTime;
		// var then = dateToday + "10:20:30";
		// console.log(
		// 	moment
		// 		.utc(
		// 			moment(now, "DD/MM/YYYY HH:mm:ss").diff(
		// 				moment(then, "DD/MM/YYYY HH:mm:ss")
		// 			)
		// 		)
		// 		.format("HH:mm:ss")
		// );

		const time = getCurrentAndNextWaktu(
			datas.list,
			next.format("HH:mm:ss")
		);

		setPrayerTimes({
			timeToNextPrayer: next.fromNow(),
			currentPrayerTime: time.current,
			nextPrayer: time.next,
		});
	}

	function storeAndCalc() {
		// Show loading bar
		setUserSettings({ showLoadingBar: true });

		// init - userSettings, locationSettings, date
		addToStore("settings", userSettings);
		addToStore("settings", locationSettings);

		const prayerTimeData = (response) => {
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
				serverTime: prayerTime.date.split("-").join(" "),
				serverDate: serverDate.split("-").reverse().join("-"),
				serverDateReverse: serverDate,
			};
		};

		// const getData = axios.get("sampledata/daily.json");
		const getData = axios.get(solatTime);
		getData
			.then((response) => {
				const datas = prayerTimeData(response.data);

				setPrayerTimes(datas);
				calculatePrayerTimes(datas);
				setYearlyPrayerTime(); // Save yearly prayertime
				setHijriFullDate(datas.serverDate, datas.serverDateReverse); // ! shouldnt called every API call
				setUserSettings({ showLoadingBar: false });
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function setYearlyPrayerTime() {
		Object.keys(Constants.locations || {}).map((state) => {
			return Object.keys(Constants.locations[state] || {}).map(
				async (stateCode) => {
					async function getYearlyData() {
						const result = await axios
							.get(Constants.waktuSolatURLYearly(stateCode))
							.catch((e) => {
								console.log(e);
							});
						addToStore("prayerTime", result.data);
					}

					// hardcode Johor Code - JHR01
					isRecordExist("prayerTime", "JHR01").then((status) => {
						if (status) {
							console.log("rec exist in index db");
						} else {
							getYearlyData();
						}
					});
				}
			);
		});
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

	function setHijriFullDate(serverDate, serverDateReverse) {
		const islamicDateAPI = Constants.hijriDate(serverDateReverse), // islamicDateAPI = "/sampledata/constants-date.json",
			islamicDateAPIArabic = Constants.hijriDateArabic(serverDate);

		const dateData = (response) => {
			const jakimDate = response[0].data.takwim[serverDateReverse],
				jakimMonth = jakimDate.split("-")[1],
				jakimDay = jakimDate.split("-")[2],
				alAdhanDate = response[1].data.data.hijri;

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
		};

		axios
			.all([axios.get(islamicDateAPI), axios.get(islamicDateAPIArabic)])
			.then((responses) => {
				setPrayerTimes({
					hijriDate: dateData(responses),
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function setPrayerTimes(obj) {
		Object.keys(obj || {}).map((key) => {
			return dispatch({
				type: "setPrayerTimes",
				mode: key,
				value: obj[key],
			});
		});
	}

	return {
		nextPrayer,
		timeToNextPrayer,
		// solatTime, // pass state code to axios on Body
		hijriDate,
		serverTime,
		prayerTimeList,
		currentPrayerTime,
		getPrayerTimeList: getPrayerTimeList(),
		// setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		storeAndCalc,
	};
};
