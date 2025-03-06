import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";

import successImage from "./success.png"; // Adjust the filename as needed

const CartSuccessModal = ({ modalStatus, setModalStatus, item }) => {
  const { cartItems, getCartTotal, getCartItemsTotal } =
    useContext(CartContext);
  return (
    <div className={`wrap-modal1 js-modal1 ${modalStatus}`}>
      <div className="overlay-modal1 js-hide-modal1"></div>
      <div className="container">
        <div className="modal1-content">
          <button
            className="close js-hide-modal1"
            onClick={() => setModalStatus("")}
          >
            <i className="fa fa-close"></i>
          </button>
          <div className="row ttm-single-product-details ttm-bgcolor-white">
            <div className="col-lg-12">
              <div
                className="row"
                style={{
                  gap: "20px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    // gap: "10px",
                  }}
                >
                  <img
                    src={successImage}
                    className=""
                    style={{ height: "50px" }}
                    alt=""
                  />{" "}
                  <h6 className="" style={{ paddingTop: "18px" }}>
                    {" "}
                    Successfully Added To Cart
                  </h6>
                </div>

                <Link
                  to={`/shop`}
                  style={{ marginBottom: "20px", backgroundColor: "#ffd200" }}
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                >
                  Continue Shopping
                </Link>
                <Link
                  to={`/shop`}
                  style={{ marginBottom: "20px" }}
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                >
                  Go To Cart
                </Link>
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="row d-flex justify-content-between"
                style={{ borderTop: "1px #e9eef6 solid", padding: "10px" }}
              >
                <img
                  src={
                    item?.images?.length > 0 &&
                    JSON.parse(JSON.stringify(item.images))[0]
                  }
                  className=""
                  style={{ height: "40px" }}
                  alt=""
                />
                <p>{item.name}</p>
                <p>
                  {item.quantity} x ${item.guest_price}
                </p>
              </div>
              <div
                className="row d-flex justify-content-between"
                style={{ borderTop: "1px #e9eef6 solid", padding: "10px" }}
              >
                <p></p>
                <p></p>
                <p>
                  Cart Total : <b>${getCartTotal()?.toFixed(2)}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSuccessModal;
