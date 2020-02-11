import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewLinkForm from './NewLinkForm';
import { Link } from 'react-router-dom';
import './Links.css';

class Links extends Component {
	state = {
		links: [],
		newLink: {
			title: '',
			link: '',
			color: ''
		}
	};

	componentDidMount() {
		let subId = this.props.match.params.id;
		axiosWithAuth()
			.get(`/links/${subId}`)
			.then((response) => {
				this.setState({
					links: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	fetchData = () => {
		let subId = this.props.match.params.id;
		axiosWithAuth()
			.get(`/links/${subId}`)
			.then((response) => {
				console.log(response);
				this.setState({
					links: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteLink = (id) => {
		axiosWithAuth()
			.delete(`/links/${id}`)
			.then((response) => {
				console.log('delete response :', response);
				this.fetchData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="new__category__form">
				<NewLinkForm
					getData={this.fetchData}
					subId={this.props.match.params.id}
					subCat={this.props.match.params.title}
				/>
				{!this.state.links.length ? (
					<h1 className="empty__list__header">You have no saved Links yet.</h1>
				) : (
					<div className="link__category__section">
						{this.state.links.map((item) => {
							var color = item.color;
							let link = item.link;
							if (!link.includes('http')) {
								link = 'http://' + link;
							}
							console.log(link);

							return (
								<div className="link__clip__path__border">
									<div
										className="link__category__container"
										style={{ backgroundColor: color }}
										key={item._id}
									>
										<a
											rel="noreferrer"
											// rel={'external'}
											className="fab fa-instagram link__category__link"
											target="_blank"
											href={`${link}`}
										>
											<h1 className="link__category__title">{item.title}</h1>
										</a>
										{/* <button onClick={() => this.deleteLink(item._id)}>Delete</button> */}
										<button
											className="link__delete__button"
											onClick={() => {
												if (window.confirm('Are you sure you want to delete this item?'))
													this.deleteLink(item._id);
											}}
										>
											Delete
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}

export default Links;
