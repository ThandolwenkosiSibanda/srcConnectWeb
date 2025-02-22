import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";

import { supabase } from "../utils/supabase";

const ProductPromotions = () => {
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
        <div className="page">
          <NavBar />

          <div className="ttm-page-title-row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="page-title-heading">
                      <h1 className="title">Promotions</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="site-main">
            <section className="shop-views-section clearfix">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ttm-shop-toolbar-wrapper">
                      <div className="row">
                        <div className="col-md-6 toolbar-left">
                          <div className="nav-tab-wrapper">
                            <ul
                              className="nav nav-tabs"
                              id="myTab"
                              role="tablist"
                            >
                              {/* <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#grid"
                                  role="tab"
                                  aria-selected="true"
                                >
                                  <i className="ti ti-layout-grid2-alt"></i>
                                </a>
                              </li> */}
                              <li className="nav-item">
                                <i className="ti ti-menu-alt"></i>
                              </li>
                            </ul>
                          </div>
                          <form className="products-result-count" method="get">
                            <div className="orderby">
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
                        {/* <div className="col-md-6 toolbar-right">
                          <form
                            className="products-ordering text-right"
                            method="get"
                          >
                            <div className="orderby">
                              <label>Sort by: </label>
                              <select
                                name="orderby"
                                className="select2-hidden-accessible"
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
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade active show"
                        id="grid"
                        role="tabpanel"
                      >
                        <div className="row">
                          {products
                            .slice(
                              (currentPage - 1) * itemsPerpage,
                              currentPage * itemsPerpage
                            )
                            .map((product) => (
                              <div className="product col-md-3 col-sm-6 col-xs-12">
                                <div className="product-box">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src={
                                          product?.images?.length > 0 &&
                                          JSON.parse(
                                            JSON.stringify(product.images)
                                          )[0]
                                        }
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src={
                                          product?.images?.length > 0 &&
                                          JSON.parse(
                                            JSON.stringify(product.images)
                                          )[1]
                                        }
                                        alt=""
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
                      </div>
                      {/* <div className="tab-pane fade" id="list" role="tabpanel">
                        <div className="product-list product res-991-pt-0">
                          {products.slice(0, 100).map((product) => (
                            <div className="product-box">
                              <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-5">
                                  <div className="product-box-inner">
                                    <div className="product-image-box">
                                      <img
                                        className="img-fluid pro-image-front"
                                        src="images/product/pro-front-01.png"
                                        alt=""
                                      />
                                      <img
                                        className="img-fluid pro-image-back"
                                        src="images/product/pro-back-01.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-7">
                                  <div className="product-description">
                                    <div className="product-content-box">
                                      <a
                                        className="product-title"
                                        href="product-layout1.html"
                                      >
                                        <h2>Reel Fiberglass Tape</h2>
                                      </a>
                                      <div className="star-ratings">
                                        <ul className="rating">
                                          <li>
                                            <i className="fa fa-star"></i>
                                          </li>
                                          <li>
                                            <i className="fa fa-star"></i>
                                          </li>
                                          <li>
                                            <i className="fa fa-star-o"></i>
                                          </li>
                                          <li>
                                            <i className="fa fa-star-o"></i>
                                          </li>
                                          <li>
                                            <i className="fa fa-star-o"></i>
                                          </li>
                                        </ul>
                                      </div>
                                      <span className="price">
                                        <span className="product-Price-amount">
                                          <span className="product-Price-currencySymbol">
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
                                        className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-right ttm-btn-color-skincolor mt-15"
                                        href="#"
                                        title=""
                                      >
                                        Add To Cart{" "}
                                        <i className="themifyicon ti-shopping-cart-full"></i>
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

                    {/* <div className="pagination-block res-991-mt-0">
                      <span className="page-numbers current">1</span>
                      <a className="page-numbers" href="#">
                        2
                      </a>
                      <a className="page-numbers" href="#">
                        3
                      </a>
                      <a className="next page-numbers" href="#">
                        <i className="ti ti-arrow-right"></i>
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
                                    src={image}
                                    alt=""
                                  />
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
                                JSON.parse(
                                  JSON.stringify(activeProduct.images)
                                )[0]
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
                            <span className="product-Price-currencySymbol">
                              $
                            </span>
                            {activeProduct.trade_account_price}
                          </span>
                        </ins>
                        <del>
                          <span className="product-Price-amount">
                            <span className="product-Price-currencySymbol">
                              $
                            </span>{" "}
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

export default ProductPromotions;
