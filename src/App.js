import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainCategory from './components/MainCategories';
import SubCategory from './components/SubCategories';
import PrivateRoute from './components/PrivateRoute';
import Links from './components/Links';

function App() {
	return (
		<Router>
			<div className="App">
				<div className="links">
					<h1>Bookmark Manager</h1>
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
