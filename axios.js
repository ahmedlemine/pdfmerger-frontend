import axios from 'axios';
import Cookies from 'js-cookie';

export const baseURL = 'http://localhost:8000/api/v1/';

const mergerAxios = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: Cookies.get('access_token')
			? 'Bearer ' + Cookies.get('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
		
	}, 
});

const fileUploaderAxios = axios.create({
	baseURL: baseURL,
	// method: 'post',
	timeout: 5000,
	headers: {
		Authorization: Cookies.get('access_token')
			? 'Bearer ' + Cookies.get('access_token')
			: null,
		'Content-Type': 'multipart/form-data',
		accept: 'application/json',
		// withCredentials: true
	}, 
});


export {
	mergerAxios,
	fileUploaderAxios
}
export default mergerAxios;
