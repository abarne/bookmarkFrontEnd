import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import InputColor from 'react-input-color';

class EditLinkForm extends Component {
	state = {
		title: '',
		link: '',
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

	updateLink = (e) => {
		e.preventDefault();
		let a = this.state.a / 100;
		let newLink = {};
		if (this.state.title.trim() === '' && this.state.link.trim() === '' && !this.state.changeColor) {
			window.alert('You must choose a field to change');
			this.props.toggleEdit();
			return;
		}
		if (this.state.title.trim() !== '') {
			const newNewLink = {
				...newLink,
				title: this.state.title
			};
			newLink = newNewLink;
		}
		if (this.state.link.trim() !== '') {
			const newNewLink = {
				...newLink,
				link: this.state.link
			};
			newLink = newNewLink;
		}
		if (this.state.changeColor) {
			const newNewLink = {
				...newLink,
				color: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${a})`
			};
			newLink = newNewLink;
		}

		this.addUpdatedLink(newLink);
	};

	addUpdatedLink = (newLink) => {
		axiosWithAuth()
			.patch(`/links/${this.props.id}`, newLink)
			.then((response) => {
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
					<form className="form" onSubmit={this.updateLink}>
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
						<label htmlFor="link" className="form__label">
							New Link:
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
						<button className="form__button">Edit Link</button>
					</form>
				</div>
				<h1>Main Categories</h1>
			</div>
		);
	}
}

export default EditLinkForm;
