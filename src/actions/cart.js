import axios from '../apis/backend';

export const addToCartAction = (product, quantity, userType) => async (dispatch) => {


	dispatch({ type: 'ADD_TO_CART_LOADING', payload: 'loading'});


	const previousItems = await localStorage.getItem('proqit_market_cart');

	await localStorage.removeItem('proqit_market_cart');

	if(previousItems?.length > 0){
		
		const previousArr = JSON.parse(previousItems);
		if(previousArr?.length > 0){
			if(previousArr?.find((item)=> item?.productId === product._id)) {
	
				const newCart = previousArr?.map((item)=>{
						if(item?.productId === product._id){
							item.quantity = item.quantity + quantity;
						  return item;
						} else {
							return item
						}				
					 }
					)

					await localStorage.removeItem('proqit_market_cart');
					await localStorage.setItem('proqit_market_cart', JSON.stringify(newCart));

					dispatch({ type: 'ADD_TO_CART', payload: newCart});

					dispatch({ type: 'ADD_TO_CART_DONE', payload: 'done'});
				 }else {

					
					previousArr.push({productId: product._id, quantity: quantity});
				
					await localStorage.removeItem('proqit_market_cart');
					await localStorage.setItem('proqit_market_cart', JSON.stringify(previousArr));

					dispatch({ type: 'ADD_TO_CART', payload: previousArr});

					dispatch({ type: 'ADD_TO_CART_DONE', payload: 'done'});
				 }
		}

// Check if the item exists within the cart

	} else {
		const cart = [{productId: product._id, quantity: quantity}]
	    await localStorage.setItem('proqit_market_cart', JSON.stringify(cart));

		dispatch({ type: 'ADD_TO_CART', payload: cart});

		dispatch({ type: 'ADD_TO_CART_DONE', payload: 'done'});
	}




	// check if item already in cart



	
	// if already inside increment number

	// else add to item





	// localStorage.setItem('proqit_market_cart', JSON.stringify(user));


	// localStorage.setItem('user', JSON.stringify(user));
	// dispatch({ type: 'LOGIN', payload: user});
};


export const getCartAction = () => async (dispatch) => {

	const previousItems = await localStorage.getItem('proqit_market_cart');
	const cart = JSON.parse(previousItems);

	dispatch({ type: 'GET_CART', payload: cart});

};


export const deleteFromCartAction = (user) => async (dispatch) => {
	localStorage.setItem('user', JSON.stringify(user));
	dispatch({ type: 'LOGIN', payload: user});
};


export const logoutAction = (user) => async (dispatch) => {
	localStorage.removeItem('user');
	dispatch({ type: 'LOGIN', payload: {}});
};
