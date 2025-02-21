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
import { CREATE_PROMOTION_MUTATION, CREATE_SHOP_MUTATION, DELETE_MONEY_MEMBER_MUTATION, DELETE_PROMOTION_MUTATION, UPDATE_MONEY_MEMBER_MUTATION, UPDATE_PERSONAL_LOAN_MUTATION, UPDATE_SHOP_MUTATION } from '../../gql/Mutation';
import {  ADMIN_LOANS_QUERY, GET_MONEY_MEMBERSHIP_BY_ID, SHOPS_QUERY } from '../../gql/Query';
import moment from 'moment';


const ShopsPage = () => {

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

    const handleHistoryClick = (member) => {

      console.log('member history', member)

      // setActive(member);
      setShowHistory(true);
      getMoneyMember({ variables: { user: member} })
  };


  const handleSearchLocation = (searchQuery) => {

    console.log('searchQuery', searchQuery);


    const apiKey = 'AIzaSyAJG1ijs2h0yx0ZCY21m6wlAxuCr398Wco';
// const searchQuery = 'New York City';

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const location = data?.results[0]?.geometry?.location;
    const latitude = location?.lat;
    const longitude = location?.lng;
    // Do something with the latitude and longitude

    console.log(' latitude search', latitude);
    console.log('longitude search', longitude);

    if(latitude){
      setLocation({'lat': latitude, lng: longitude});
    }

    
  })
  .catch(error => {
    console.error(error);
  });

  };

	const handleEditClick = (member) => {
        setActive(member);
        setForm(member);
        setLocation({'lat': member?.location?.coordinates[0], lng: member?.location?.coordinates[1]})
        setShowEdit(true)
    };


    const handleCancelEdit = (member) => {
      setActive({});
      setShowEdit(false)
  };

	const handleBlacklistClick = (member) => {
        setActive(member);
        setShowBlacklist(true)
    };

    const handleDelete = (promotion) => {
        deleteMoneyMember();
        setShowDelete(false);
    };


    const handleUpdate = (promotion) => {
          update();
          setShowEdit(false);
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


      const {data, loading, error} = useQuery(SHOPS_QUERY, {
        fetchPolicy: 'network-only',
        pollInterval: 500,
      });



      const [getMoneyMember, { loading: memberLoading, memberError, memberData }] = useLazyQuery(GET_MONEY_MEMBERSHIP_BY_ID);


      console.log(' memberLoading',  memberLoading);
      console.log(' memberData',  memberData);

      console.log('error', JSON.stringify(error, null, 2));


    const [submit, {data: createData, error: createError}] = useMutation(CREATE_SHOP_MUTATION, {
        variables: {
          name: form.name,
          address: form.address,
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
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

      console.log('submit', )

     

      submit()
      setShow(false)

        // Push all the axios request promise into a single array

        // let urls = [];
        // const uploaders = [...images].map(file => {

        //     const url = 'https://api.cloudinary.com/v1_1/molowehou/upload';
        //   // Initial FormData
        //   const formData = new FormData();
        //   formData.append("file", file);
        //   formData.append('upload_preset', 'y1t423pb');
          
    
        //   return axios.post(url, formData, {
        //     headers: { "X-Requested-With": "XMLHttpRequest" },
        //   }).then(response => {
        //     const data = response.data;
        //     const fileURL = data.secure_url;
        //     urls.push(fileURL)

        //   })
        // });
      
        // // Once all the files are uploaded 
        // axios.all(uploaders).then(() => {
        
        //   setImagesUrls(urls)
      
          

        // });
      }
 




    
     
    


      

      
    

	return (
		<>
			<div className="" style={{padding: '10px'}}>

<h5>Shops</h5>

<div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
     <Button variant="primary" onClick={handleShow}>
Add New Shop
      </Button>

      </div>


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
                <Form.Label>Search By Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>setAddressFilter(e.target.value)}
                />
              </Form.Group>
  
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


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          Add New Shop
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
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name ={'address'}
                onChange={handleChange}
              />
            </Form.Group>


<h6>Location </h6>

         {/* <Form.Group className="mb-3" controlId="">
                <Form.Label>Search Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name ={'title'}
                  onChange={(e)=>handleSearchLocation(e.target.value)}
                />
          </Form.Group> */}


            <div style={{ height: '50vh', width: '100%' }}>


      <GoogleMapReact
        // key={new Date().getTime()}
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


<h6>Location </h6>
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
          <th>Joined</th>
          <th>Name</th>
          <th>Address</th>
          <th></th>
		   

        </tr>
      </thead>
      <tbody>
{data?.shops?.filter(promotion => promotion?.name?.toLowerCase().indexOf(nameFilter?.toLowerCase()) > -1)
.filter(promotion => promotion?.address?.toLowerCase().indexOf(addressFilter?.toLowerCase()) > -1)
.map((member, index)=><tr key ={index}>
<td>{index + 1}</td>
<td>
{moment(parseInt(member.createdAt)).format('DD-MMM-YYYY')}
  </td>
          <td>{member.name}</td>
          <td>{member.address}</td>
          <td>
            
          <Link to={`/shops/${member._id}`} className="btn btn-primary">View </Link>

            {/* <button className='btn btn-primary' onClick={()=> handleHistoryClick(member?.moneyMember?._id)} >View History</button>
             */}
            </td>

            <td>

            
           <button className='btn btn-primary' onClick={()=> handleEditClick(member)} >Edit</button>
             
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

export default connect(mapStateToProps, {})(ShopsPage);
