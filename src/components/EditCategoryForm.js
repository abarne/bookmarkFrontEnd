import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import InputColor from 'react-input-color';

class EditCategoryForm extends Component {
	state = {
		title: '',
		changeColor: false,
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

	updateCategory = (e) => {
		e.preventDefault();
		let a = this.state.a / 100;
		let newCat = {};
		console.log('update form state, ', this.state);
		if (this.state.title.trim() === '' && !this.state.changeColor) {
			this.props.toggleEdit();
			return;
		} else if (this.state.title.trim() === '') {
			newCat = {
				color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
			};
		} else if (!this.state.changeColor) {
			newCat = {
				title: this.state.title
			};
		} else {
			newCat = {
				title: this.state.title,
				color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
			};
		}
		console.log('update Category :', newCat);
		this.updateCat(newCat);
	};

	updateCat = (newCat) => {
		console.log(this.props.id);
		axiosWithAuth()
			.patch(`/mainCat/${this.props.id}`, newCat)
			.then((response) => {
				console.log('new main cat post request done');
				this.props.getData();
				this.props.toggleEdit();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="head__container">
				<div className="form__container">
					<form className="form" onSubmit={this.updateCategory}>
						<label htmlFor="title" className="form__label">
							New Title:
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
								Choose New Color:
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
							<div>
								<div className="control-group">
									<label className="control control-checkbox" htmlFor="chooseColor">
										Apply new color?
										<input
											type="checkbox"
											id="chooseColor"
											name="chooseColor"
											onChange={() => this.setState({ changeColor: !this.state.changeColor })}
										/>
										<div className="control_indicator" />
									</label>
								</div>
							</div>
						</div>
						<button className="form__button">Edit Category</button>
					</form>
				</div>
				<h1>Main Categories</h1>
			</div>
		);
	}
}

export default EditCategoryForm;
