import axios from '../apis/backend';

export const resetPassword = (password,passwordResetCode ) => async (dispatch) => {

	dispatch({ type: 'LOADING', payload: 'loading'});

	const response = await axios.post(`/api/users/updatepassword`, {password,passwordResetCode});

	console.log('updated password response', response)

	dispatch({ type: 'SUCCESS', payload: response.data });

};
