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

import GoogleMapReact from 'google-map-react';



import "react-datepicker/dist/react-datepicker.css";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_BANK_MUTATION, CREATE_PROMOTION_MUTATION, CREATE_SHOP_MUTATION, DELETE_BANK_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PERSONAL_LOAN_MUTATION, UPDATE_SHOP_MUTATION } from '../../gql/Mutation';
import {  ADMIN_LOANS_QUERY, BANKS_QUERY, GET_MONEY_MEMBERSHIP_BY_ID, SHOPS_QUERY } from '../../gql/Query';
import moment from 'moment';


const BanksPage = () => {

  const LocationPin = ({ text }) => (
    <div className="pin">
      <p className="pin-text">{text}</p>
    </div>
  )


  const defaultProps = {
    center: {
      lat: -21.139212,
      lng: 28.5671424
    },
    zoom: 15
  };
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());


    const [nameFilter, setNameFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
   

    const [location, setLocation] = useState({
      lat: -26.195246,
      lng: 28.034088
    });


    console.log('location on move', location);



    const renderMarkers = (map, maps) => {
      let marker = new maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      draggable:true,
      title: 'form'
      });

      marker.addListener("dragend", () => {
        console.log('lat', marker.getPosition().lat());
        console.log('long', marker.getPosition().lng());

        

        console.log('newPosition', marker.getPosition());

        setLocation({'lat': marker.getPosition().lat(), 'lng' : marker.getPosition().lng()  })
      });
      return marker;
     };


    console.log('form', form)

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

	const [showApprove, setShowApprove] = useState(false);
	const [showBlacklist, setShowBlacklist] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);







	const handleDeleteClick = (member) => {
        setActive(member);
        setShowDelete(true)
    };


    const handleCancelEdit = (member) => {
      setActive({});
      setShowEdit(false)
  };



    const handleDelete = (promotion) => {
        deleteBank();
        setShowDelete(false);
    };


    const handleUpdate = (promotion) => {
          update();
          setShowEdit(false);
      };



	const handleBlacklist = (promotion) => {
        rejectPersonalLoan();
        setShowBlacklist(false);
    };

    const handleCancelDelete = (promotion) => {
        setActive({});
        setShowDelete(false)
    };



	const handleCancelBlacklist = (promotion) => {
        setActive({});
        setShowBlacklist(false)
    };


    const handleChange = (e) => {
       setForm({...form, [e.target.name]: e.target.value})
      };




      const {data, loading, error} = useQuery(BANKS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });






    const [submit, {data: createData, error: createError}] = useMutation(CREATE_BANK_MUTATION, {
        variables: {
          name: form.name,
        },
      });


      const [update, {data: updateData, error: updateError}] = useMutation(UPDATE_SHOP_MUTATION, {
        variables: {
          _id: form._id,
          name: form.name,
          address: form.address,
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
        },
      });

      console.log('updateData', updateData);
    //   console.log('createError', createError);

      console.log('createError shop', JSON.stringify(updateError, null, 2));


      const [deleteBank, {data: deleteData, error: deleteError}] = useMutation(DELETE_BANK_MUTATION, {
        variables: {
          _id: active._id
        },
      });






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

      submit()
      setShow(false)

      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>

{/* <h5>Banks</h5> */}

<div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
     <Button variant="primary" onClick={handleShow}>
Add New Bank
      </Button>

      </div>


      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        

        <div style={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
  

  </div>
  
          <div style={{display: 'flex', flexDirection: 'column'}}>
  
          {/* <Table striped bordered hover>
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
          
            <td>{data?.shops?.length}</td>
            <td>{data?.shops?.filter((member)=> member.status === "Approved").length}</td>
            <td>{data?.admin_personalLoans?.filter((member)=> member.status === "Rejected").length}</td>
            <td>{data?.admin_personalLoans?.filter((member)=> member.status === "Pending").length}</td>
          </tr>
  
  
  
  
        </tbody>
      </Table> */}
  
    
          </div>
  
        </div>


      <Modal show={show} onHide={handleClose} size='sm'>
        <Modal.Header closeButton>
          Add New Bank
        </Modal.Header>
        <Modal.Body>
          <Form>




            <Form.Group className="mb-3" controlId="">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'name'}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>


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
          Are you sure you want to delete this bank
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.name} 
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

	  <Modal show={showEdit} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          Update Shop
        </Modal.Header>
        <Modal.Body>
        <Form>


{/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Shop</Form.Label>
<Form.Select aria-label="select" name ={'shop'} onChange={handleChange}>
  
  <option value="646c8bc56d06bf86ff0f3dd1">Shop 1</option>
  <option value="646c8bc56d06bf86ff0f3dd1"> Shop 2 </option>
</Form.Select>
</Form.Group> */}

{/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Type</Form.Label>
<Form.Select aria-label="select" name ={'type'} onChange={handleChange}>
  
  <option value="Basic">Basic</option>
  <option value="Premium">Premium</option>
</Form.Select>
</Form.Group> */}

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Name</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'name'}
      value ={form.name}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Address</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'address'}
      value ={form.address}
      onChange={handleChange}
    />
  </Form.Group>







</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
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
          <th></th>
		   

        </tr>
      </thead>
      <tbody>
{data?.banks?.map((member, index)=><tr key ={index}>
<td>{index + 1}</td>

        <td>{member.name}</td>
        <td>
           <button className='btn btn-secondary' onClick={()=> handleDeleteClick(member)} >Delete</button>
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

export default connect(mapStateToProps, {})(BanksPage);
