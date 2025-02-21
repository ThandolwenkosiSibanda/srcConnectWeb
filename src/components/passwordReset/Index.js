import React from 'react';

import './index.css';
import { connect } from 'react-redux';


import {useParams} from 'react-router-dom';
import { resetPassword } from '../../actions/auth';


const PasswordResetPage = ({resetPassword, reset}) => {
	let { passwordResetCode } = useParams();

	console.log('reset', reset)

	const 	onSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		const formJson = Object.fromEntries(formData.entries());
		
		if(formJson.password){
			resetPassword(formJson.password, passwordResetCode)
		}
		
	};




	return (
		<>


<div className="row justify-content-md-center">

	
	

				<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
				{/* <h5 style={{textAlign: 'center'}}>Your password has been succesfully reset.</h5> */}
				{/* <h5 >Password Reset</h5> */}
					<form onSubmit={onSubmit}>
						<div className="login-screen">
							<div className="login-box">
							{ reset.status !== 'success' && <h5 style={{textAlign: 'center'}}>Please Enter New Password.</h5>}

							{ reset.status === 'success' && <h5 style={{textAlign: 'center'}}>Password successfully updated.</h5>}

								{ reset.status !== 'success' && <div className="form-group">
								<input name="password"  className = "form-control"  style={{borderRadius: '10px'}}/>
								</div>}



								<div className="">
									{ reset.status !== 'loading' && reset.status !== 'success'  && <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
										submit
									</button>}

									{ reset.status === 'loading' && <div  className="btn btn-primary" style={{width: '100%'}}>
										loading.....
									</div>}
								</div>

						
							</div>
						</div>
					</form>
				</div>
			</div>


			{/* <div className="" style={{display: 'flex', 
			justifyContent:'center', paddingTop: 50, height: '90vh',
			flexDirection: 'column', }}>

<div className="form-group">
<form method="post" onSubmit={onSubmit}>
      <label>
        Password: <input name="password"  className = "form-control" />
      </label>
 
      <button type="submit">Submit</button>
    </form>
	</div>






			</div> */}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		reset: state.reset
	};
};

export default connect(mapStateToProps, {resetPassword})(PasswordResetPage);
