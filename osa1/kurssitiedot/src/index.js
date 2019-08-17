import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Part = ({ part, exercises }) => {
	return (
		<p>
			{part} {exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return parts.map(part => (
		<Part key={part.name} part={part.name} exercises={part.exercises} />
	));
};

const Total = ({ parts }) => {
	const exercises = parts.map(part => part.exercises);
	const total = exercises.reduce((a, b) => a + b, 0);
	return <p>Number of parts {total}</p>;
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10
			},
			{
				name: "Using props to pass data",
				exercises: 7
			},
			{
				name: "State of a component",
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
