import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";

const QuickProductView = ({
  quickViewModalStatus,
  setQuickViewModalStatus,
  activeProduct,
  setActiveProduct,
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const { addToCart } = useContext(CartContext);

  return (
    <div className={`wrap-modal1 js-modal1 ${quickViewModalStatus}`}>
      <div className="overlay-modal1 js-hide-modal1"></div>
      <div className="container">
        <div className="modal1-content">
          <button
            className="close js-hide-modal1"
            onClick={() => setQuickViewModalStatus("")}
          >
            <i className="fa fa-close"></i>
          </button>
          <div className="row ttm-single-product-details ttm-bgcolor-white">
            <div className="col-lg-6 col-md-6 col-sm-12 ml-auto mr-auto">
              <div className="product-gallery easyzoom-product-gallery">
                <div className="product-look-views left">
                  <div className="mt-35 mb-35">
                    <ul
                      className="thumbnails easyzoom-gallery-slider"
                      data-slick='{"slidesToShow": 4, "slidesToScroll": 1, "arrows":true, "infinite":true, "vertical":true}'
                    >
                      {activeProduct?.images?.map((image, index) => (
                        <li>
                          <Link to={`${image}`} data-standard={image}>
                            {image && (
                              <img className="img-fluid" src={image} alt="" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="product-look-preview-plus right">
                  <div className="pl-35 res-767-pl-15">
                    <div className="easyzoom easyzoom-model easyzoom--overlay easyzoom--with-thumbnails">
                      {activeProduct?.images?.length > 0 && (
                        <img
                          className="img-fluid"
                          src={
                            activeProduct?.images?.length > 0 &&
                            JSON.parse(JSON.stringify(activeProduct.images))[0]
                          }
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="summary entry-summary pl-30 res-991-pl-0 res-991-pt-40">
                <h2 className="product_title entry-title">
                  {activeProduct.name}
                </h2>

                <div className="product_in-stock"></div>
                <span className="price">
                  <ins>
                    <span className="product-Price-amount">
                      <span className="product-Price-currencySymbol">$</span>
                      {activeProduct.trade_account_price}
                    </span>
                  </ins>
                  <del>
                    <span className="product-Price-amount">
                      <span className="product-Price-currencySymbol">$</span>{" "}
                      {activeProduct.guest_price}
                    </span>
                  </del>
                </span>
                <div className="product-details__short-description">
                  {activeProduct.shortDescription}
                </div>
                <div className="mt-30 mb-35">
                  <div className="quantity">
                    <label>Quantity: </label>
                    <input
                      type="text"
                      value={quantity}
                      name="quantity-number"
                      className="qty"
                      readOnly
                    />
                    <span
                      className="inc quantity-button"
                      onClick={increaseQuantity}
                    >
                      +
                    </span>
                    <span
                      className="dec quantity-button"
                      onClick={decreaseQuantity}
                    >
                      -
                    </span>
                  </div>
                </div>
                <div className="actions">
                  <div
                    className="add-to-cart"
                    onClick={() => addToCart(activeProduct, quantity)}
                  >
                    <span
                      style={{ cursor: "grab" }}
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
                    >
                      Add to cart
                    </span>
                  </div>
                </div>

                <div id="block-reassurance-1" className="block-reassurance">
                  <h6 style={{ marginTop: "20px" }}>Description</h6>
                  <p>{activeProduct.short_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickProductView;
