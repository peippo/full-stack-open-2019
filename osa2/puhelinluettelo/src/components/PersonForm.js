import React from "react";

const PersonForm = ({
	newName,
	newNumber,
	handleNameChange,
	handleNumberChange,
	handleClick
}) => {
	return (
		<form>
			<div>
				Name:{" "}
				<input
					value={newName}
					onChange={event => handleNameChange(event)}
				/>
			</div>
			<div>
				Number:{" "}
				<input
					value={newNumber}
					onChange={event => handleNumberChange(event)}
				/>
			</div>
			<div>
				<button onClick={event => handleClick(event)} type="submit">
					Add
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
