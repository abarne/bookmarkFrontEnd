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
				this.fetchData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	toggleEdit = () => {
		this.setState({ isEditing: false });
	};

	render() {
		return (
			<div>
				{this.state.mainCats.length === 0 ? (
					<div>
						<NewCategoryForm getData={this.fetchData} />
						<h1 className="empty__list__header">You have no Main Categories yet.</h1>
					</div>
				) : (
					<div className="new__category__form">
						{!this.state.isEditing && <NewCategoryForm getData={this.fetchData} />}
						{this.state.isEditing && (
							<EditCategoryForm
								id={this.state.editingId}
								getData={this.fetchData}
								toggleEdit={this.toggleEdit}
							/>
						)}
						<div className="category__section">
							{this.state.mainCats.map((item) => {
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
