import React from 'react';

export const NavBar = (props) => {
	console.log('props.history :', props.history);

	const logOutHandler = () => {
		console.log('log out clicked');
		console.log('props :', props);
		localStorage.setItem('token', ``);
		window.location.reload();
	};

	return (
		<div className="links">
			<h1>Bookmark Manager</h1>
			{props.history.location.pathname.includes('sub') ? (
				<h2 onClick={() => props.history.goBack()}>Go back to main categories</h2>
			) : null}
			{props.history.location.pathname.includes('links') ? (
				<h2 onClick={() => props.history.goBack()}>Go back to sub categories</h2>
			) : null}
			<h2 onClick={() => logOutHandler()}>Log Out</h2>
		</div>
	);
};
