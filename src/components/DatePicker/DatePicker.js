import React from "react";
import style from "./datePicker.module.css";

const DatePicker = React.memo(
	({ isShowing, selectedLang, hijriDate, gregorianDate }) => {
		return !isShowing ? (
			<time className={[style.datePicker, `rtl`].join(" ")}>
				{gregorianDate} / <span>{hijriDate}</span>
			</time>
		) : null;
	}
);

export default DatePicker;
