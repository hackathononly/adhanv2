import React from "react";
import style from "./loadingBar.module.css";
import { LoadingBarIcon, Footer } from "../../index";

const LoadingBar = () => {
	// const LoadingBar = ({ isShowing, translate }) => {
	// return isShowing ? (
	return (
		<div className={style.loadingBarContainer}>
			<div className={style.spinner}>
				<LoadingBarIcon />
				Loading
			</div>
			<Footer />
		</div>
	);
	// ) : null;
};

export default LoadingBar;
