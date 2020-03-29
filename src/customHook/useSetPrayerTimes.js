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

	// function getKeyByValue(object, value) {
	// 	return Object.keys(object).find(key => object[key] === value);
	// }

	function getCurrentAndNextWaktu(object, value) {
		const obj = Object.keys(object),
			nextWaktu = obj.find(key => object[key] === value),
			objIndex = obj.indexOf(nextWaktu),
			currentWaktu = objIndex === 0 ? obj[5] : obj[objIndex - 1];
		return { next: nextWaktu, current: currentWaktu };
	}

	// const dateTime = {
	// currentTime(){}
	// 	formatTime() {
	// 		return "haha";
	// 	},
	// 	formatDate() {
	// 		return "lala";
	// 	}
	// };

	function calculatePrayerTimes(datas) {
		const dateToday = moment().format("DD/MM/YYYY"),
			dateTomorrow = moment()
				.add(1, "days")
				.format("DD/MM/YYYY"),
			currentTime = moment().format("HH:mm:ss"),
			timeStatus = Object.values(datas.list || {}).every(function(
				dataTime
			) {
				return dataTime < currentTime;
			}),
			next = Object.values(datas.list || {})
				.map(function(s) {
					return timeStatus
						? moment(dateTomorrow + " " + s, "DD/MM/YYYY HH:mm:ss")
						: moment(dateToday + " " + s, "DD/MM/YYYY HH:mm:ss");
				})
				.find(function(m) {
					return m.isAfter();
				});

		const time = getCurrentAndNextWaktu(
			datas.list,
			next.format("HH:mm:ss")
		);

		setPrayerTimes({
			timeToNextPrayer: next.fromNow(),
			currentPrayerTime: time.current,
			nextPrayer: time.next
		});
	}

	function storeAndCalc() {
		// setUserSettings("showLoadingBar", true);

		// https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/tarikhtakwim&period=today&datetype=miladi&date=27%20Jan%202020
		// http://api.aladhan.com/v1/gToH?date=27%20Jan%202020

		// https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=WLY01
		// https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/tarikhtakwim&period=today&datetype=miladi&date=2020-01-27
		// https://api.aladhan.com/v1/gToH?date=27-01-2020

		axios
			.get("sampledata/daily.json")
			// axios
			// 	.get(solatTime)
			.then(obj => {
				const response = obj.data,
					prayerTime = response.prayerTime[0],
					serverDate = response.serverTime.substr(
						0,
						response.serverTime.indexOf(" ")
					),
					datas = {
						silenced: [],
						list: {
							fajr: prayerTime.fajr,
							syuruk: prayerTime.syuruk,
							dhuhr: prayerTime.dhuhr,
							asr: prayerTime.asr,
							maghrib: prayerTime.maghrib,
							isha: prayerTime.isha
						},
						// serverTime: moment(
						// 	`${serverTime} ${time.isha}`,
						// 	"YYYY-MM-DD HH:mm:ss"
						// ).format("hh:mm A"),
						serverTime: prayerTime.date.split("-").join(" "),
						serverDate: serverDate
							.split("-")
							.reverse()
							.join("-"),
						serverDateReverse: serverDate
					};
				return datas;
			})
			.then(datas => {
				setPrayerTimes(datas); // save datas above into DB
				getHijriFullDate(datas.serverDate, datas.serverDateReverse); // calculate dates - Hijri and Gregorian
				calculatePrayerTimes(datas); // calculate currentPrayerTime, nextPrayerTime and save into DB
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

	function getHijriFullDate(serverDate, serverDateReverse) {
		const islamicDateAPI = Constants.hijriDate(serverDateReverse), // islamicDateAPI = "/sampledata/constants-date.json",
			islamicDateAPIArabic = Constants.hijriDateArabic(serverDate);

		axios
			.all([axios.get(islamicDateAPI), axios.get(islamicDateAPIArabic)])
			.then(obj => {
				const hijriDate = obj[0].data.takwim[serverDateReverse], // Jakim Obj
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
		setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		storeAndCalc
	};
};
