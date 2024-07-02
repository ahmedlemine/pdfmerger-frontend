import axios from 'axios';
import Cookies from 'js-cookie';

export const baseURL = 'http://localhost:8000/api/v1/';

const mergerAxios = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: 'Bearer ' + Cookies.get('access_token'),
		'Content-Type': 'application/json',
		accept: 'application/json',
		// 'Cache-Control': 'no-cache',
		// 'Pragma': 'no-cache'
		
	},
	withCredentials: true
});


export default mergerAxios;
