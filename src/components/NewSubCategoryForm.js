import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import InputColor from 'react-input-color';

class NewSubCategoryForm extends Component {
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
		let a = this.state.a / 100;
		const newCat = {
			title: this.state.title,
			color: `rgb(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
		};
		this.addNewCat(newCat);
	};

	addNewCat = (newCat) => {
		console.log('this.mainId :', this.props.mainId);
		axiosWithAuth()
			.post(`/subCat/${this.props.mainId}`, newCat)
			.then((response) => {
				console.log('new main cat post request done');
				this.props.getData();
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
						<label className="form__label">Title:</label>
						<input
							className="form__input"
							type="text"
							name="title"
							value={this.state.title}
							onChange={this.handleChange}
						/>
						{/* <input type="text" name="color" value={this.state.color} onChange={this.handleChange} /> */}
						<div className="form__color__container">
							<label className="form__label">Choose Color:</label>
							<InputColor
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
				<h1>Sub Categories of {this.props.mainCat}</h1>
			</div>
		);
	}
}

export default NewSubCategoryForm;
