import React from "react";
import style from "./datePicker.module.css";

const DatePicker = React.memo(
	({ isShowing, selectedLang, hijriDate, gregorianDate }) => {
		return !isShowing ? (
			<div className={style.datePicker}>
				<span className={style[selectedLang]}>
					{gregorianDate}
					<small>{hijriDate}</small>
				</span>
			</div>
		) : null;
	}
);

export default DatePicker;
