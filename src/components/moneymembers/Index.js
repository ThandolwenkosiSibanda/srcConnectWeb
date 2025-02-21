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
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROMOTION_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION } from '../../gql/Mutation';
import {  ADMIN_MONEY_MEMBERS_QUERY } from '../../gql/Query';


const MoneyMemberPage = () => {
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);


    const [nameFilter, setNameFilter] = useState("");
    const [surnameFilter, setSurnameFilter] = useState("");
    const [bankFilter, setBankFilter] = useState("");

    const [showDelete, setShowDelete] = useState(false);

	const [showApprove, setShowApprove] = useState(false);
	const [showBlacklist, setShowBlacklist] = useState(false);

  const [showUpdateLimits, setShowUpdateLimits] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleUpdateClick = (member) => {
      setActive(member);
      setShowUpdateLimits(true)

      setForm({...form, "personalLoanLimit": member.personalLoanLimit, "cashAdvanceLimit": member.cashAdvanceLimit})
  };

  const handleCancelUpdate = (promotion) => {
    setActive({});
    setShowUpdateLimits(false)
};

    const handleDeleteClick = (member) => {
        setActive(member);
        setShowDelete(true)
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



    

    const handleUpdateLimits = (promotion) => {
      updateMoneyMemberLimits();
      setShowUpdateLimits(false)
  };

	const handleApprove = (promotion) => {
        approveMoneyMember();
        setShowApprove(false);
    };

	const handleBlacklist = (promotion) => {
        blacklistMoneyMember();
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


      const {data, loading, error} = useQuery(ADMIN_MONEY_MEMBERS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });

      console.log('data', data);

      console.log('active', active)


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


	  const [approveMoneyMember, {data: approveData, error: approveError}] = useMutation(UPDATE_MONEY_MEMBER_MUTATION, {
        variables: {
          user: active._id,
		  verificationStatus: 'Verified'
        },
      });

      const [updateMoneyMemberLimits, {data: updateData, error: updateError}] = useMutation(UPDATE_MONEY_MEMBER_MUTATION, {
        variables: {
          user: active._id,
		      personalLoanLimit: parseFloat(form.personalLoanLimit),
          cashAdvanceLimit: parseFloat(form.cashAdvanceLimit)
        },
      });

	  console.log('updateError', JSON.stringify(updateError, null, 2));

	  const [blacklistMoneyMember, {data: blacklistData, error: blacklistError}] = useMutation(UPDATE_MONEY_MEMBER_MUTATION, {
        variables: {
          user: active._id,
		  verificationStatus: 'Rejected'
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

<h5>Money Members</h5>


<Modal show={showUpdateLimits} onHide={handleCancelUpdate}>
        <Modal.Header closeButton>
          Update Money Member Personal Loan and Cash advance Limits
        </Modal.Header>
        <Modal.Body>
          <Form>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Personal Loan limit</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'personalLoanLimit'}
      value ={form?.personalLoanLimit}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Cash Advance limit</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'cashAdvanceLimit'}
      value ={form?.cashAdvanceLimit}
      onChange={handleChange}
    />
  </Form.Group>
  
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelUpdate}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUpdateLimits}>
            Update Limits
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
          Are you sure you want to Approve this money member
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
          Are you sure you want to blacklist this money member
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
            Blacklist
          </Button>
        </Modal.Footer>
      </Modal>


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
              <Form.Label>Search By Bank</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'title'}
                onChange={(e)=>setBankFilter(e.target.value)}
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

        </tr>
      </thead>
      <tbody>
      <tr >
        
          <td>{data?.moneyMembers.length}</td>
          <td>{data?.moneyMembers.filter((member)=> member.verificationStatus === "Verified").length}</td>
          <td>{data?.moneyMembers.filter((member)=> member.verificationStatus === "Rejected").length}</td>

        </tr>




      </tbody>
    </Table>

  
        </div>

      </div>



<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Phone</th>
          <th>Bank</th>
          <th>Bank Account</th>
          <th>verification Status</th>
          <th>Personal Loan Limit</th>
          <th>Cash Advance Limit</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
{data?.moneyMembers?.filter(promotion => promotion.name.toLowerCase().indexOf(nameFilter?.toLowerCase()) > -1)
.filter(promotion => promotion?.surname.toLowerCase().indexOf(surnameFilter?.toLowerCase()) > -1)
.filter(promotion => promotion.bank.toLowerCase().indexOf(bankFilter?.toLowerCase()) > -1).map((member, index)=><tr key ={index}>
           <td>{index + 1}</td>
          <td>{member?.name}</td>
          <td>{member.surname}</td>
          <td>{member.phone}</td>
          <td>{member.bank}</td>
          <td>{member.bankAccount}</td>
          <td>{member.verificationStatus}</td>
          <td>{member.personalLoanLimit}</td>
          <td>{member.cashAdvanceLimit}</td>
          <td>
            <Link to={`/moneymembers/${member._id}`} className="btn btn-primary">View</Link>
          </td>

          <td>
          <button className='btn btn-warning' onClick={()=> handleUpdateClick(member)} >Update</button>
          </td>

          <td>
			{member.verificationStatus === "Progress" && 
			<>
			<button className='btn btn-warning' onClick={()=> handleBlacklistClick(member)} >Blacklist</button>
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-warning'>Blacklist</Link> */}
			<button className='btn btn-primary' onClick={()=> handleApproveClick(member)} >Approve</button>
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-primary'> Approve</Link> */}
			</>}

      {member.verificationStatus === "Verified" && 
			<>
			<button className='btn btn-warning' onClick={()=> handleBlacklistClick(member)} >Blacklist</button>
      
		
			</>}

      {member.verificationStatus === "Rejected" && 
			<>
			<button className='btn btn-primary' onClick={()=> handleApproveClick(member)} >Approve</button>
		
			</>}

          </td>

          <td>
             <button className='btn btn-danger' onClick={()=> handleDeleteClick(member, 'delete')} >Delete</button>
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

export default connect(mapStateToProps, {})(MoneyMemberPage);
