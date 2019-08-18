import React from "react";

const Filter = ({ searchTerm, handleSearchChange }) => {
	return (
		<div>
			Search:{" "}
			<input
				value={searchTerm}
				onChange={event => handleSearchChange(event)}
			/>
		</div>
	);
};

export default Filter;
