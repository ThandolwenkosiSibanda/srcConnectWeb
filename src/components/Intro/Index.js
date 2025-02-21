import React from 'react';
import './index.css';
import { connect } from 'react-redux';


const IntroPage = () => {

	return (
		<>
			<div className="" style={{display: 'flex', 
			justifyContent:'space-between', paddingTop: 50, height: '90vh',
			flexDirection: 'column', }}>



				<div style={{ display: 'flex', backgroundColor: '#017ec3', justifyContent: 'center', height: '100px', alignItems: 'center'}}>

					<div style={{ display: 'flex', justifyContent: 'center'}}>
					© 2023 Izaapa Money
					</div>
				</div>

			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, {})(IntroPage);
