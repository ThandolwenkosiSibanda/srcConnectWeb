import React from 'react';
import { Link } from 'react-router-dom';


const NavBannerTop = () => {
	return (
        <div className='nav-banner-top'>
           <p className='nav-banner-top-text'>ISSUE WITH MATERIALS ESTIMATES ? or a SPECIFIC REQUIREMENT? <Link className="link-tag" to={`/plans`}>CLICK HERE AND SEND YOUR QUERY THROUGH</Link> </p>
           <p className='nav-banner-top-text'>CALL /APP NOW: +263 778 091 005 | MON - FRI 7:00AM to 5:00PM</p>
        </div>
	);
};



export default NavBannerTop;
