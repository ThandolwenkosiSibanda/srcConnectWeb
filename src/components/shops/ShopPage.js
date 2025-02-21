import React, {useState, useEffect} from 'react';
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
// import { Icon } from '@iconify/react';
// import locationIcon from '@iconify/icons-mdi/map-marker';

import axios from 'axios';
import DatePicker from "react-datepicker";

import GoogleMapReact from 'google-map-react';







import { CREATE_PROMOTION_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PERSONAL_LOAN_MUTATION } from '../../gql/Mutation';
import {  ADMIN_LOANS_QUERY, GET_MONEY_MEMBERSHIP_BY_ID, LOANS_QUERY, PAYMENTS_QUERY, PERSONAL_LOANS_QUERY, PERSONAL_LOAN_QUERY, SHOP_PROMOTIONS_QUERY, SHOP_QUERY } from '../../gql/Query';
import moment from 'moment';



const LoanPage = () => {

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const LocationPin = ({ text }) => (
    <div className="pin">
      {/* <Icon icon={locationIcon} className="pin-icon" /> */}


    
      <span className="pin-text">{text}</span>
    </div>
  )




  const {id} = useParams();
    const [form, setForm] = useState({});
    const [images, setImages] = useState([]);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [location, setLocation] = useState({
      lat: '',
      lng: ''
    });

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


      const {data, loading, error} = useQuery(SHOP_QUERY, {
        fetchPolicy: 'network-only',
        // pollInterval: 500,
        variables: {
          _id: id
        },
      });


      useEffect(()=> {

        setLocation({
          'lat': data?.shop?.location?.coordinates[0], 
          'lng': data?.shop?.location?.coordinates[1], 
        })

        console.log('shop data has changed')
       }, [data]);


       const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: data?.shop.address
        });
        return marker;
       };

      const defaultProps = {
        center: {
          lat: -21.139212,
          lng: 28.5671424
        },
        zoom: 11
      };


      console.log('data on the shoppage', data?.shop?.location?.coordinates)

      // useEffect(()=> {
      
      //   // if(data?.shop?._id ){

      //   //   getPromotions({ variables: { shop: data.shop._id} })
      
      //   // }
        
      //  }, [loading]);

      console.log('Error', data?.personalLoan);

      console.log('Error', JSON.stringify(error, null, 2));


      const {data: promotionsData, loading: promotionsLoading, error: promotionsError} = useQuery(SHOP_PROMOTIONS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
        variables: {
          shop: id
        },
      });



      // const [getPromotions, { loading: promotionsLoading,error: promotionsError, data: promotionsData }] = useLazyQuery(SHOP_PROMOTIONS_QUERY);
      const [getPersonalLoansPayments, { loading: personalLoansPaymentsLoading, error: personalLoansPaymentsError, data: personalLoansPaymentsData }] = useLazyQuery(PAYMENTS_QUERY);


      const [getMoneyMember, { loading: memberLoading, error: memberError, data: memberData }] = useLazyQuery(GET_MONEY_MEMBERSHIP_BY_ID);



      console.log('promotionsData', promotionsData)
 

      console.log('personalLoansPaymentsError', JSON.stringify(promotionsError, null, 2));



      const sumPersonalLoans = promotionsData?.personalLoans?.filter((loan)=> (loan.status === 'Approved')).reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);




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

<h5>Shop</h5>


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
          Are you sure you want to delete this promotion
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
          Are you sure you want to Reject this loan
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
<h6>Shop Details</h6>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Joined</th>
          <th>Name</th>
		      <th>Address</th>
        </tr>
      </thead>
      <tbody>
<tr  >

          <td> {moment(parseInt(data?.shop?.createdAt)).format('DD-MMM-YYYY')}</td>
          <td>{data?.shop?.name}</td>
		  <td>{data?.shop?.address}</td>
      

      <td>

 
			{/* <button className='btn btn-primary' onClick={()=> handleApproveClick(data?.personalLoan)} >Edit</button>
		 */}

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
          <th>Total Promotions</th>
          <th>Active Promotions</th>

        </tr>
      </thead>
      <tbody>
<tr  >

          <td></td>
          <td></td>

          
        </tr>




      </tbody>
    </Table>
    </div>

      </div>

      </div>

<div style={{display:'flex', flexDirection: 'row', gap: '10px', width: '100%',}}>



  <div style={{ flex: 1}}>

    <h6>Promotions</h6>
  <Table striped bordered hover>
      <thead>
        <tr>
        <th>Type</th>
          <th>Title</th>
          <th>Price</th>
          <th>Promo Price</th>
          <th>Expiry Date</th>
          <th></th>
          <th></th>
          <th></th>

        </tr>
      </thead>
      <tbody>
{promotionsData?.shopPromotions?.map((promotion, index)=><tr key ={index}>

          <td>{promotion.type}</td>
          <td>{promotion.title}</td>
          <td>{promotion.price}</td>
          <td>{promotion.promoPrice}</td>
          <td>{moment(parseInt(promotion.expiryDate)).format('MMMM DD YYYY')}</td>
        
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

  <div div style={{ flex: 1}}>

<h6>Map</h6>


<div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAJG1ijs2h0yx0ZCY21m6wlAxuCr398Wco" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={location}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >


{console.log('location', location)}

<LocationPin
          lat={location.lat}
          lng={location.lng}
          text={data?.shop?.address}
        />
      </GoogleMapReact>
</div>
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

export default connect(mapStateToProps, {})(LoanPage);
