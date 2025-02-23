import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";

const AdminProducts = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  console.log("data", data);

  const fetchData = async () => {
    setError("");
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category(*)");

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching products, please check your internet and refresh the page",
        });
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData("products");

      if (result) {
        let sortedData = [...result];

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

        setData(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Products"} />
        {error && !loading && <ErrorMessage message={error.message} />}

        {loading ? (
          <BigLoading />
        ) : (
          <div className="site-main">
            <section className="cart-section clearfix">
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`/shop`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    <i className="ti ti-arrow-left"></i>Back To Shop
                  </Link>

                  <Link
                    to={`/newproduct`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Product
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Created</th>
                          <th className="product-subtotal">Name</th>
                          <th className="product-subtotal">Guest Price</th>
                          <th className="product-subtotal">
                            Trade Account Price
                          </th>
                          <th className="product-subtotal">Bulk Price</th>
                          <th className="product-subtotal">Category</th>

                          <th className="product-subtotal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index}>
                            <th className="product-subtotal">
                              {" "}
                              {format(item.created_at, "dd-MMM-yyyy")}
                            </th>
                            <th className="product-subtotal"> {item.name}</th>
                            <th className="product-subtotal">
                              {" "}
                              {item.guest_price}
                            </th>

                            <th className="product-subtotal">
                              {" "}
                              {item.trade_account_price}
                            </th>

                            <th className="product-subtotal">
                              {" "}
                              {item.bulk_price}
                            </th>
                            <th className="product-subtotal">
                              {" "}
                              {item.category?.name}
                            </th>

                            <th className="product-subtotal">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => (
                                  setActiveProduct(item),
                                  setQuickViewModalStatus("show-modal1")
                                )}
                              >
                                View
                              </span>
                            </th>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="6" className="actions">
                            <div className="coupon">
                              <Link
                                to={`/shop`}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              >
                                <i className="ti ti-arrow-left"></i>Back To Shop
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <FooterPage />

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
                <div className="col-lg-12">
                  <div className="summary entry-summary pl-30 res-991-pl-0 res-991-pt-40">
                    <h6 className="">
                      Date:{" "}
                      {activeProduct.created_at &&
                        format(activeProduct.created_at, "dd-MMM-yyyy")}
                    </h6>

                    <div className="mt-30 mb-35">
                      <h6>Query Details</h6>
                    </div>
                    <div className="col-lg-12">
                      <p>{activeProduct.message}</p>

                      <div className="row col-lg-12">
                        {activeProduct?.documents?.map((image, index) => (
                          <div
                            key={index}
                            style={{
                              padding: "4px",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            {image && (
                              <img
                                src={image}
                                alt={image.message}
                                style={{ maxHeight: "400px" }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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

export default AdminProducts;
