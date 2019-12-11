import React from "react";
import style from "./datePicker.module.css";

const DatePicker = React.memo(({ hijriDate, gregorianDate }) => {
	return (
		<aside id="datePicker" className={style.datePick}>
			{hijriDate}
			<small>{gregorianDate}</small>
		</aside>
	);
});

export default DatePicker;
