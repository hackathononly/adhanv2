import React from "react";
import { Button } from "../../index";
import style from "./languageSelector.module.css";

const LanguageSelector = ({ translate, langList, setLang, selectedLang }) => {
	return (
		<section className={[style.container, "languages"].join(" ")}>
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
};

export default LanguageSelector;
