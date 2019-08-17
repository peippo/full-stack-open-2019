import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
	return (
		<p>
			{part} {exercises}
		</p>
	);
};

const Content = ({ parts, exercises }) => {
	const contentParts = [];
	for (const [index, part] of parts.entries()) {
		contentParts.push(
			<Part key={part} part={part} exercises={exercises[index]} />
		);
	}
	return contentParts;
};

const Total = ({ exercises }) => {
	const total = exercises.reduce((a, b) => a + b, 0);
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	return (
		<div>
			<Header course={course} />
			<Content
				parts={[part1, part2, part3]}
				exercises={[exercises1, exercises2, exercises3]}
			/>
			<Total exercises={[exercises1, exercises2, exercises3]} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
