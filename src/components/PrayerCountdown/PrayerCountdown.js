import React from "react";
import style from "./prayerCountdown.module.css";
import { useGetTranslation } from "../../customHook/useGetTranslation";

const PrayerCountdown = ({ timeToNextPrayer, nextPrayer }) => {
	const { getTranslation: translate } = useGetTranslation();

	return (
		<div className={style.container}>
			<h2>{timeToNextPrayer}</h2>
			<span>
				{translate.prayerTimeEstimate} <b>{nextPrayer}</b>
			</span>
		</div>
	);
};

export default PrayerCountdown;
