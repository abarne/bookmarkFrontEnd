import axios from 'axios';

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'https://bookmarkproject.herokuapp.com/',
		headers: {
			Authorization: token
		}
	});
};
