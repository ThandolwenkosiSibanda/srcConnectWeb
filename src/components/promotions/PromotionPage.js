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




import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_PROMOTION_MUTATION, UPDATE_PROMOTION_MUTATION } from '../../gql/Mutation';
import {  PROMOTION_EDIT_QUERY, PROMOTION_QUERY, VOUCHERCODES_QUERY } from '../../gql/Query';
import {useParams} from 'react-router-dom';


const PromotionPage = () => {

  const {id} = useParams();

  const {data, loading, error} = useQuery(PROMOTION_QUERY, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
    variables: {
       _id: id
    },
  });

  const {data: voucherCodesData, error: viewError} = useQuery(VOUCHERCODES_QUERY, {
    fetchPolicy: 'network-only',
    pollInterval: 500,
    variables: {
       promotion: id
    },
  });


  console.log('voucherCodesData', voucherCodesData);

  console.log('viewError', JSON.stringify(viewError, null, 2));
  

  console.log('id', id)





    const [form, setForm] = useState({});



    useEffect(()=> {
     setForm(data?.promotion);
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
            setImagesUrls(urls)
            submit()
          }
          else {
            submit()
          }


        });
      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>


<div style={{display: 'flex', justifyContent: 'flex-start', padding: '10px'}}>
     <h5>
        View Promotion
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
{/* <Form.Select aria-label="select" name ={'shop'} 
value ={form?.shop} 
onChange={handleChange}
disabled
>

  
<option>Select</option>
  
  <option  value="646c8bc56d06bf86ff0f3dd1">Shop 1</option>
  <option selected value="646c8bc56d06bf86ff0f3dd2"> Shop 2 </option>
</Form.Select> */}

<div>{form?.shop?.name}</div>
</Form.Group>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Type </Form.Label>
{/* <Form.Select aria-label="select" name ={'type'} value ={form?.type} onChange={handleChange}
disabled
>

  
  <option selected={form?.type == "Basic" && true} value="Basic">Basic</option>
  <option  selected={form?.type == "Premium" && true} value="Premium">Premium</option>
</Form.Select> */}

<div>{form?.type}</div>
</Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Title</Form.Label>
    {/* <Form.Control
      type="text"
      placeholder=""
      name ={'title'}
      value ={form?.title}
      onChange={handleChange}
      disabled
    /> */}

<div>{form?.title}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Price</Form.Label>
    <div>{form?.price}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Promo Price</Form.Label>
    <div>{form?.promoPrice}</div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Expiry Date</Form.Label>
    <div>

    {moment(parseInt(form?.expiryDate)).format('MMMM DD YYYY')}
    {/* <DatePicker selected={expiryDate} onChange={(date) => setExpiryDate(date)} /> */}
    </div>
  </Form.Group>



</Form>







</div>

<div>

  <Form.Group className="mb-3" controlId="">
    <Form.Label>Images</Form.Label>
    
  </Form.Group>
  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

  {form?.images && form?.images.map((image, index)=>   <div key ={index} style={{backgroundColor: 'grey', padding: '4px', borderRadius:'10px'}}>
    <img src={image} style={{height: '130px'}} />
  </div>)}

  </div>




  {/* <image src={form?.images[0]}></image> */}
</div>

<div>

  <h6>Voucher Codes</h6>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>Code</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
{voucherCodesData?.voucherCodes?.map((voucher, index)=><tr key ={index}>

          <td>{voucher?.code}</td>
          <td>{voucher?.status}</td>

          


          {/* <td>
			{voucher.status === "Active" && 
			<>
			<button className='btn btn-danger' onClick={()=> console.log('click')} >Reserve</button>
			</>
      }

          </td> */}


        </tr>)}




      </tbody>
    </Table>


</div>

<div>

  <h6>Summary</h6>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>Total</th>
          <th>Active</th>
          <th>Reserved</th>
        </tr>
      </thead>
      <tbody>
<tr >

          <td>{voucherCodesData?.voucherCodes?.length}</td>
          <td>{voucherCodesData?.voucherCodes?.filter((voucher)=>voucher.status === "Active")?.length}</td>
          <td>{voucherCodesData?.voucherCodes?.filter((voucher)=>voucher.status === "Reserved")?.length}</td>


        </tr>




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

export default connect(mapStateToProps, {})(PromotionPage);
