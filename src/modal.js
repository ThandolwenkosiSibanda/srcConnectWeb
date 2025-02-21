import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Added modal to the modal class and also display block in the css to show the 
 * modal without jquery 
 */

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div
			onClick={props.onDismiss}
			className='custom-Modal  modal fade show'
			aria-labelledby='Modal'
			aria-hidden='true'
		>
			<div className='modal-dialog' role='document'>
				<div onClick={(e) => e.stopPropagation()} className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='basicModalLabel'>
							{props.title}
						</h5>
						<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>{props.content}</div>
					<div className='modal-footer'>{props.actions}</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
