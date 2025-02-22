import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";

import { supabase } from "../utils/supabase";
import QuickProductView from "../components/modals/QuickProductView";

const NewProducts = () => {
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerpage, setItemsPerpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

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

      // if (result) setProducts(result);

      if (result) {
        let sortedData = [...result];

        // Sorting logic
        sortedData.sort((a, b) => {
          if (sortBy === "name") {
            return sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortBy === "guest_price") {
            return sortOrder === "asc"
              ? a.guest_price - b.guest_price
              : b.guest_price - a.guest_price;
          }
        });

        setProducts(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

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
      <div className="page">
        <NavBar />

        <div
          className="ttm-page-title-row"
          style={{
            backgroundColor: "#ffd200",
            height: "60px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="page-title-heading">
                    <h1 className="title" style={{ color: "#fff" }}>
                      New products
                    </h1>
                  </div>
                  <div className="breadcrumb-wrapper">
                    <span className="mr-1" style={{ color: "#fff" }}>
                      <i className="ti ti-home"></i>
                    </span>
                    <Link to={`/payments`} style={{ color: "#fff" }}>
                      Home
                    </Link>

                    <span className="ttm-bread-sep" style={{ color: "#fff" }}>
                      &nbsp;/&nbsp;
                    </span>
                    <span
                      className="ttm-textcolor-skincolor"
                      style={{ color: "#fff" }}
                    >
                      New Products
                    </span>
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
                            <li className="nav-item">
                              <i className="ti ti-menu-alt"></i>
                            </li>
                          </ul>
                        </div>
                        <div className="products-result-count">
                          <div className="orderby">
                            <label>Show: </label>
                            <select
                              name="orderby"
                              className="select2-hidden-accessible"
                              value={itemsPerpage}
                              onChange={handleChangeCount}
                            >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                              <option value={80}>80</option>
                              <option value={100}>100</option>
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
                              <option value="name_desc">
                                Name: Descending
                              </option>
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
                            (currentPage - 1) * itemsPerpage,
                            currentPage * itemsPerpage
                          )
                          .map((product, index) => (
                            <div
                              key={index}
                              className="product col-md-3 col-sm-6 col-xs-12"
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

        <QuickProductView
          quickViewModalStatus={quickViewModalStatus}
          setQuickViewModalStatus={setQuickViewModalStatus}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />

        {/* Footer */}
        <FooterPage />
      </div>
    </>
  );
};

export default NewProducts;
