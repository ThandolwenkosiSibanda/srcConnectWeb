import axios from 'axios';

export default axios.create({
	baseURL         : '',
	// baseURL         : 'http://localhost:4000',
	withCredentials : true,
	crossDomain     : true,
	headers         : {
		Accept         : 'application/json',
		'Content-Type' : 'application/json'
	},
	timeout         : 10000
});
