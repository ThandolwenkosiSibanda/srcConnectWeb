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
import { CREATE_PROMOTION_MUTATION, DELETE_PROMOTION_MUTATION } from '../../gql/Mutation';
import { ADMIN_PROMOTIONS_QUERY, SHOPS_QUERY } from '../../gql/Query';
import moment from 'moment/moment';


const PromotionsPage = () => {
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [active, setActive] = useState({});


    const [shopFilter, setShopFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [titleFilter, setTitleFilter] = useState("");

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
       setForm({...form, [e.target.name]: e.target.value})
      };


    const handleImageChange = (e) => {
        if (e.target.files) {
          setImages(e.target.files);
        }
      };


      const {data, loading, error} = useQuery(ADMIN_PROMOTIONS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });

      const {data: shops} = useQuery(SHOPS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });


      console.log('shops', shops?.shops)

      console.log('data', data);

      console.log('active', active)


    const [submit, {data: createData, error: createError}] = useMutation(CREATE_PROMOTION_MUTATION, {
        variables: {
          shop: form.shop,
          type: form.type,
          title: form.title,
          price: parseFloat(form.price),
          promoPrice: parseFloat(form.promoPrice),
          numberOfVoucherCodes: parseFloat(form.numberOfVoucherCodes),
          expiryDate: expiryDate,
          images: imagesUrls
        },
      });

      console.log('createData', createData);
    //   console.log('createError', createError);

      console.log('createError', JSON.stringify(createError, null, 2));


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
        
          setImagesUrls(urls)
      
          submit();
          setShow(false);

        });
      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>


<div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
     <Button variant="primary" onClick={handleShow}>
Add New Promotion
      </Button>

      </div>

<div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>

<Form.Group className="mb-3" controlId="">
              <Form.Label>Search By Shop</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'title'}
                onChange={(e)=>setShopFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Search By Type</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'title'}
                onChange={(e)=>setTypeFilter(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Search By Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'title'}
                onChange={(e)=>setTitleFilter(e.target.value)}
              />
            </Form.Group>





</div>




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          Add New Promotion
        </Modal.Header>
        <Modal.Body>
          <Form>


          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Shop</Form.Label>
          <Form.Select aria-label="select" name ={'shop'} onChange={handleChange}>
          <option value="">Select</option>

            {shops?.shops.map((shop, index)=> <option key ={index} value={shop._id}>{shop.name}</option>)}
            
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
          <Form.Select aria-label="select" name ={'type'} onChange={handleChange}>

            <option value="">Select</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </Form.Select>
        </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'title'}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'price'}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Promo Price</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'promoPrice'}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Number of Voucher Codes</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'numberOfVoucherCodes'}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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


<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Shop</th>
          <th>Type</th>
          <th>Title</th>
          <th>Price</th>
          <th>Promo Price</th>
          <th>Expiry Date</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
{data?.admin_promotions?.filter(promotion => promotion.title.toLowerCase().indexOf(titleFilter?.toLowerCase()) > -1)
.filter(promotion => promotion?.shop?.name.toLowerCase().indexOf(shopFilter?.toLowerCase()) > -1)
.filter(promotion => promotion.type.toLowerCase().indexOf(typeFilter?.toLowerCase()) > -1)
.map((promotion, index)=><tr key ={index}>
   <td>{index + 1}</td>
          <td>{promotion?.shop?.name}</td>
          <td>{promotion.type}</td>
          <td>{promotion.title}</td>
          <td>{promotion.price}</td>
          <td>{promotion.promoPrice}</td>
          <td>{moment(parseInt(promotion.expiryDate)).format('MMMM DD YYYY')}</td>
          <td>{moment(parseInt(promotion.expiryDate)).isAfter(moment())? 'Active' : 'Expired'}</td>


        
          <td>
            <Link to={`/promotions/${promotion._id}`} className="btn btn-primary">View</Link>
          </td>

          <td>
            <Link to={`/promotions/${promotion._id}/edit`} className='btn btn-warning'> Edit</Link>
          </td>

          <td>
             <button className='btn btn-danger' onClick={()=> handleDeleteClick(promotion)} >Delete</button>
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

export default connect(mapStateToProps, {})(PromotionsPage);
