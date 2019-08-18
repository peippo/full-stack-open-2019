import React from "react";
import Part from "./Part";
import PartsTotal from "./PartsTotal";

const Content = ({ parts }) => {
	const renderParts = () => {
		return parts.map(part => (
			<Part key={part.id} name={part.name} excersises={part.exercises} />
		));
	};

	return (
		<>
			{renderParts()}
			<PartsTotal parts={parts} />
		</>
	);
};

export default Content;
