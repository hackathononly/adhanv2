import React from "react";
import style from "./prayerCountdown.module.css";

const PrayerCountdown = ({ timeToNextPrayer, nextPrayer, translate }) => {
	return (
		<div className={style.container}>
			<h2>
				<span>{timeToNextPrayer}</span> {translate.prayerTimeEstimate}{" "}
				<b>{translate.prayerList[nextPrayer]}</b>
			</h2>
		</div>
	);
};

export default PrayerCountdown;
