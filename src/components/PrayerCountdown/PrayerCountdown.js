import React from "react";
import style from "./prayerCountdown.module.css";

const PrayerCountdown = ({ timeToNextPrayer, nextPrayer, translate }) => {
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
