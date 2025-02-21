import React, { useContext, useState } from 'react';
import NavBar from '../components/navBar/NavBar';
import FooterPage from '../components/footer/FooterPage';
import { CartContext } from '../context/cart';
import { Link } from 'react-router-dom';
import axios from 'axios';



const  Home= ()=> {


  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, getCartItemsTotal , reduceFromCart} = useContext(CartContext);

  const [distance, setDistance] = useState(null);


  console.log('distance', distance);




  const calculateDistance = async () => {
    const apiKey = 'AIzaSyD4-L8lcDbH2QhHAIZmBufUZ9K3E-7xH9E';
    const origin = '37.7749,-122.4194'; // San Francisco
    const destination = '34.0522,-118.2437'; // Los Angeles

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const result = response.data;
      const distanceInMeters = result.rows[0].elements[0].distance.value;
      setDistance(distanceInMeters);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
   


  return (
    <>

<body>

    
    <div class="page">   
     <NavBar />

        <div class="ttm-page-title-row">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="page-title-heading">
                                <h1 class="title">Cart {console.log(calculateDistance())}</h1>
                            </div>
                           
                        </div>
                    </div>
                </div>  
            </div>                    
        </div>

    
    <div class="site-main">

     
        <section class="cart-section clearfix">
            <div class="container">
           
                <div class="row">
                    <div class="col-lg-12">
                  
                        <table class="table cart_table shop_table_responsive">
                            <thead>
                                <tr>
                                    <th class="product-thumbnail">&nbsp;</th>
                                    <th class="product-name">Product</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Total</th>
                                    <th class="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>


                            {cartItems?.map((item)=>(
                                <tr class="cart_item">
                                <td class="product-thumbnail">
                                    <a href="product-layout1.html">
                                        <img class="img-fluid" src="images/product/pro-front-01.png" alt="product-img" />
                                    </a>
                                </td>
                                <td class="product-name" data-title="Product">
                                    <a href="product-layout1.html">{item.name}</a>
                                    <span>{item.shortDescription}</span>
                                </td>
                                <td class="product-price" data-title="Price">
                                    <span class="Price-amount">
                                        <span class="Price-currencySymbol">$</span>{item.guestPrice}
                                    </span>
                                </td>
                                <td class="product-quantity" data-title="Quantity">
                                    <div class="quantity">
                                        <input type="text" value={item.quantity} name="quantity-number" class="qty"  size="4" />
                                        <span class="inc quantity-button" onClick={()=>addToCart(item)}>+</span>
                                        <span class="dec quantity-button" onClick={()=>reduceFromCart(item)}>-</span>
                                    </div>
                                </td>
                                <td class="product-subtotal" data-title="Total">
                                    <span class="Price-amount">
                                        <span class="Price-currencySymbol">$</span>{item.quantity * item.guestPrice}
                                    </span>
                                </td>
                                <td class="product-remove" onClick={()=>removeFromCart(item)}>
                                   <span class="product-remove-span"> × </span> 
                                </td>
                            </tr>                                       
                                    ))}






                                <tr>
                                    <td colspan="6" class="actions">
                                        <div class="coupon">

                                        <Link to={`/shop`} className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"><i class="ti ti-arrow-left"></i>Back To Shop</Link>
                                            
                                        </div>

                                        <div class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor" onClick={()=>clearCart()}  ><i class="ti ti-close"></i>Clear All</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-12">
                        
                        <div class="cart-collaterals">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="cart_shipping mt-30">
                                        <h5>Calculate Shipping<span class="ti ti-angle-down"></span></h5>
                                        <p class="text-input orderby">
                                            <select><option>United Kingdom (UK)</option>
                                                    <option>Other</option>
                                            </select>
                                        </p>
                                        <p class="text-input"><input type="text" class="input-text zip-code" name="shipping_name" placeholder="Postal Code / Zip" /></p>
                                        <div class="pt-20">
                                            <p class="text-input"><input type="button" class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor" name="update_cart" value="update total" /></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="cart_totals res-767-mt-30">
                                        <h5>Order Summary<span>${getCartTotal()?.toFixed(2)}</span></h5>
                                        <h5>Shipping</h5>
                                        <p class="text-input">
                                            <input type="radio" name="grpShipping" value="Male" Checked />Standard<span>+ $10.00</span>
                                        </p>
                                        <p class="text-input">
                                            <input type="radio" name="grpShipping" value="Female" />Express<span>+ $10.00</span>
                                        </p>
                                        <h5>Total<span>${getCartTotal()?.toFixed(2)}</span></h5>

                                        <div class="payments">
                                            <p>Pay With</p>
                                            <img src="images/supported_card/card-2.png" alt="paypal" />
                                            <img src="images/supported_card/card-3.png" alt="western union" />
                                            <img src="images/supported_card/card-4.png" alt="visa" />
                                         </div>
                                    </div>













                                    <div class="proceed-to-checkout">
                                        <a href="#/" class="checkout-button button">Proceed to checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>


       {/* /*
						Formula

						If distance between City Centre and Destination < 20 Kilo They will charge -100usd
						First 20 Kilometres Is 100usd ,After that in this case  2 Kilo Per Kilometer = costs

						Distance_in_kilo -  = 

      */}

  



    {/* Footer */}
    <FooterPage />
      
        








</div>






</body>


    </>
  )
}

export default Home