



const CartLoadingReducer = (state ={}, action) => {
	switch (action.type) {
		case "ADD_TO_CART_LOADING":
			return {
				cartLoading : action.payload,
				
			};
			case "ADD_TO_CART_DONE":
				return {
					cartLoading : action.payload,
					
				};
		default:
			return state;
	}
};

export default CartLoadingReducer;
