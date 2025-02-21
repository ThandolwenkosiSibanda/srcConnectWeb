import React from 'react';


import { GiShoppingCart } from 'react-icons/gi';
import { PiTruckThin, PiPiggyBankThin} from 'react-icons/pi';
import {BsCurrencyExchange} from 'react-icons/bs';








const SmallBanner = () => {


	return (
		<>

<div className='small-banner-top'>
  <div className='small-banner-top-item'> 

  
    <div> <GiShoppingCart  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>One Stop Shop</h6>
    <p className='small-banner-top-item-text'>Everything a call or click away</p>
    </div>
  </div>

  <div className='small-banner-top-item'> 
    <div><PiTruckThin  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Speedy Delivery</h6>
    <p className='small-banner-top-item-text'>Same day delivery on hundreds of products
</p>
    </div>
  </div>

  <div className='small-banner-top-item'> 
  <div><PiPiggyBankThin  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Competitive Prices</h6>
    <p className='small-banner-top-item-text'>Massive savings on hundreds of products</p>
    </div>
  </div>
  <div className='small-banner-top-item'> 
     <div><BsCurrencyExchange  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Flexible Payment Methods</h6>
    <p className='small-banner-top-item-text'>Everything a call or click away</p>
    </div>
  </div>

</div>

		</>
	);
};



export default SmallBanner;
