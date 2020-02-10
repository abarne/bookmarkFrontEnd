import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainCategory from './components/MainCategories';
import SubCategory from './components/SubCategories';
import PrivateRoute from './components/PrivateRoute';
import Links from './components/Links';

function App(props) {
	const logOutHandler = () => {
		console.log('log out clicked');
		console.log('props :', props);
		localStorage.setItem('token', ``);
		window.location.reload();
	};

	return (
		<Router>
			<div className="App">
				<div className="links">
					<h1>Bookmark Manager</h1>
					<h2 onClick={() => logOutHandler()}>Log Out</h2>
				</div>
				<Switch>
					<Route exact path="/" component={Login} />
					<PrivateRoute path="/mainCategories" component={MainCategory} />
					<PrivateRoute path="/subCategory/:id/:title" component={SubCategory} />
					<PrivateRoute path="/links/:id/:title" component={Links} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
