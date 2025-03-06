import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS_QUERY } from "../../gql/Query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import frontImage from "./pro-01-plus.png";
import backImage from "./pro-front-04.png";
import { CartContext } from "../../context/cart";
import { supabase } from "../../utils/supabase";

const Mainbar = () => {
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const fetchData = async (tableName) => {
    try {
      // const { data, error } = await supabase.from(tableName).select("*");
      const { data, error } = await supabase
        .from("products")
        .select("*, category(*)");
      if (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData("products");
      if (result) setProducts(result);
      setLoading(false);
    };

    getData();
  }, []);

  // const {data: productsData, loading: productsLoading, error: productsError} = useQuery(PRODUCTS_QUERY, {
  //     fetchPolicy: 'network-only',
  //     // pollInterval: 500,
  //   });

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsTotal,
  } = useContext(CartContext);

  return (
    <>
      <div className="col-lg-9 content-area">
        <div className="products products-fitter">
          <div className="ttm-tabs">
            <div className="content-sec-head-style">
              <div className="content-area-sec-title">
                <h5>Our Top Selling Products</h5>
              </div>
            </div>
            <div className="content-tab">
              <div className="content-inner active">
                <div className="products row">
                  {products
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((product, index) => (
                      <div
                        className="product col-md-3 col-sm-6 col-xs-12"
                        key={index}
                      >
                        <div className="product-box">
                          <div className="product-box-inner">
                            <div className="product-image-box">
                              <img
                                className="img-fluid pro-image-front"
                                src={
                                  product?.images?.length > 0 &&
                                  JSON.parse(JSON.stringify(product.images))[0]
                                }
                                alt={product.name}
                              />
                              <img
                                className="img-fluid pro-image-back"
                                src={
                                  product?.images?.length > 0 &&
                                  JSON.parse(JSON.stringify(product.images))[0]
                                }
                                alt={product.name}
                              />
                            </div>
                            <div className="product-btn-links-wrapper">
                              <div className="product-btn">
                                <div
                                  className="add-to-cart-btn tooltip-top"
                                  data-tooltip="Add To Cart"
                                  onClick={() => addToCart(product, 1)}
                                >
                                  <i className="ti ti-shopping-cart"></i>
                                </div>
                              </div>
                              <div className="product-btn">
                                <div
                                  className="quick-view-btn js-show-modal1 tooltip-top"
                                  data-tooltip="Quick View"
                                  onClick={() =>
                                    quickViewModalStatus === "show-modal1"
                                      ? [
                                          setQuickViewModalStatus(""),
                                          setActiveProduct({}),
                                        ]
                                      : [
                                          setActiveProduct(product),
                                          setQuickViewModalStatus(
                                            "show-modal1"
                                          ),
                                        ]
                                  }
                                >
                                  <i className="ti ti-search"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="product-content-box">
                            <Link
                              className="product-title"
                              to={`/products/${product?.id}`}
                            >
                              <h2>{product.name}</h2>
                            </Link>

                            <span className="price">
                              <span className="product-Price-amount">
                                <span className="product-Price-currencySymbol">
                                  $
                                </span>
                                {product.guest_price}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="col-lg-12">
                  <div className="pagination-block">
                    {currentPage > 1 && (
                      <span
                        className="prev page-numbers"
                        onClick={() => goToPage(currentPage - 1)}
                      >
                        <i className="ti ti-arrow-left"></i>
                      </span>
                    )}

                    {Array.from(
                      { length: Math.ceil(products.length / itemsPerPage) },
                      (_, i) => i + 1
                    ).map((page) => (
                      <span
                        key={page}
                        className={`page-numbers ${
                          currentPage === page ? "current" : ""
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </span>
                    ))}

                    {currentPage <
                      Math.ceil(products.length / itemsPerPage) && (
                      <span
                        className="next page-numbers"
                        onClick={() => goToPage(currentPage + 1)}
                      >
                        <i className="ti ti-arrow-right"></i>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="content-inner">
                <div className="products row"></div>
              </div>

              <div className="content-inner">
                <div className="products row"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="banner-image mb-30 mt-5">
                <a href="/html">
                  <img
                    className="img-fluid"
                    src="images/banner-eight.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="row no-gutters ttm-bgcolor-grey border mb-25">
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="featured-icon-box style3 text-center">
                <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                  <i className="themifyicon ti-shopping-cart"></i>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h5>One Stop Shop</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Everything a call or click away</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="featured-icon-box style3 text-center">
                <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                  <i className="themifyicon ti-truck"></i>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h5>Speedy Delivery</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Same day delivery on hundreds of products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="featured-icon-box style3 text-center">
                <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                  <i className="themifyicon ti-search"></i>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h5>Competitive Prices</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Massive savings on hundreds of products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="featured-icon-box style3 text-center">
                <div className="ttm-icon ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                  <i className="themifyicon ti-comments"></i>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h5>Flexible Payment Methods</h5>
                  </div>
                  <div className="featured-desc">
                    <p>Fexible Payment Methods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                              <img className="img-fluid" src={image} alt="" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="product-look-preview-plus right">
                    <div className="pl-35 res-767-pl-15">
                      <div className="easyzoom easyzoom-model easyzoom--overlay easyzoom--with-thumbnails">
                        <img
                          className="img-fluid"
                          src={
                            activeProduct?.images?.length > 0 &&
                            JSON.parse(JSON.stringify(activeProduct.images))[0]
                          }
                          alt=""
                        />
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
    </>
  );
};

export default Mainbar;
