import React, {useState} from 'react';
import './index.css';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import axios from 'axios';
import DatePicker from "react-datepicker";



import "react-datepicker/dist/react-datepicker.css";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_PROMOTION_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PERSONAL_LOAN_MUTATION } from '../../gql/Mutation';
import {  ADMIN_LOANS_QUERY, GET_MONEY_MEMBERSHIP_BY_ID } from '../../gql/Query';


const LoansPage = () => {
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [nameFilter, setNameFilter] = useState("");
    const [surnameFilter, setSurnameFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");


    console.log('form', form)

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


      const {data, loading, error} = useQuery(ADMIN_LOANS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });

      console.log(' all loans data', data)



      const [getMoneyMember, { loading: memberLoading, memberError, memberData }] = useLazyQuery(GET_MONEY_MEMBERSHIP_BY_ID);


      console.log(' memberLoading',  memberLoading);
      console.log(' memberData',  memberData);

      console.log('memberError', JSON.stringify(memberError, null, 2));


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


	  const [approvePersonalLoan, {data: approveData, error: approveError}] = useMutation(UPDATE_PERSONAL_LOAN_MUTATION, {
        variables: {
          _id: active._id,
		  status: 'Approved',
		  email: 'sibandathandolwenkosi2@gmail.com'
        },
      });

	  console.log('approveError', JSON.stringify(approveError, null, 2));

	  const [rejectPersonalLoan, {data: rejectData, error: rejectError}] = useMutation(UPDATE_PERSONAL_LOAN_MUTATION, {
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

<h5>Personal Loans</h5>

<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        

        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
  
  <Form.Group className="mb-3" controlId="">
                <Form.Label>Search By Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setNameFilter(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Search By Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setSurnameFilter(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Search By Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setStatusFilter(e.target.value)}
                />
              </Form.Group>
  
  
  
  
  
  </div>
  
          <div style={{display: 'flex', flexDirection: 'column'}}>
  
          <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total</th>
            <th>Approved</th>
            <th>Rejected</th>
            <th>Pending</th>
  
          </tr>
        </thead>
        <tbody>
        <tr >
          
            <td>{data?.admin_personalLoans?.length}</td>
            <td>{data?.admin_personalLoans?.filter((member)=> member.status === "Approved").length}</td>
            <td>{data?.admin_personalLoans?.filter((member)=> member.status === "Rejected").length}</td>
            <td>{data?.admin_personalLoans?.filter((member)=> member.status === "Pending").length}</td>
          </tr>
  
  
  
  
        </tbody>
      </Table>
  
    
          </div>
  
        </div>
  


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
          Are you sure you want to Approve this Loan
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.name} {active.surname}
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
          Are you sure you want to Reject this loan
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.name} {active.surname}
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



<Table striped bordered hover>
      <thead>
        <tr>
        <th>#</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Amount</th>
		  <th>Months</th>
          <th>Status</th>
          <th></th>
		       <th></th>
           <th></th>

        </tr>
      </thead>
      <tbody>
{data?.admin_personalLoans?.filter(promotion => promotion?.moneyMember?.name?.toLowerCase().indexOf(nameFilter?.toLowerCase()) > -1)
.filter(promotion => promotion?.moneyMember?.surname?.toLowerCase().indexOf(surnameFilter?.toLowerCase()) > -1)
.filter(promotion => promotion.status.toLowerCase().indexOf(statusFilter?.toLowerCase()) > -1).map((member, index)=><tr key ={index}>
          <td>{index + 1}</td>
          <td>{member?.moneyMember?.name}</td>
          <td>{member?.moneyMember?.surname}</td>
          <td>{member.amount}</td>
          <td>{member.months}</td>
		  <td>{member.status}</td>
          


          <td>
			{member.status === "Pending" && 
			<>
			<button className='btn btn-danger' onClick={()=> handleBlacklistClick(member)} >Reject</button>
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-warning'>Blacklist</Link> */}
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-primary'> Approve</Link> */}
			</>}

          </td>


		  <td>
			{member.status === "Pending" && 
			<>
			
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-warning'>Blacklist</Link> */}
			<button className='btn btn-primary' onClick={()=> handleApproveClick(member)} >Approve</button>
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-primary'> Approve</Link> */}
			</>}

          </td>

         

          <td>
            
          <Link to={`/loans/${member._id}`} className="btn btn-primary">View History</Link>

            {/* <button className='btn btn-primary' onClick={()=> handleHistoryClick(member?.moneyMember?._id)} >View History</button>
             */}
            </td>



        </tr>)}




      </tbody>
    </Table>

			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, {})(LoansPage);
