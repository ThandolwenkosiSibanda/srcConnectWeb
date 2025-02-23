import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";

const ProductsList = ({
  quickViewModalStatus,
  setQuickViewModalStatus,
  activeProduct,
  setActiveProduct,
  products,
  setProducts,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  loading,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "name_asc") {
      setSortBy("name");
      setSortOrder("asc");
    } else if (value === "name_desc") {
      setSortBy("name");
      setSortOrder("desc");
    } else if (value === "price_asc") {
      setSortBy("guest_price");
      setSortOrder("asc");
    } else if (value === "price_desc") {
      setSortBy("guest_price");
      setSortOrder("desc");
    }
  };

  const handleChangeCount = (event) => {
    setItemsPerPage(event.target.value);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className="site-main">
        <section className="shop-views-section clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ttm-shop-toolbar-wrapper">
                  <div className="row">
                    <div className="col-md-6 toolbar-left">
                      {/* <div className="nav-tab-wrapper">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item">
                            <i className="ti ti-menu-alt"></i>
                          </li>
                        </ul>
                      </div> */}
                      <div className="products-result-count">
                        <div className="orderby">
                          <label>Show: </label>
                          <select
                            name="orderby"
                            className="select2-hidden-accessible"
                            value={itemsPerPage}
                            onChange={handleChangeCount}
                          >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={60}>60</option>
                            <option value={120}>120</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 toolbar-right">
                      <div className="products-ordering text-right">
                        <div className="orderby">
                          <label>Sort by: </label>
                          <select
                            name="orderby"
                            className="select2-hidden-accessible"
                            onChange={handleSortChange}
                          >
                            <option value="name_asc">Name: Ascending</option>
                            <option value="name_desc">Name: Descending</option>
                            <option value="price_asc">
                              Price: Low to High
                            </option>
                            <option value="price_desc">
                              Price: High to Low
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((product, index) => (
                          <div
                            key={index}
                            className="product col-xs-12 col-sm-12 col-md-3  "
                          >
                            <div className="product-box">
                              <div className="product-box-inner">
                                <div className="product-image-box">
                                  {product?.images?.length > 0 && (
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
                                  )}
                                  {product?.images?.length > 1 && (
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
                                  )}
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
                  </div>
                </div>

                <div className="pagination-block res-991-mt-0">
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

                  {currentPage < Math.ceil(products.length / itemsPerPage) && (
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
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsList;
