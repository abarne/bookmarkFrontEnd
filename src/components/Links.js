import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewLinkForm from './NewLinkForm';
import EditLinkForm from './EditLinkForm';
import './Links.css';

class Links extends Component {
	state = {
		links: [],
		isEditing: false,
		editingId: 0,
		searchValue: '',
		sortValue: 'A-Z',
		newLink: {
			title: '',
			link: '',
			color: ''
		},
		currentEditingTitle: ''
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
				//this.fetchData();
				this.removeLink(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	removeLink = (id) => {
		let newLinks = this.state.links.filter((item) => item._id !== id);
		this.setState({ links: newLinks });
	};

	addLink = (newLink) => {
		this.setState({ links: [ ...this.state.links, newLink ] });
	};

	toggleEdit = () => {
		this.setState({ isEditing: false });
	};

	sortSelect = (event) => {
		this.setState({ sortValue: event.target.value });
	};

	sortList = () => {
		if (this.state.sortValue === 'A-Z') {
			let newLinks = this.state.links.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1));
			this.setState({ links: newLinks });
		} else if (this.state.sortValue === 'Z-A') {
			let newLinks = this.state.links
				.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1))
				.reverse();
			this.setState({ links: newLinks });
		} else {
			return;
		}
	};

	setSearch = (e) => {
		this.setState({ searchValue: e.target.value });
		console.log(this.state.searchValue);
	};

	render() {
		return (
			<div className="new__category__form">
				{!this.state.isEditing && (
					<NewLinkForm
						addLink={this.addLink}
						getData={this.fetchData}
						subId={this.props.match.params.id}
						subCat={this.props.match.params.title}
					/>
				)}
				{this.state.isEditing && (
					<EditLinkForm
						id={this.state.editingId}
						getData={this.fetchData}
						toggleEdit={this.toggleEdit}
						currentTitle={this.state.currentEditingTitle}
					/>
				)}
				<div className="sort__div__container">
					<div className="sort__div">
						<label className="sort__label" htmlFor="sortChoice">
							Sort by:
						</label>
						<select className="sort__select" id="sortChoice" onChange={this.sortSelect}>
							<option className="sort__option" value="A-Z">
								A-Z
							</option>
							<option className="sort__option" value="Z-A">
								Z-A
							</option>
						</select>
						<button className="sort__button" onClick={this.sortList}>
							Sort
						</button>
						<label className="sort__label__search" htmlFor="search">
							Search:{' '}
						</label>
						<input className="search__input" id="search" onChange={this.setSearch} />
					</div>
				</div>
				{!this.state.links.length ? (
					<h1 className="empty__list__header">You have no saved Links yet.</h1>
				) : (
					<div className="link__category__section">
						{this.state.links
							.filter((item) => item.title.toLowerCase().includes(this.state.searchValue))
							.map((item) => {
								var color = item.color;
								let link = item.link;
								if (!link.includes('http')) {
									link = 'http://' + link;
								}

								return (
									<div key={item._id} className="link__clip__path__border">
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
												className="edit__button"
												onClick={() => {
													this.setState({
														isEditing: !this.state.isEditing,
														editingId: item._id,
														currentEditingTitle: item.title
													});
												}}
											>
												Edit
											</button>
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
