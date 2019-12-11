import React from "react";
import style from "./tazkirah.module.css";

const Tazkirah = ({ description }) => {
	return (
		<section id="tazkirah" className={style.tazkirah}>
			<h3 className={style.text}>{description}</h3>
		</section>
	);
};
export default Tazkirah;
