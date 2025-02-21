import React, {useState, useEffect} from 'react';
import './index.css';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';

import axios from 'axios';
import DatePicker from "react-datepicker";



import "react-datepicker/dist/react-datepicker.css";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_PROMOTION_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_CASH_ADVANCE_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PERSONAL_LOAN_MUTATION } from '../../gql/Mutation';
import {  ADMIN_LOANS_QUERY, CASH_ADVANCES_QUERY, CASH_ADVANCE_QUERY, GET_MONEY_MEMBERSHIP_BY_ID, LOANS_QUERY, PAYMENTS_QUERY, PERSONAL_LOANS_QUERY, PERSONAL_LOAN_QUERY } from '../../gql/Query';
import moment from 'moment';


const CashAdvancePage = () => {

  const {id} = useParams();
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

	const [showApprove, setShowApprove] = useState(false);
	const [showBlacklist, setShowBlacklist] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const handleDeleteClick = (member) => {
        setActive(member);
        setShowDelete(true)
    };

    const handleHistoryClick = (member) => {

      console.log('member history', member)

      // setActive(member);
      setShowHistory(true);
      getMoneyMember({ variables: { user: member} })
  };

	const handleApproveClick = (member) => {
        setActive(member);
        setShowApprove(true)
    };

	const handleBlacklistClick = (member) => {
        setActive(member);
        setShowBlacklist(true)
    };

    const handleDelete = (promotion) => {
        deleteMoneyMember();
        setShowDelete(false);
    };


	const handleApprove = (promotion) => {
		approvePersonalLoan();
        setShowApprove(false);
    };

	const handleBlacklist = (promotion) => {
        rejectPersonalLoan();
        setShowBlacklist(false);
    };

    const handleCancelDelete = (promotion) => {
        setActive({});
        setShowDelete(false)
    };

	const handleCancelApprove = (promotion) => {
        setActive({});
        setShowApprove(false)
    };

	const handleCancelBlacklist = (promotion) => {
        setActive({});
        setShowBlacklist(false)
    };


    const handleChange = (e) => {
       setForm({...form, [e.target.name]: e.target.value})
      };


    const handleImageChange = (e) => {
        if (e.target.files) {
          setImages(e.target.files);
        }
      };


      const {data, loading, error} = useQuery(CASH_ADVANCE_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
        variables: {
          _id: id
        },
      });

      useEffect(()=> {
      
        if(data?.cashAdvance?.user?._id ){

          console.log('fire', data.cashAdvance.user._id )

          getPersonalLoans({ variables: { user: data.cashAdvance.user._id} })
          getPersonalLoansPayments({ variables: { user: data.cashAdvance.user._id} })
        }
        
       }, [loading]);

      

      console.log('Error', JSON.stringify(error, null, 2));



      const [getPersonalLoans, { loading: personalLoansLoading,error: personalLoansError, data: personalLoansData }] = useLazyQuery(CASH_ADVANCES_QUERY);
      const [getPersonalLoansPayments, { loading: personalLoansPaymentsLoading, error: personalLoansPaymentsError, data: personalLoansPaymentsData }] = useLazyQuery(PAYMENTS_QUERY);


      const [getMoneyMember, { loading: memberLoading, error: memberError, data: memberData }] = useLazyQuery(GET_MONEY_MEMBERSHIP_BY_ID);


      console.log('  personalLoansPaymentsData ',   personalLoansPaymentsData );
      console.log('personalLoansLoading', personalLoansLoading);

      console.log('personalLoansPaymentsError', JSON.stringify(personalLoansPaymentsError, null, 2));



      const sumPersonalLoans = personalLoansData?.cashAdvances?.filter((loan)=> (loan.status === 'Approved')).reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);

      const sumPersonalPayments = personalLoansPaymentsData?.payments?.filter((payment)=> (payment.type === 'Cash Advance')).reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);

      console.log('sumPersonalLoans', sumPersonalLoans);
      console.log('sumPersonalPayments', sumPersonalPayments);

    const [submit, {data: createData, error: createError}] = useMutation(CREATE_PROMOTION_MUTATION, {
        variables: {
          shop: form.shop,
          type: form.type,
          title: form.title,
          price: parseFloat(form.price),
          promoPrice: parseFloat(form.promoPrice),
          expiryDate: expiryDate,
          images: imagesUrls
        },
      });

      console.log('createData', createData);
    //   console.log('createError', createError);

      console.log('createError', JSON.stringify(createError, null, 2));


      const [deleteMoneyMember, {data: deleteData, error: deleteError}] = useMutation(DELETE_MONEY_MEMBER_MUTATION, {
        variables: {
          _id: active._id
        },
      });


	  const [approvePersonalLoan, {data: approveData, error: approveError}] = useMutation(UPDATE_CASH_ADVANCE_MUTATION, {
        variables: {
          _id: active._id,
		  status: 'Approved',
		  email: 'sibandathandolwenkosi2@gmail.com'
        },
      });

	  console.log('approveError', JSON.stringify(approveError, null, 2));

	  const [rejectPersonalLoan, {data: rejectData, error: rejectError}] = useMutation(UPDATE_CASH_ADVANCE_MUTATION, {
        variables: {
			_id: active._id,
			status: 'Rejected',
			email: 'sibandathandolwenkosi2@gmail.com'
        },
      });

      console.log('deleteData', deleteData);

      console.log('deleteError', JSON.stringify(deleteError, null, 2));
      

     const  handleSubmit = () => {
        // Push all the axios request promise into a single array

        let urls = [];
        const uploaders = [...images].map(file => {

            const url = 'https://api.cloudinary.com/v1_1/molowehou/upload';
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append('upload_preset', 'y1t423pb');
          
    
          return axios.post(url, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url;
            urls.push(fileURL)

          })
        });
      
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
        
          setImagesUrls(urls)
      
          submit()

        });
      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>

