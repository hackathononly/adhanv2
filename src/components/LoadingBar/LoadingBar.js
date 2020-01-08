import React from "react";
import style from "./loadingBar.module.css";
import { LoadingBarIcon } from "../../index";

const LoadingBar = ({ isShowing }) => {
	return isShowing ? (
		<div className={style.loadingBarContainer}>
			<div className={style.spinner}>
				<LoadingBarIcon />
				Loading
			</div>
		</div>
	) : null;
};

export default LoadingBar;
