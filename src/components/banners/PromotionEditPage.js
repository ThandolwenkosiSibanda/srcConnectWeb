import React, {useEffect, useState} from 'react';
import './index.css';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link , Redirect } from 'react-router-dom';

import axios from 'axios';
import DatePicker from "react-datepicker";

import moment from 'moment/moment';



import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PROMOTION_MUTATION, UPDATE_PROMOTION_MUTATION } from '../../gql/Mutation';
import {  PROMOTION_EDIT_QUERY, PROMOTION_QUERY, SHOPS_QUERY } from '../../gql/Query';
import {useParams, useHistory} from 'react-router-dom';


const PromotionEditPage = () => {

  const {id} = useParams();

  const history = useHistory();

  const {data, loading, error} = useQuery(PROMOTION_EDIT_QUERY, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
    variables: {
       _id: id
    },
  });

  const {data: shops} = useQuery(SHOPS_QUERY, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
  });



  console.log('data', data?.promotion)
  

  console.log('id', id)





    const [form, setForm] = useState({});



    useEffect(()=> {
     setForm(data?.promotionEdit);
     if(data?.promotion?.expiryDate){
      setExpiryDate(parseInt(data?.promotion?.expiryDate));
     
     }

     

    }, [loading]);



    console.log('form', form)


    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});

    const [show, setShow] = useState(false);

    const [showDelete, setShowDelete] = useState(false);


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
            setImagesUrls(urls);
            submit();

            console.log('updated')
            history.push('/promotions');
          }
          else {
            submit();
            history.push('/promotions');
          }


        });
      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>


<div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
     <h5>
        Edit Promotion
      </h5>

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



<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '20px'}}>

<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>


<Form>
  


<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Shop</Form.Label>
<Form.Select aria-label="select" name ={'shop'} 
value ={form?.shop} 
onChange={handleChange}

>



{shops?.shops.map((shop, index)=> <option key ={index} value={shop._id}>{shop.name}</option>)}
            
  
</Form.Select>
</Form.Group>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Type </Form.Label>
<Form.Select aria-label="select" name ={'type'} value ={form?.type} onChange={handleChange}>

  
  <option selected={form?.type == "Basic" && true} value="Basic">Basic</option>
  <option  selected={form?.type == "Premium" && true} value="Premium">Premium</option>
</Form.Select>
</Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Title</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'title'}
      value ={form?.title}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Price</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'price'}
      value ={form?.price}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Promo Price</Form.Label>
    <Form.Control
      type="text"
      placeholder=""
      name ={'promoPrice'}
      value ={form?.promoPrice}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Expiry Date</Form.Label>
    <div>
    <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)} />
    </div>
  </Form.Group>

  <Form.Group controlId="formFileLg" className="mb-3">
    <Form.Label>Images</Form.Label>
    <Form.Control type="file" size="lg"  multiple onChange={handleImageChange} />
 </Form.Group>

</Form>







</div>

<div>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Current Images</Form.Label>
    
  </Form.Group>
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

  {form?.images && form?.images.map((image, index)=>   <div key ={index} style={{backgroundColor: 'grey', padding: '4px', borderRadius:'10px'}}>
    <img src={image} style={{height: '130px'}} />
  </div>)}

  </div>




  {/* <image src={form?.images[0]}></image> */}
</div>

<div>

<Form.Group className="mb-3" controlId="">
    <Form.Label>New Images</Form.Label>
  </Form.Group>

{[...images].map((image)=> <div style={{backgroundColor: 'grey', padding: '4px', borderRadius:'10px'}}>
    <img src={URL.createObjectURL(image)} style={{height: '130px'}} />
  </div>)}
</div>

</div>




<div style={{display: 'flex', justifyContent: 'center'}}>
<button className='btn btn-primary'  onClick={handleSubmit} >Update Promotion</button>
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

export default connect(mapStateToProps, {})(PromotionEditPage);
