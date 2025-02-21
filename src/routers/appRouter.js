import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// import ShopsPage from '../components/shops/ShopsPage';
// import ShopPage from '../components/shops/ShopPage';
// import BannersPage from '../components/banners/BannersPage';
// import BannerPage from '../components/banners/BannerPage';
import LoginPage from '../components/login/LoginPage';

import HomePage from '../components/home/HomePage';
// import ProductViewPage from '../components/product/ProductViewPage';
// import SignupPage from '../components/login/SignupPage';





class AppRouter extends Component {
	NotFoundPage = () => <h2>Page Not Found</h2>;



	renderComponentDetails = () => {
		return (
			<Switch>
				{/* <Route path="/" component={HomePage} exact={true} /> */}
				{/* <Route path="/login" component={LoginPage} exact={true} /> */}
                {/* <Route path="/products/:id" component={ProductViewPage} exact={true} />
				<Route path="/login" component={LoginPage} exact={true} />
				<Route path="/signup" component={SignupPage} exact={true} />
				<Route path="/shops" component={ShopsPage} exact={true} />
				<Route path="/shops/:id" component={ShopPage} exact={true} />
				<Route path="/banners" component={BannersPage} exact={true} />
				<Route path="/banners/:id" component={BannerPage} exact={true} /> */}
				
	            <Route component={this.NotFoundPage} />
			</Switch>
		);
	};


	renderLogin = () => {
		return (
			<Switch>
				<Route path="/" component={LoginPage} exact={true} />
				<Route path="/login" component={LoginPage} exact={true} />
	            <Route component={LoginPage} />
			</Switch>
		);
	};

	render() {

	
		const { isSignedIn} = this.props.user;


	       return isSignedIn ? this.renderComponentDetails() : this.renderLogin();
		
		
	}
}

const mapStateToprops = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToprops)(AppRouter);
