import axios from "axios";
import moment from "moment";
import { useStateValue } from "../state";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
import Constants from "../constants";

export const useSetPrayerTimes = () => {
	const [
			{ locationSettings, languages, prayerTimes, userSettings },
			dispatch
		] = useStateValue(),
		{ getTranslation: translate } = useGetTranslation(),
		{ setUserSettings } = useChangeUserSettings(),
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

	function storeAndCalc() {
		setUserSettings("showLoadingBar", true);

		// axios.get("sampledata/daily.json").then(obj => {
		axios.get(solatTime).then(obj => {
			const response = obj.data,
				time = response.prayerTime[0],
				serverTime = response.serverTime
					.substr(0, response.serverTime.indexOf(" "))
					.split("-")
					.reverse()
					.join("-"),
				datas = {
					silenced: ["dhuhr", "isha"],
					list: {
						fajr: time.fajr,
						syuruk: time.syuruk,
						dhuhr: time.dhuhr,
						asr: time.asr,
						maghrib: time.maghrib,
						isha: time.isha
					},
					serverTime: time.date.split("-").join(" "),
					serverDate: response.serverTime.substr(
						0,
						response.serverTime.indexOf(" ")
					),
					timeToNextPrayer: "1 jam 15 min",
					nextPrayer: "Maghrib"
				};

			setPrayerTimes(datas);
			getHijriFullDate(serverTime);

			// calcNextPrayer(response.serverTime);

			// setPrayerTimes({
			// 	timeToNextPrayer: "2 jam 15 min",
			// 	nextPrayer: "Maghrib"
			// });
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
				silenced: [...getSilencedTime, prayerTime]
			});
		} else {
			// prayerTime already silenced
			getSilencedTime.splice(isPrayerTimeSilenced, 1);
			setPrayerTimes({
				silenced: [...getSilencedTime]
			});
		}
	}

	/* function calcNextPrayer(time) {
		// var firstDate = moment();
		// var secondDate = moment(time);
		// var secondDate = moment("2018-03-19");
		// var yearDiff = firstDate.diff(secondDate, "year");
		// var monthDiff = firstDate.diff(secondDate, "month");
		// var dayDiff = firstDate.diff(secondDate, "day");
		// console.log(
		// 	// moment(time),
		// 	// firstDate,
		// 	// secondDate,
		// 	yearDiff + " Years, " + monthDiff + " Months, " + dayDiff + " Days"
		// );

		setPrayerTimes({
			timeToNextPrayer: "2 jam 15 min",
			nextPrayer: "Maghrib"
		});
	} */

	function getHijriFullDate(serverTime) {
		const reverseServerTime = serverTime
				.split("-")
				.reverse()
				.join("-"),
			islamicDateAPI = Constants.hijriDate(reverseServerTime),
			// islamicDateAPI = "/sampledata/constants-date.json",
			islamicDateAPIArabic = Constants.hijriDateArabic(serverTime);

		axios
			.all([axios.get(islamicDateAPI), axios.get(islamicDateAPIArabic)])
			.then(obj => {
				const hijriDate = obj[0].data.takwim[reverseServerTime], // Jakim Obj
					hijriDateArabic = obj[1].data.data.hijri, // Aladhan Obj
					jakimHijriMonth = hijriDate.split("-")[1], // [ "04" ]
					jakimHijriDay = hijriDate.split("-")[2]; // [ "19" ]

				const multiLanguageHijriDates = Object.keys(languages || {})
					.map(keys => {
						const hijriFullDate = [
							jakimHijriDay,
							keys === "arabic"
								? hijriDateArabic.month.ar
								: Constants.islamicMonth[jakimHijriMonth],
							hijriDateArabic.year
						].join(" ");
						return { [keys]: hijriFullDate };
					})
					.reduce((result, key) => {
						Object.keys(key).forEach(lang => {
							result[lang] = key[lang];
						});
						return result;
					}, {});

				setPrayerTimes({
					hijriDate: multiLanguageHijriDates
				});
				setUserSettings("showLoadingBar", false);
			}, []);
	}

	function setPrayerTimes(obj) {
		Object.keys(obj || {}).map(key => {
			return dispatch({
				type: "setPrayerTimes",
				mode: key,
				value: obj[key]
			});
		});
	}

	return {
		nextPrayer,
		timeToNextPrayer,
		solatTime, // pass state code to axios on Body
		hijriDate,
		getHijriFullDate,
		serverTime,
		prayerTimeList,
		currentPrayerTime,
		getPrayerTimeList: getPrayerTimeList(),
		// calcNextPrayer, // set nextPrayer, timeToNextPrayer
		setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		storeAndCalc
	};
};
