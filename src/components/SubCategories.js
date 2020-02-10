import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import NewSubCategoryForm from './NewSubCategoryForm';
import './MainCategory.css';

class SubCategories extends Component {
	state = {
		subCats: [],
		isCreating: false,
		newSubCategory: {
			title: '',
			color: ''
		}
	};

	componentDidMount() {
		console.log('this.props.mtach.params :', this.props.match.params);
		let mainId = this.props.match.params.id;
		axiosWithAuth()
			.get(`/subCat/${mainId}`)
			.then((response) => {
				console.log(response);
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
				console.log(response);
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
				console.log('delete response, ', response);
				this.fetchData();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="new__category__form">
				<NewSubCategoryForm
					getData={this.fetchData}
					mainId={this.props.match.params.id}
					mainCat={this.props.match.params.title}
				/>
				{!this.state.subCats.length ? (
					<h1 className="empty__list__header">You have no Sub Categories yet.</h1>
				) : (
					<div className="category__section">
						{this.state.subCats.map((item) => {
							var color = item.color;
							return (
								<div className="clip__path__parent">
									<div className="clip__path__border">
										<div
											className="category__container"
											style={{ backgroundColor: color }}
											key={item._id}
										>
											<Link className="category__link" to={`/links/${item._id}/${item.title}`}>
												<h1 className="category__title">{item.title}</h1>
											</Link>
											{/* <button onClick={() => this.deleteCat(item._id)}>Delete</button> */}
											<button
												className="delete__button"
												onClick={() => {
													if (window.confirm('Are you sure you want to delete this item?'))
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
