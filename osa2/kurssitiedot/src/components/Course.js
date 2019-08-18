import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => {
	const renderCourses = () => {
		return courses.map(course => (
			<div key={course.name}>
				<Header>{course.name}</Header>
				<Content parts={course.parts} />
			</div>
		));
	};

	return renderCourses();
};

export default Course;
