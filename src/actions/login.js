

export const loginAction = (user) => async (dispatch) => {
	localStorage.setItem('user', JSON.stringify(user));
	dispatch({ type: 'LOGIN', payload: user});
};


export const logoutAction = (user) => async (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: 'LOGIN', payload: {}});
};
