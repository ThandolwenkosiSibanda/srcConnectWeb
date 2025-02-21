import axios from '../apis/backend';

export const verifyUser = (verificationCode) => async (dispatch) => {

	const response = await axios.post(`/api/users/verify`, {verificationCode});

	console.log('response', response)
	dispatch({ type: 'UPDATE_USER', payload: response.data });
};
