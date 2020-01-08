import React, { useRef } from "react";
import { useOuterClickNotifier } from "../../helper";
import style from "./languageSelector.module.css";

const LanguageSelector = ({
	isShowing,
	toggleLanguageModal,
	langList,
	setLang,
	selectedLang
}) => {
	const innerRef = useRef(null);
	useOuterClickNotifier(innerRef, toggleLanguageModal);

	return isShowing ? (
		<section
			ref={innerRef}
			className={[
				style.container,
				selectedLang,
				"settingsContainer"
			].join(" ")}
		>
			{Object.keys(langList || {}).map(key => (
				<>
					<a
						key={key}
						href="/#"
						title={key}
						className={key === selectedLang ? style.active : null}
						onClick={e => setLang(e.currentTarget.text)}
					>
						{key}
					</a>
				</>
			))}
		</section>
	) : null;
};

export default LanguageSelector;
