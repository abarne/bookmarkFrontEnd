import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import InputColor from 'react-input-color';

class NewLinkForm extends Component {
	state = {
		title: '',
		link: '',
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
		const newLink = {
			title: this.state.title,
			link: this.state.link,
			color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
		};
		console.log('newLink :', newLink);
		this.addNewLink(newLink);
	};

	addNewLink = (newLink) => {
		axiosWithAuth()
			.post(`/links/${this.props.subId}`, newLink)
			.then((response) => {
				console.log('add new link complete');
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
						<label htmlFor="link" className="form__label">
							Link:
						</label>
						<input
							id="link"
							className="form__input"
							type="text"
							name="link"
							value={this.state.link}
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
						<button className="form__button">Add Link</button>
					</form>
				</div>
				<h1>Links for {this.props.subCat}</h1>
			</div>
		);
	}
}

export default NewLinkForm;
