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
import { CREATE_PROMOTION_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, DELETE_USER_MUTATION, UPDATE_MONEY_MEMBER_MUTATION } from '../../gql/Mutation';
import {  ADMIN_MONEY_MEMBERS_QUERY, USERS_QUERY } from '../../gql/Query';
import moment from 'moment';


const UsersPage = () => {
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

	const [showApprove, setShowApprove] = useState(false);
	const [showBlacklist, setShowBlacklist] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [emailFilter, setEmailFilter] = useState("");
    const [verificationFilter, setVerificationStatusFilter] = useState("");
    const [bankFilter, setBankFilter] = useState("");


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
        deleteUser();
        setShowDelete(false);
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


      const {data, loading, error} = useQuery(USERS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });

      console.log('data', data);

	  // console.log('error', error);

    console.log('error', JSON.stringify(error, null, 2));

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


      const [deleteUser, {data: deleteData, error: deleteError}] = useMutation(DELETE_USER_MUTATION, {
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

	  console.log('approveError', JSON.stringify(approveError, null, 2));

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

<h5>Users</h5>


<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        

        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
  
  <Form.Group className="mb-3" controlId="">
                <Form.Label>Search By Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setEmailFilter(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Search By Verification</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setVerificationStatusFilter(e.target.value)}
                />
              </Form.Group>
  

  
  
  
  
  
  </div>
  
          <div style={{display: 'flex', flexDirection: 'column'}}>
  
          <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total</th>
            <th>Verified</th>
            <th>Progress</th>
  
          </tr>
        </thead>
        <tbody>
        <tr >
          
            <td>{data?.users.length}</td>
            <td>{data?.users.filter((member)=> member.verificationStatus === "Verified").length}</td>
            <td>{data?.users.filter((member)=> member.verificationStatus === "Progress").length}</td>
  
          </tr>
  
  
  
  
        </tbody>
      </Table>
  
    
          </div>
  
        </div>


      <Modal show={showDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          Are you sure you want to delete this user
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.email} 
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



<Table striped bordered hover>
      <thead>
        <tr>
         <th>#</th>
		     <th>Joined</th>
          <th>Email</th>
          <th>verification Status</th>
          <th></th>
   
        </tr>
      </thead>
      <tbody>
{data?.users?.filter(promotion => promotion.email.toLowerCase().indexOf(emailFilter?.toLowerCase()) > -1)
.filter(promotion => promotion?.verificationStatus.toLowerCase().indexOf(verificationFilter?.toLowerCase()) > -1)
.map((member, index)=><tr key ={index}>
<td>{index + 1}</td>
          <td> {moment(parseInt(member?.createdAt)).format('DD-MMM-YYYY')}</td>
          <td>{member.email}</td>
          <td>{member.verificationStatus}</td>

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

export default connect(mapStateToProps, {})(UsersPage);
