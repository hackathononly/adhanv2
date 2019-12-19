import React from "react";
import style from "./languageSelector.module.css";

const LanguageSelector = ({ langList, setLang, selectedLang }) => {
	return (
		// <section className={[style.container, "clearfix"].join(" ")}>
		<section className={style.container}>
			<ul>
				{Object.keys(langList || {}).map(key => (
					<li key={key}>
						<a
							href="/#"
							key={key}
							title={key}
							className={
								key === selectedLang ? style.active : null
							}
							onClick={e => setLang(e.currentTarget.text)}
						>
							{key}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
};

export default LanguageSelector;
