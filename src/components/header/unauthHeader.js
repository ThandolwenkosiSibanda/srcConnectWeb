import React from 'react';
import history from '../../history';
import AppRouter from '../../routers/appRouter';

import './unauthHeader.css';

import { Router } from 'react-router';

import NewUserNav from '../../components/navigation/newUserNav';
import FooterPage from '../footer/FooterPage';



class UnAuthHeader extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<NewUserNav />
					<AppRouter />
					<FooterPage/>
				</Router>
			</React.Fragment>
		);
	}
}

export default UnAuthHeader;
