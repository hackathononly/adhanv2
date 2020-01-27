import {
	useEffect
	// , useRef
} from "react";
// import { useChangeUserSettings } from "../src/customHook/useChangeUserSettings";
// export const Helper = item => {
// 	Object.keys(item).length === 0 && item.constructor === Object;
// };

// export const Helper = {
// 	isObjectEmpty: ({ item }) =>
// 		Object.keys(item).length === 0 && item.constructor === Object
// };

// export const isObjectEmpty = item => {
// 	return Object.keys(item).length === 0 && item.constructor === Object;
// };

export const useOuterClickNotifier = (refElement, toggleModal) => {
	function handleClick(e) {
		refElement.current &&
			!refElement.current.contains(e.target) &&
			toggleModal();
	}
	function escFunction(e) {
		if (e.keyCode === 27) {
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
