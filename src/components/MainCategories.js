import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewCategoryForm from './NewCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import { Link } from 'react-router-dom';
import './MainCategory.css';

class MainCategories extends Component {
	state = {
		mainCats: [],
		isCreating: false,
		isEditing: false,
		searchValue: '',
		sortValue: 'A-Z',
		editingId: 0,
		newCategory: {
			title: '',
			color: ''
		}
	};

	componentDidMount() {
		axiosWithAuth()
			.get('/mainCat')
			.then((response) => {
				console.log(response);
				this.setState({
					mainCats: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	fetchData = () => {
		console.log('in fetch data');
		axiosWithAuth()
			.get('/mainCat')
			.then((response) => {
				this.setState({
					mainCats: response.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteCat = (id) => {
		axiosWithAuth()
			.delete(`/mainCat/${id}`)
			.then((response) => {
				console.log('delete respone, ', response);
				//this.fetchData();
				this.removeCat(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	removeCat = (id) => {
		let newMain = this.state.mainCats.filter((item) => item._id !== id);
		this.setState({ mainCats: newMain });
	};

	addCat = (newCat) => {
		this.setState({ mainCats: [ ...this.state.mainCats, newCat ] });
	};

	toggleEdit = () => {
		this.setState({ isEditing: false });
	};

	sortSelect = (event) => {
		this.setState({ sortValue: event.target.value });
	};

	sortList = () => {
		if (this.state.sortValue === 'A-Z') {
			let newMainCats = this.state.mainCats.sort(
				(a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
			);
			this.setState({ mainCats: newMainCats });
		} else if (this.state.sortValue === 'Z-A') {
			let newMainCats = this.state.mainCats
				.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1))
				.reverse();
			this.setState({ mainCats: newMainCats });
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
			<div>
				{this.state.mainCats.length === 0 ? (
					<div>
						<NewCategoryForm getData={this.fetchData} addCat={this.addCat} />
						<h1 className="empty__list__header">You have no Main Categories yet.</h1>
					</div>
				) : (
					<div className="new__category__form">
						{!this.state.isEditing && <NewCategoryForm getData={this.fetchData} addCat={this.addCat} />}
						{this.state.isEditing && (
							<EditCategoryForm
								id={this.state.editingId}
								getData={this.fetchData}
								toggleEdit={this.toggleEdit}
							/>
						)}
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
							<label className="sort__label" htmlFor="search">
								Search:{' '}
							</label>
							<input className="search__input" id="search" onChange={this.setSearch} />
						</div>
						<div className="category__section">
							{this.state.mainCats
								.filter((item) => item.title.toLowerCase().includes(this.state.searchValue))
								.map((item) => {
									var color = item.color;
									console.log('color :', color);
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
														to={`/subCategory/${item._id}/${item.title}`}
													>
														<h1 className="category__title">{item.title}</h1>
													</Link>
													{/* <button onClick={() => this.deleteCat(item._id)}>Delete</button> */}
													<button
														className="edit__button"
														onClick={() =>
															this.setState({
																isEditing: !this.state.isEditing,
																editingId: item._id
															})}
													>
														Edit
													</button>
													<button
														className="delete__button"
														onClick={() => {
															if (
																window.confirm(
																	'Are you sure you want to delete this item? You will also lose all sub categories and links associated with it!'
																)
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
					</div>
				)}
			</div>
		);
	}
}

export default MainCategories;
