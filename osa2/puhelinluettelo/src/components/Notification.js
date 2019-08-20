import React from "react";

const Notification = ({ notification }) => {
	if (notification.message === null) {
		return null;
	}

	const classes = notification.isError
		? "notification notification--error"
		: "notification";

	return <div className={classes}>{notification.message}</div>;
};

export default Notification;
