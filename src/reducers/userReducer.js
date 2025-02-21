



const UserReducer = (state ={}, action) => {

	switch (action.type) {
		case "UPDATE_USER":
			return {
				...state,
				verificationStatus : action.payload.verificationStatus,
				
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

export default UserReducer;
