import { useEffect } from "react";
import { useChangeLocationSettings } from "../customHook/useChangeLocationSettings";

// export const isObjectEmpty = item => {
// 	return Object.keys(item).length === 0 && item.constructor === Object;
// };

// export const useScrollNotifier = (refElement, checkIsScrolling) => {
// 	function handleScroll(e) {
// 		const node = e.target,
// 			lastScrollTop = 0,
// 			st = window.pageYOffset || node.scrollTop;

// 		st > lastScrollTop ? checkIsScrolling(true) : checkIsScrolling(false);
// 		// lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// 	}

// 	useEffect(() => {
// 		document.addEventListener("scroll", handleScroll, true);
// 		return () => {
// 			document.removeEventListener("scroll", handleScroll);
// 		};
// 	}, []);
// };

export const useOuterClickNotifier = (refElement, toggleModal) => {
	// used on language selector , settings, location selector
	const {
		locationSettings,
		setLocationSettings
	} = useChangeLocationSettings();

	function handleClick(e) {
		refElement.current &&
			!refElement.current.contains(e.target) &&
			toggleModal();
	}
	function escFunction(e) {
		if (e.keyCode === 27 && locationSettings.isNested) {
			setLocationSettings({
				isNested: !locationSettings.isNested
			});
		} else {
			toggleModal();
		}
	}
	useEffect(() => {
		if (refElement.current) {
			document.addEventListener("click", handleClick);
			document.addEventListener("keydown", escFunction, false);
		}
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("keydown", escFunction, false);
		};
	}, [toggleModal, refElement]);
};

/*
export const func1=()=>{}
export const func2=()=>{}
*/

// import {func1,func2,func3} from 'path_to_fileA';