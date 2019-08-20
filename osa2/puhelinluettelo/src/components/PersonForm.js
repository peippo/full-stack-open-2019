import React from "react";

const PersonForm = ({
	newName,
	newNumber,
	handleNameChange,
	handleNumberChange,
	handleAddClick
}) => {
	return (
		<form className="add">
			<div className="add__row">
				<span className="add__label">Name: </span>
				<input
					value={newName}
					onChange={event => handleNameChange(event)}
				/>
			</div>
			<div className="add__row">
				<span className="add__label">Number: </span>
				<input
					value={newNumber}
					onChange={event => handleNumberChange(event)}
				/>
			</div>
			<button
				className="add__submit"
				onClick={event => handleAddClick(event)}
				type="submit"
			>
				Add
			</button>
		</form>
	);
};

export default PersonForm;
