import moment from "moment";
import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";
import { useGetTranslation } from "../customHook/useGetTranslation";
import Constants from "../constants";

export const useSetPrayerTimes = () => {
	const [
		{ locationSettings, prayerTimes, userSettings },
		dispatch,
	] = useStateValue(),
		{ getTranslation: translate } = useGetTranslation(),
		{ updateRecord, getRecordByKey } = useAdhanAppDB(),
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

	async function getTodayPrayerTime() {
		const obj = await getRecordByKey(
			"prayerTime",
			locationSettings.selectedStateCode
		);
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
	async function getHijriFullDate() {
		const response = await getTodayPrayerTime();

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
		return {
			hijriDate: {
				arabic: hijrifullDateArabic,
				bahasa: hijrifullDate,
				english: hijrifullDate,
			},
		};
	}
	async function calculateCurrentNextPrayerTimes() {
		const todayPrayerTime = await getTodayPrayerTime(),
			datas = getPrayerTimeDatas(todayPrayerTime);

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

		return {
			...datas,
			timeToNextPrayer: next.fromNow(),
			currentPrayerTime: currentPrayerTime,
			nextPrayer: nextPrayerTime,
			serverDate: dateToday,
		};
	}
	function getPrayerTimeDatas(todayPrayerTime) {
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
	async function initAdhanApp() {
		try {
			const hijriDates = await getHijriFullDate(),
				currentNextPrayerTimes = await calculateCurrentNextPrayerTimes();

			setPrayerTimes({
				type: "prayertime",
				...hijriDates,
				...currentNextPrayerTimes,
			});
		} catch (error) {
			console.error(error.message);
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
	function getFormattedPrayerTimeList() {
		return Object.keys(prayerTimes.list || {}).reduce((result, key) => {
			const waktuSolat = translate.prayerList[key];
			result[waktuSolat] = moment(
				`${prayerTimes.serverDate} ${prayerTimes.list[key]}`,
				"YYYY-MM-DD HH:mm:ss"
			).format("hh:mm A");
			return result;
		}, {});
	}
	async function setPrayerTimes(value) {
		try {
			const prayerTimeRecord = await getRecordByKey(
				"settings",
				"prayertime"
			);

			updateRecord("prayertime", {
				...prayerTimeRecord,
				...value,
			});

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
		getPrayerTimeDatas,
		nextPrayer,
		timeToNextPrayer,
		hijriDate,
		serverTime,
		prayerTimeList: getFormattedPrayerTimeList(),
		setPrayerTimes,
		setSilencedTime,
		getSilencedTime,
		initAdhanApp,
		getTodayPrayerTime,
		calculateCurrentNextPrayerTimes,
	};
};
