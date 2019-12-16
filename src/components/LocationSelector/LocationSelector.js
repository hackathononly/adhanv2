import React from "react";
import style from "./locationSelector.module.css";
import { useGetTranslation } from "../../customHook/useGetTranslation";

const LocationSelector = ({
	setStateName,
	setStateCode,
	locations,
	locationSettings
}) => {
	const { getTranslation: translation } = useGetTranslation();

	return (
		<div className={style.locationSelector}>
			<ul
				className="locationsContainer"
				style={{
					left: locationSettings.isNested ? "-100%" : "0",
					transitionDuration: locationSettings.isNested
						? "300ms"
						: "300ms"
				}}
			>
				{Object.keys(locations || {}).map(state => (
					<li key={state}>
						<a
							href="/#"
							title={state}
							onClick={() => setStateName(state)}
						>
							{state}
						</a>
						<ul
							style={{
								display:
									locationSettings.selectedState === state
										? "block"
										: "none"
							}}
						>
							<li className={style.home}>
								<a
									href="/#"
									onClick={() => setStateName(state)}
									title={translation.backDesc}
								>
									{translation.back}
								</a>
							</li>
							{Object.keys(locations[state] || {}).map(
								subitem => (
									<li key={subitem}>
										<a
											href="/#"
											title={subitem}
											className={
												subitem === locationSettings.selectedStateCode
													? style.active
													: null
											}
											onClick={() =>
												setStateCode(subitem)
											}
										>
											{locations[state][subitem]}
										</a>
									</li>
								)
							)}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LocationSelector;