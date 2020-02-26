import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import InputColor from 'react-input-color';

class NewCategoryForm extends Component {
	state = {
		title: '',
		color: '',
		r: 0,
		g: 0,
		b: 0,
		a: 100
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	createCategory = (e) => {
		e.preventDefault();
		if (this.state.title.trim() === '') {
			window.alert('A title is required!');
			this.setState({ title: '' });
			return;
		}
		let a = this.state.a / 100;
		const newCat = {
			title: this.state.title,
			color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
		};
		console.log('newCat :', newCat);
		this.addNewCat(newCat);
	};

	addNewCat = (newCat) => {
		axiosWithAuth()
			.post('/mainCat', newCat)
			.then((response) => {
				console.log('new main cat post request done', response);
				this.setState({ title: '' });
				//this.props.getData();
				this.props.addCat(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="head__container">
				<div className="form__container">
					<form className="form" onSubmit={this.createCategory}>
						<label htmlFor="title" className="form__label">
							Title:
						</label>
						<input
							id="title"
							className="form__input"
							type="text"
							name="title"
							value={this.state.title}
							onChange={this.handleChange}
						/>
						{/* <input type="text" name="color" value={this.state.color} onChange={this.handleChange} /> */}
						<div className="form__color__container">
							<label htmlFor="color-picker" className="form__label">
								Choose Color:
							</label>
							<InputColor
								id="color-picker"
								className="form__color"
								initialHexColor="#5e72e4"
								onChange={(e) => {
									this.setState({
										r: e.r,
										g: e.g,
										b: e.b,
										a: e.a
									});
								}}
								placement="right"
							/>
						</div>
						<button className="form__button">Add Category</button>
					</form>
				</div>
				<h1>Main Categories</h1>
			</div>
		);
	}
}

export default NewCategoryForm;
