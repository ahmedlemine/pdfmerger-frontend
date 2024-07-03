import axios from 'axios';
import Cookies from 'js-cookie';

export const HOST_URL = import.meta.env.VITE_HOST_URL
const API_URL = import.meta.env.VITE_API_URL

export const baseURL = HOST_URL + API_URL


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
