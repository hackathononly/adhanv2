import React from "react"; // , { useRef }
import { Button } from "../../index";
// import { useOuterClickNotifier } from "../../customHook/useGeneralHelper";
import style from "./languageSelector.module.css";

const LanguageSelector = ({
	translate,
	// isShowing,
	// translate,
	// toggleLanguageModal,
	langList,
	setLang,
	selectedLang,
}) => {
	// const innerRef = useRef(null);
	// useOuterClickNotifier(innerRef, toggleLanguageModal);

	// return isShowing ? (
	return (
		<section
			// ref={innerRef}
			className={[style.container, "languages"].join(
				// className={[style.container, "languages", "settingsContainer"].join(
				" "
			)}
		>
			<h3>{translate.changeLang}</h3>
			{Object.keys(langList || {}).map((item, index) => (
				<Button
					key={index}
					title={item}
					type={item === selectedLang ? style.active : null}
					isShowing={(e) => setLang(e.target.innerHTML)}
				>
					{item}
				</Button>
			))}
		</section>
	);
	// ) : null;
	// ) ;
};

export default LanguageSelector;