<h5>Cash Advance History</h5>


<Modal size= 'lg' show={showHistory} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
         Member History
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.name} {active.surname}
            </div>
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          Are you sure you want to delete this money member
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.name} {active.surname}
            </div>
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

	  <Modal show={showApprove} onHide={handleCancelApprove}>
        <Modal.Header closeButton>
          Are you sure you want to Approve this cash advance
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                of {active.amount} 
            </div>
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelApprove}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

	  <Modal show={showBlacklist} onHide={handleCancelBlacklist}>
        <Modal.Header closeButton>
          Are you sure you want to Reject this cash advance
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.amount}
            </div>
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelBlacklist}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleBlacklist}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>

<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>

      <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: '5px'}}>

<div style={{width: '600px'}}>
<h6>Cash Advance Requested</h6>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th></th>
          <th></th>


        </tr>
      </thead>
      <tbody>
<tr  >

          <td> {moment(parseInt(data?.cashAdvance.createdAt)).format('DD-MMM-YYYY')}</td>
          <td>{data?.cashAdvance.amount}</td>
      <td>{data?.cashAdvance.status}</td>

      <td>
 
			<button className='btn btn-danger' onClick={()=> handleBlacklistClick(data?.cashAdvance)} >Reject</button>
		
      </td>
      <td>

 
			<button className='btn btn-primary' onClick={()=> handleApproveClick(data?.cashAdvance)} >Approve</button>
		

      </td>
          
        </tr>




      </tbody>
    </Table>
    </div>

      </div>


      <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: '5px'}}>

<div style={{width: '600px'}}>
<h6>Summary</h6>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Total Approved</th>
          <th>Total Payments</th>
		      <th>Owing</th>

        </tr>
      </thead>
      <tbody>
<tr  >

          <td>{sumPersonalLoans}</td>
          <td>{sumPersonalPayments}</td>
		  <td>{sumPersonalLoans - sumPersonalPayments}</td>
          
        </tr>




      </tbody>
    </Table>
    </div>

      </div>

      </div>

<div style={{display:'flex', flexDirection: 'row', gap: '10px', width: '100%',}}>



  <div style={{ flex: 1}}>

    <h6>Cash Advances</h6>
  <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>

        </tr>
      </thead>
      <tbody>
{personalLoansData?.cashAdvances?.map((member, index)=><tr key ={index}>
          <td>
          {moment(parseInt(member?.createdAt)).format('DD MMM YYYY')}
      </td>
          <td>{member.amount}</td>
		  <td>{member.status}</td>
          
        </tr>)}




      </tbody>
    </Table>
  </div>

  <div div style={{ flex: 1}}>

<h6>Payments</h6>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Date</th>
      <th>Amount</th>
      <th>Ref</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
{personalLoansPaymentsData?.payments?.filter((payment)=> (payment.type === 'Cash Advance')).map((member, index)=><tr key ={index}>
      <td> {moment(parseInt(member?.createdAt)).format('DD MMM YYYY')}</td>
      <td>{member.amount}</td>
      <td>{member.tx_ref}</td>
      <td>{member.type}</td>
    </tr>)}




  </tbody>
</Table>
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

export default connect(mapStateToProps, {})(CashAdvancePage);
