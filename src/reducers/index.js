import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import ResetReducer from './resetReducer';
import CartReducer from './cartReducer';
import CartLoadingReducer from './cartLoadingReducer';


//Combine Reducers
//1. We 'Combine' our reducers here so that we can export them to the other files from one central location.
//2. Instead of exporting our reducers one by one we just call the index file.

const rootReducer = combineReducers({
	user : UserReducer,
	reset: ResetReducer,
	cart: CartReducer,
	cartLoading: CartLoadingReducer
});

export default rootReducer;
