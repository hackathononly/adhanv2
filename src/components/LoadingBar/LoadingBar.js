import React from "react";
import style from "./loadingBar.module.css";
import { LoadingBarIcon } from "../../index";

const LoadingBar = ({ isShowing, translate }) => {
	return isShowing ? (
		<div className={style.loadingBarContainer}>
			<div className={style.spinner}>
				<LoadingBarIcon />
				Loading
			</div>
			<footer>
				<a href="/#">{translate.credit}</a>
				<span title={translate.subcredit}> {translate.subcredit}</span>
			</footer>
		</div>
	) : null;
};

export default LoadingBar;
