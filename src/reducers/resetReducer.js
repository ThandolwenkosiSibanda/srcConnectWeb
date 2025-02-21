



const ResetReducer = (state ={}, action) => {
	switch (action.type) {

		case "LOADING":
			return {
				...state,
				status : 'loading',
				
			};
		case "SUCCESS":
			return {
				...state,
				status : 'success',
				
			};
			case "FAILURE":
				return {
					...state,
					status : 'failure',
					
				};
		default:
			return state;
	}
};

export default ResetReducer;
