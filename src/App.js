import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainCategory from './components/MainCategories';
import SubCategory from './components/SubCategories';
import PrivateRoute from './components/PrivateRoute';
import Links from './components/Links';
import { NavBar } from './components/NavBar';
import './components/checkbox.css';
import './search.css';

function App(props) {
	return (
		<Router>
			<div className="App">
				<Route path="/" render={(props) => <NavBar {...props} />} />
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
