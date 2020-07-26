import { useEffect, useCallback } from "react";
// import moment from "moment";
// import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";
import { useChangeLocationSettings } from "../customHook/useChangeLocationSettings";

// export const isObjectEmpty = item => {
// 	return Object.keys(item).length === 0 && item.constructor === Object;
// };

/*
	export const useCurrentTime = () => {
		const currentTime = moment.utc().local();
		const [seconds, setSeconds] = useState(currentTime);

		useEffect(() => {
			const interval = setInterval(() => {
				setSeconds(currentTime.add(1, "s").format("HH:mm:ss"));
			}, 1000);
			return () => clearInterval(interval);
		}, [currentTime]);

		return seconds;
	};
*/

export const useScrollNotifier = (refElement, checkIsScrolling) => {
	// function handleScroll(e) {
	// 	const node = e.target,
	// 		lastScrollTop = 0,
	// 		st = window.pageYOffset || node.scrollTop;

	// 	st > lastScrollTop ? checkIsScrolling(true) : checkIsScrolling(false);
	// 	// lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	// }

	// const handleScroll = useCallback(e => {
	// 	const node = e.target,
	// 		lastScrollTop = 0,
	// 		st = window.pageYOffset || node.scrollTop;

	// 	st > lastScrollTop ? checkIsScrolling(true) : checkIsScrolling(false);
	// }, []);

	const handleScroll = useCallback(
		(e) => {
			const node = e.target,
				lastScrollTop = 0,
				st = window.pageYOffset || node.scrollTop;
			document.body.style = "--scrollingSize: " + st + "px";
			st > lastScrollTop
				? checkIsScrolling(true)
				: checkIsScrolling(false);
		},
		[checkIsScrolling]
	);

	useEffect(() => {
		document.addEventListener("scroll", handleScroll, true);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [refElement]);
};

export const useOuterClickNotifier = (refElement, toggleModal) => {
	// used on language selector , settings, location selector
	const {
		locationSettings,
		setLocationSettings,
	} = useChangeLocationSettings();

	const handleClick = useCallback(
		(e) => {
			refElement.current &&
				!refElement.current.contains(e.target) &&
				toggleModal();
		},
		[refElement, toggleModal]
	);

	const escFunction = useCallback(
		(e) => {
			if (e.keyCode === 27 && locationSettings.isNested) {
				setLocationSettings({
					isNested: !locationSettings.isNested,
				});
			} else {
				toggleModal();
			}
		},
		[locationSettings, setLocationSettings, toggleModal]
	);
	useEffect(() => {
		if (refElement.current) {
			document.addEventListener("click", handleClick);
			document.addEventListener("keydown", escFunction, false);
		}
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("keydown", escFunction, false);
		};
	}, [handleClick, escFunction, refElement]);
};

/*
export const func1=()=>{}
export const func2=()=>{}
*/

// import {func1,func2,func3} from 'path_to_fileA';
