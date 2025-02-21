import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import UnAuthHeader from './header/unauthHeader';

import { loginAction} from '../actions/login';


const Index = (props) => {

	const userData = JSON.parse(localStorage.getItem('user'));


	useEffect(()=> {
     
        if(userData){
              props.loginAction(userData);
        }
   
        
       }, []);


	return (
		<div>
			<UnAuthHeader />
		</div>
	);
};

const mapStateToprops = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToprops, {loginAction})(Index);
