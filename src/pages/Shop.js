import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { PRODUCTS_QUERY } from "../gql/Query";
import { useQuery } from "@apollo/client";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";

import frontImage from "./pro-01-plus.png";
import backImage from "./pro-front-04.png";
import { supabase } from "../utils/supabase";

const Shop = () => {
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerpage, setItemsPerpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const fetchData = async (tableName) => {
    try {
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

  const handleChangeCount = (event) => {
    setItemsPerpage(event.target.value);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(products.length / itemsPerpage)) {
      setCurrentPage(page);
    }
  };

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
      <body>
        <div class="page">
          <NavBar />

          <div class="ttm-page-title-row">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="page-title-heading">
                      <h1 class="title">Shop</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="site-main">
            <section class="shop-views-section clearfix">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="ttm-shop-toolbar-wrapper">
                      <div class="row">
                        <div class="col-md-6 toolbar-left">
                          <div class="nav-tab-wrapper">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                              {/* <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  data-toggle="tab"
                                  href="#grid"
                                  role="tab"
                                  aria-selected="true"
                                >
                                  <i class="ti ti-layout-grid2-alt"></i>
                                </a>
                              </li> */}
                              <li class="nav-item">
                                <i class="ti ti-menu-alt"></i>
                              </li>
                            </ul>
                          </div>
                          <form class="products-result-count" method="get">
                            <div class="orderby">
                              <label>Show: </label>
                              <select
                                name="orderby"
                                className="select2-hidden-accessible"
                                value={itemsPerpage}
                                onChange={handleChangeCount}
                              >
                                <option value={10} selected="selected">
                                  10
                                </option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={80}>80</option>
                                <option value={100}>100</option>
                              </select>
                            </div>
                          </form>
                        </div>
                        {/* <div class="col-md-6 toolbar-right">
                          <form
                            class="products-ordering text-right"
                            method="get"
                          >
                            <div class="orderby">
                              <label>Sort by: </label>
                              <select
                                name="orderby"
                                class="select2-hidden-accessible"
                              >
                                <option value="menu_order" selected="selected">
                                  Sales High To low
                                </option>
                                <option value="sortby">
                                  price: low to high
                                </option>
                                <option value="sortby">
                                  price: high to low
                                </option>
                              </select>
                            </div>
                          </form>
                        </div> */}
                      </div>
                    </div>
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade active show"
                        id="grid"
                        role="tabpanel"
                      >
                        <div class="row">
                          {products
                            .slice(
                              (currentPage - 1) * itemsPerpage,
                              currentPage * itemsPerpage
                            )
                            .map((product) => (
                              <div class="product col-md-3 col-sm-6 col-xs-12">
                                <div class="product-box">
                                  <div class="product-box-inner">
                                    <div class="product-image-box">
                                      <img
                                        class="img-fluid pro-image-front"
                                        src={frontImage}
                                        alt=""
                                      />
                                      <img
                                        class="img-fluid pro-image-back"
                                        src={backImage}
                                        alt=""
                                      />
                                    </div>
                                    <div class="product-btn-links-wrapper">
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
                                            quickViewModalStatus ===
                                            "show-modal1"
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
                                  <div class="product-content-box">
                                    <Link
                                      className="product-title"
                                      to={`/products/${product?.id}`}
                                    >
                                      <h2>{product.name}</h2>
                                    </Link>

                                    <span class="price">
                                      <span class="product-Price-amount">
                                        <span class="product-Price-currencySymbol">
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
                      </div>
                      {/* <div class="tab-pane fade" id="list" role="tabpanel">
                        <div class="product-list product res-991-pt-0">
                          {products.slice(0, 100).map((product) => (
                            <div class="product-box">
                              <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5">
                                  <div class="product-box-inner">
                                    <div class="product-image-box">
                                      <img
                                        class="img-fluid pro-image-front"
                                        src="images/product/pro-front-01.png"
                                        alt=""
                                      />
                                      <img
                                        class="img-fluid pro-image-back"
                                        src="images/product/pro-back-01.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-7">
                                  <div class="product-description">
                                    <div class="product-content-box">
                                      <a
                                        class="product-title"
                                        href="product-layout1.html"
                                      >
                                        <h2>Reel Fiberglass Tape</h2>
                                      </a>
                                      <div class="star-ratings">
                                        <ul class="rating">
                                          <li>
                                            <i class="fa fa-star"></i>
                                          </li>
                                          <li>
                                            <i class="fa fa-star"></i>
                                          </li>
                                          <li>
                                            <i class="fa fa-star-o"></i>
                                          </li>
                                          <li>
                                            <i class="fa fa-star-o"></i>
                                          </li>
                                          <li>
                                            <i class="fa fa-star-o"></i>
                                          </li>
                                        </ul>
                                      </div>
                                      <span class="price">
                                        <span class="product-Price-amount">
                                          <span class="product-Price-currencySymbol">
                                            $
                                          </span>
                                          40.00
                                        </span>
                                      </span>
                                      <p>
                                        Contrary to popular belief, Lorem Ipsum
                                        is not simply random text. It has roots
                                        in a piece of looked up one of the more
                                        in classical Virginia, obscure Latin
                                        words.
                                      </p>
                                      <a
                                        class="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-right ttm-btn-color-skincolor mt-15"
                                        href="#"
                                        title=""
                                      >
                                        Add To Cart{" "}
                                        <i class="themifyicon ti-shopping-cart-full"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>

                    {/* <div class="pagination-block res-991-mt-0">
                      <span class="page-numbers current">1</span>
                      <a class="page-numbers" href="#">
                        2
                      </a>
                      <a class="page-numbers" href="#">
                        3
                      </a>
                      <a class="next page-numbers" href="#">
                        <i class="ti ti-arrow-right"></i>
                      </a>
                    </div> */}

                    <div className="pagination-block res-991-mt-0">
                      {/* Previous Button */}
                      {currentPage > 1 && (
                        <a
                          className="prev page-numbers"
                          href="#"
                          onClick={() => goToPage(currentPage - 1)}
                        >
                          <i className="ti ti-arrow-left"></i>
                        </a>
                      )}

                      {/* Page Numbers */}
                      {Array.from(
                        { length: Math.ceil(products.length / itemsPerpage) },
                        (_, i) => i + 1
                      ).map((page) => (
                        <a
                          key={page}
                          href="#"
                          className={`page-numbers ${
                            currentPage === page ? "current" : ""
                          }`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </a>
                      ))}

                      {/* Next Button */}
                      {currentPage <
                        Math.ceil(products.length / itemsPerpage) && (
                        <a
                          className="next page-numbers"
                          href="#"
                          onClick={() => goToPage(currentPage + 1)}
                        >
                          <i className="ti ti-arrow-right"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                                  <img
                                    className="img-fluid"
                                    src={frontImage}
                                    alt=""
                                  />
                                </Link>
                              </li>
                            ))}

                            {/* <li>
                                        <a href="images/product/pro-02-plus.png" data-standard="images/product/pro-02-plus.png">
                                            <img className="img-fluid" src="images/product/pro-02-plus.png" alt="" />
                                        </a>
                                    </li> */}
                          </ul>
                        </div>
                      </div>
                      <div className="product-look-preview-plus right">
                        <div className="pl-35 res-767-pl-15">
                          <div className="easyzoom easyzoom-model easyzoom--overlay easyzoom--with-thumbnails">
                            <a href="images/product/pro-01-plus.png">
                              <img
                                className="img-fluid"
                                src={frontImage}
                                alt=""
                              />
                            </a>
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
                            <span className="product-Price-currencySymbol">
                              $
                            </span>
                            {activeProduct.guest_price}
                          </span>
                        </ins>
                        {/* <del><span className="product-Price-amount">
                                    <span className="product-Price-currencySymbol">$</span>123.00
                                </span>
                            </del> */}
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

                      <div
                        id="block-reassurance-1"
                        className="block-reassurance"
                      >
                        <h6 style={{ marginTop: "20px" }}>Description</h6>
                        <p>{activeProduct.short_description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <FooterPage />
        </div>
      </body>
    </>
  );
};

export default Shop;
