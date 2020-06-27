import React from "react";
import style from "./loadingBar.module.css";
import { LoadingBarIcon } from "../../index";

const LoadingBar = () => {
	// const LoadingBar = ({ isShowing, translate }) => {
	// return isShowing ? (
	return (
		<div className={style.loadingBarContainer}>
			<div className={style.spinner}>
				<LoadingBarIcon />
				Loading
			</div>
			<footer>
				<a href="/">AA</a>
				<span title="coded in Malaysia"> coded in Malaysia</span>
				<span title="Thank you frontliners #covid19Malaysia">
					{" "}
					Thank you frontliners #covid19Malaysia
				</span>
				{/* <a href="/#">{translate.credit}</a>
				<span title={translate.subcredit}> {translate.subcredit}</span>
				<span title={translate.subcredit_extra}>
					{" "}
					{translate.subcredit_extra}
				</span> */}
			</footer>
		</div>
	);
	// ) : null;
};

export default LoadingBar;
