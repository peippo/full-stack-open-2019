import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
	return (
		<div className="filter">
			Search:{" "}
			<input
				value={searchTerm}
				onChange={event => handleSearchChange(event)}
			/>
		</div>
	);
};

export default Filter;
