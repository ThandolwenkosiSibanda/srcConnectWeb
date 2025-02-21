import React, {useEffect, useState} from 'react';
import './index.css';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from 'moment/moment';

import FileViewer from 'react-file-viewer';


// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import DocViewer from "react-doc-viewer";



import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PROMOTION_MUTATION } from '../../gql/Mutation';
import {  GET_MONEY_MEMBER, GET_MONEY_MEMBERSHIP_BY_ID, PROMOTION_EDIT_QUERY, PROMOTION_QUERY } from '../../gql/Query';
import {useParams} from 'react-router-dom';


const MoneyMemberPage = () => {

  const {id} = useParams();

  const {data, loading, error} = useQuery(GET_MONEY_MEMBER, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
    variables: {
       user: id
    },
  });


  console.log('data', data)
  console.log('error', error)

  console.log('id', id)





    const [form, setForm] = useState({});



    useEffect(()=> {
     setForm(data?.moneyMemberID);
    }, [loading]);



    console.log('form', form)


    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [showApprove, setShowApprove] = useState(false);
    const [showBlacklist, setShowBlacklist] = useState(false);

    const handleApproveClick = (member) => {
      setActive(member);
      setShowApprove(true)
  };

  const handleCancelBlacklist = (promotion) => {
    setActive({});
    setShowBlacklist(false)
};

const handleBlacklist = (promotion) => {
  blacklistMoneyMember();
  setShowBlacklist(false);
};


const handleBlacklistClick = (member) => {
  setActive(member);
  setShowBlacklist(true)
};



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDeleteClick = (promotion) => {
        setActive(promotion);
        setShowDelete(true)
    };

    const handleDelete = (promotion) => {
        deletePromotion();
        setShowDelete(false);
    };

    const handleCancelDelete = (promotion) => {
        setActive({});
        setShowDelete(false)
    };


    const handleChange = (e) => {
console.log('handle change', e.target.name)

       setForm({...form, [e.target.name]: e.target.value})
      };


    const handleImageChange = (e) => {

        if (e.target.files) {
          setImages(e.target.files);
        }
      };




      console.log('data', data);

      console.log('active', active)

      const handleApprove = (promotion) => {
        approveMoneyMember();
        setShowApprove(false);
    };

    const handleCancelApprove = (promotion) => {
      setActive({});
      setShowApprove(false)
  };

  const [approveMoneyMember, {data: approveData, error: approveError}] = useMutation(UPDATE_MONEY_MEMBER_MUTATION, {
    variables: {
      user: id,
       verificationStatus: 'Verified'
    },
  });

  const [blacklistMoneyMember, {data: blacklistData, error: blacklistError}] = useMutation(UPDATE_MONEY_MEMBER_MUTATION, {
    variables: {
      user: id,
  verificationStatus: 'Rejected'
    },
  });


    const [submit, {data: updateData, error: updateError}] = useMutation(UPDATE_PROMOTION_MUTATION, {
        variables: {
          _id: id,
          shop: form?.shop,
          type: form?.type,
          title: form?.title,
          price: parseFloat(form?.price),
          promoPrice: parseFloat(form?.promoPrice),
          expiryDate: expiryDate.toString(),
          images: imagesUrls.length > 0 ? imagesUrls : form?.images
        },
      });

      console.log('updateData', updateData);
    //   console.log('createError', createError);

      console.log('updateError', JSON.stringify(updateError, null, 2));


      const [deletePromotion, {data: deleteData, error: deleteError}] = useMutation(DELETE_PROMOTION_MUTATION, {
        variables: {
          _id: active._id
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


          if(urls.length > 0){
            setImagesUrls(urls)
            submit()
          }
          else {
            submit()
          }


        });
      }
 




    const  docs = [form?.nationalIdUrl,form?.bankStatementUrl ];
     
      
      


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>


<div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
     <h5>
        View Money Member
      </h5>

      </div>

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>

     


			{form?.verificationStatus === "Progress" && 
			<>
			{/* <button className='btn btn-warning' onClick={()=> handleBlacklistClick(form)} >Blacklist</button> */}
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-warning'>Blacklist</Link> */}
			{/* <button className='btn btn-primary' onClick={()=> handleApproveClick(form)} >Approve</button> */}
			{/* <Link to={`/moneymembers/${member._id}/edit`} className='btn btn-primary'> Approve</Link> */}
			</>}


      {form?.verificationStatus === "Verified" && 
			<>
			{/* <button className='btn btn-warning' onClick={()=> handleBlacklistClick(form)} >Blacklist</button> */}
		
			</>}

      {form?.verificationStatus === "Rejected" && 
			<>
			{/* <button className='btn btn-primary' onClick={()=> handleApproveClick(form)} >Approve</button> */}
		
			</>}
      </div>



      <Modal show={showDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          Are you sure you want to delete this promotion
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
                {active.title}
            </div>
  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Promotion
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



<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '20px'}}>

<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>


<Form>
  





  <Form.Group className="mb-3" controlId="">
    <Form.Label>Name</Form.Label>
    <div>{form?.name}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Surname</Form.Label>
    <div>{form?.surname}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Bank</Form.Label>
    <div>{form?.bank}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Bank Account</Form.Label>
    <div>{form?.bankAccount}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Verification Status</Form.Label>
    <div>{form?.verificationStatus}</div>
  </Form.Group>


</Form>







</div>

<div>
  <Form.Group className="mb-3" controlId="">
    <Form.Label>National ID</Form.Label>
    <div>
    <a href={form?.nationalIdUrl} download >Click to view and dowload</a>
    </div>
  </Form.Group>
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
  {/* <img src={form?.nationalIdUrl} style={{height: '500px'}} /> */}


  <div key={Math.random()}>
  {form?.nationalIdUrl && <FileViewer
        fileType={'pdf'}
        filePath={form?.nationalIdUrl} />}

</div>



  {/* <iframe
        src={form?.nationalIdUrl}
        title="file"
        width="100%"
        height="800"
      ></iframe> */}


  </div>

</div>




<div>
  <Form.Group className="mb-3" controlId="">
    <Form.Label>Bank Statement</Form.Label>
    <div>
    <a href={form?.bankStatementUrl} download >Click to view and dowload</a>
    </div>
  </Form.Group>
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
  {/* <img src={form?.bankStatementUrl} style={{height: '500px'}} /> */}

  {/* <iframe
        src={form?.bankStatementUrl}
        title="file"
        width="100%"
        height="800"
      ></iframe> */}


  </div>

</div>



{/* 


<iframe
        src={form?.bankStatementUrl}
        title="file"
        width="100%"
        height="400"
      ></iframe> */}






</div>


{/* <iframe
        src={form?.nationalIdUrl}
        title="file"
        width="100%"
        height="400"
      ></iframe> */}

{/* <iframe
        src={form?.bankStatementUrl}
        title="file"
        width="100%"
        height="400"
      ></iframe> */}











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
