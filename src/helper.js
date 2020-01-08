import { useEffect } from "react";
// import { useChangeUserSettings } from "../src/customHook/useChangeUserSettings";
// export const Helper = item => {
// 	Object.keys(item).length === 0 && item.constructor === Object;
// };

// export const Helper = {
// 	isObjectEmpty: ({ item }) =>
// 		Object.keys(item).length === 0 && item.constructor === Object
// };

export const isObjectEmpty = item => {
	return Object.keys(item).length === 0 && item.constructor === Object;
};

export const useOuterClickNotifier = (innerRef, toggleModal) => {
	useEffect(() => {
		if (innerRef.current) {
			document.addEventListener("click", handleClick);
		}
		return () => document.removeEventListener("click", handleClick);

		function handleClick(e) {
			innerRef.current &&
				!innerRef.current.contains(e.target) &&
				toggleModal();
		}
	}, [toggleModal, innerRef]);
};

/*
export const func1=()=>{}
export const func2=()=>{}
*/

// import {func1,func2,func3} from 'path_to_fileA';
