import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewSubCategoryForm from './NewSubCategoryForm';
import EditSubCategoryForm from './EditSubCategoryForm';
import './MainCategory.css';

class SubCategories extends Component {
	state = {
		subCats: [],
		isCreating: false,
		isEditing: false,
		searchValue: '',
		sortValue: 'A-Z',
		editingId: 0,
		newSubCategory: {
			title: '',
			color: ''
		},
		currentEditingTitle: ''
	};

	componentDidMount() {
		let mainId = this.props.match.params.id;
		axiosWithAuth()
			.get(`/subCat/${mainId}`)
			.then((response) => {
				this.setState({
					subCats: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	fetchData = () => {
		let mainId = this.props.match.params.id;
		axiosWithAuth()
			.get(`/subCat/${mainId}`)
			.then((response) => {
				this.setState({
					subCats: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteCat = (id) => {
		axiosWithAuth()
			.delete(`/subCat/${id}`)
			.then((response) => {
				this.removeCat(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	removeCat = (id) => {
		let newSubCats = this.state.subCats.filter((item) => item._id !== id);
		this.setState({ subCats: newSubCats });
	};

	addCat = (newCat) => {
		this.setState({ subCats: [ ...this.state.subCats, newCat ] });
	};

	toggleEdit = () => {
		this.setState({ isEditing: false });
	};

	sortSelect = (event) => {
		this.setState({ sortValue: event.target.value });
	};

	sortList = () => {
		if (this.state.sortValue === 'A-Z') {
			let newSubCats = this.state.subCats.sort(
				(a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
			);
			this.setState({ subCats: newSubCats });
		} else if (this.state.sortValue === 'Z-A') {
			let newSubCats = this.state.subCats
				.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1))
				.reverse();
			this.setState({ subCats: newSubCats });
		} else {
			return;
		}
	};

	setSearch = (e) => {
		this.setState({ searchValue: e.target.value });
	};

	render() {
		return (
			<div className="new__category__form">
				{!this.state.isEditing && (
					<NewSubCategoryForm
						addCat={this.addCat}
						getData={this.fetchData}
						mainId={this.props.match.params.id}
						mainCat={this.props.match.params.title}
					/>
				)}
				{this.state.isEditing && (
					<EditSubCategoryForm
						id={this.state.editingId}
						getData={this.fetchData}
						toggleEdit={this.toggleEdit}
						editingTitle={this.state.currentEditingTitle}
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
				{!this.state.subCats.length ? (
					<h1 className="empty__list__header">You have no Sub Categories yet.</h1>
				) : (
					<div className="category__section">
						{this.state.subCats
							.filter((item) => item.title.toLowerCase().includes(this.state.searchValue))
							.map((item) => {
								var color = item.color;
								return (
									<div className="clip__path__parent">
										<div className="clip__path__border">
											<div
												className="category__container"
												style={{ backgroundColor: color }}
												key={item._id}
											>
												<Link
													className="category__link"
													to={`/links/${item._id}/${item.title}`}
												>
													<h1 className="category__title">{item.title}</h1>
												</Link>
												{/* <button onClick={() => this.deleteCat(item._id)}>Delete</button> */}
												<button
													className="edit__button"
													onClick={() =>
														this.setState({
															isEditing: !this.state.isEditing,
															editingId: item._id,
															currentEditingTitle: item.title
														})}
												>
													{this.state.isEditing ? 'Close' : 'Edit'}
												</button>
												<button
													className="delete__button"
													onClick={() => {
														if (
															window.confirm('Are you sure you want to delete this item?')
														)
															this.deleteCat(item._id);
													}}
												>
													Delete
												</button>
											</div>
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

export default SubCategories;
