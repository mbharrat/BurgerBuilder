import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://mikeburger-c1225.firebaseio.com/'
});

export default instance;