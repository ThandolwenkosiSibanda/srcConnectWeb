import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { addToCartAction } from '../../actions/cart';




const ProductListItem = ({product}) => {




  console.log("product", product)


  const [quantity, setQuantity] = useState(1);

  const addToCart = ()=>{
    addToCartAction(product, quantity);

    console.log('add to chart')
  }

  const updateQuantity =(type)=>{
 
    if(type === "Add"){
      setQuantity(quantity + 1)
    } else {

      if(quantity > 1){
        setQuantity(quantity - 1)
      }
      
    }

  }


	return (
		<>
              <div className="product-card" data-product-container-id="1435" data-bulk-discounts-enabled="false">
                <div className="product-card__image">

                
                   <Link to={`/products/${product?._id}`}>
                      <img height="188" alt={product.name} loading="lazy" src={product?.images[0]} />
                   </Link>
                </div>
                <div className="product-card__content">
                      <span className="badge c-products__badge--info">{product?.name}</span>
                      <div className="c-products__stars">
                        <div className="rating-stars"  
                        title="Rating of this product is 5.0 out of 5.">
                        </div>
                      </div>
                      <span className="c-products__stars-count">({product?.reviews?.length})</span>
                      <div className="badge c-products__badge--stock">
                        <span>{product?.availablity}</span>
                      </div>
                      <Link to={`/products/${product?._id}`}>
                        <h3 className="product-card__heading line-clamp" data-text= {product.name}>
                       {product.name}
                        </h3>
                      </Link>
                      
                </div>

                <div className="product-card__footer">
                        <div className="c-products__add-to-cart">
                          <div className="c-products__price l6 s12">
                            <span data-name="display-price">$<span data-adjust-price-with-quantity="false"
                            >{product.tradeAccountPrice}</span></span>
                            <span className="hidden" data-name="saving-tooltip"><span className="tooltip">with bulk discount</span></span>
                          </div>
                          <div className="new_basket_buy_it_now_product" id="new_basket_buy_it_now_product" >
                          
                          <div className="quantity-container" data-product-id="1435" data-quantity-adjustment="basket">
                            <button type="button" className="c-button quantity-button" onClick={()=>updateQuantity('Minus')}><span>&ndash;</span></button>
                            <button type="button" className="c-button quantity-button" ><span>{quantity}</span></button>
                            <button type="button" className="c-button quantity-button" onClick={()=>updateQuantity('Add')}><span>+</span></button>
                          </div>
                          <div className="atb-button">
                            <button onClick={()=>addToCart(product)} name="commit" value="Add to Basket" className="c-button no-variation add-to-basket"  >Add to Basket</button>
                          </div>
                        </div> 
                        </div>
                 </div>
               </div>
		</>
	);
};



export default ProductListItem;
