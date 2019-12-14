import React from "react";
import style from "./datePicker.module.css";

const DatePicker = React.memo(({ hijriDate, gregorianDate }) => {
	return (
		<aside id="datePicker" className={style.datePick}>
			<b>{gregorianDate}</b>
			<small>{hijriDate}</small>
		</aside>
	);
});

export default DatePicker;
