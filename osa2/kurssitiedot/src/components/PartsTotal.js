import React from "react";

const PartsTotal = ({ parts }) => {
	const exercises = parts.map(part => part.exercises);
	const total = exercises.reduce((a, b) => a + b, 0);

	return (
		<p>
			<strong>Total of {total} exercises</strong>
		</p>
	);
};

export default PartsTotal;
