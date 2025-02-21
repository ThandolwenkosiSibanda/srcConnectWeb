



const CartReducer = (state ={}, action) => {

	console.log('action action', action);

	switch (action.type) {
		case "GET_CART":
			return {
				cart : action.payload,
			};
			case "ADD_TO_CART":
				return {
					cart : action.payload,
				};
			case "LOGIN":
				return {
					...state,
					isSignedIn : true,
					email : action.payload.email,
					token : action.payload.token,
					
				};
				case "LOGOUT":
					return {
						...state,
						isSignedIn : false,
						email : '',
						token : '',
						
					};
		default:
			return state;
	}
};

export default CartReducer;
