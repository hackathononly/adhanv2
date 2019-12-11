import React from "react";

const Checkbox = ({ id, isSet, isChecked }) => {
	return (
		<input
			id={id}
			type="checkbox"
			onChange={isSet}
			defaultChecked={isChecked}
		/>
	);
};

export default Checkbox;
