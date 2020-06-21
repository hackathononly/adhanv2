import React from "react";
import style from "./datePicker.module.css";

const DatePicker = ({ isShowing, hijriDate, gregorianDate }) => {
	return !isShowing ? (
		// <time className={[style.datePicker, `rtl`].join(" ")}>
		<time className={style.datePicker}>
			{gregorianDate} / <span>{hijriDate}</span>
		</time>
	) : null;
};
export default DatePicker;
