import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './login.css';

class Login extends React.Component {
	state = {
		isLogin: true,
		credentials: {
			email: 'Email...',
			password: 'Password...'
		}
	};

	handleChange = (e) => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	switchModeHandler = () => {
		this.setState((prevState) => {
			return { isLogin: !prevState.isLogin };
		});
	};

	submitHandler = (e) => {
		e.preventDefault();
		if (this.state.isLogin) {
			axiosWithAuth()
				.post('/user/login', this.state.credentials)
				.then((res) => {
					console.log('login data, ', res.data);
					localStorage.setItem('token', `Bearer ${res.data.token}`);
					this.props.history.push('/mainCategories');
				})
				.catch((err) => console.log('Login error, ', err.response));
		} else {
			axiosWithAuth()
				.post('/user/signup', this.state.credentials)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log('Sign up error,', err.response));
		}
	};

	render() {
		return (
			<div className="login__form__container">
				<form className="auth-form" onSubmit={this.submitHandler}>
					<div className="form-control">
						<h1>{this.state.isLogin ? 'Login' : 'Signup'}</h1>
						<label htmlFor="email">E-mail:</label>
						<input type="email" id="email" name="email" onChange={this.handleChange} />
					</div>
					<div className="form-control">
						<label htmlFor="password">Password:</label>
						<input type="password" id="password" name="password" onChange={this.handleChange} />
					</div>
					<div className="form-actions">
						<button type="submit">Submit</button>
						<button type="button" onClick={this.switchModeHandler}>
							Switch to {this.state.isLogin ? 'Signup' : 'Login'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
