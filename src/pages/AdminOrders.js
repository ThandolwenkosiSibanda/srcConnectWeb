import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";
import Select from "react-select";
import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";

const AdminOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({ label: "All", value: "" });

  const handleSelect = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!user?.id) return;

        let query = supabase.from("orders").select("*");

        // Apply filter if a specific status is selected
        if (filter.value) {
          query = query.eq("status", filter.value);
        }

        const { data, error } = await query;

        if (error) throw error;

        setOrders(data);
      } catch (err) {
        console.log("err", err);
        setError({
          message:
            "An error occurred while fetching orders. Please check your internet and refresh the page",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, filter]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Admin Orders"} />
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
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <label>
                    <h6>Filter By Status</h6>
                    <span className="text-input">
                      <Select
                        value={filter}
                        onChange={(e) => handleSelect(e)}
                        options={[
                          { label: "All", value: "" },
                          { label: "Pending", value: "pending" },
                          { label: "Processing", value: "processing" },
                          { label: "En-route", value: "en-route" },
                          { label: "Delivered", value: "delivered" },
                          { label: "Cancelled", value: "cancelled" },
                        ]}
                      />
                    </span>
                  </label>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Date</th>
                          <th className="product-subtotal">Email</th>
                          <th className="product-subtotal">Total Price</th>
                          <th className="product-subtotal">Delivery Cost</th>
                          <th className="product-subtotal">Total Cost</th>
                          <th className="product-subtotal">Status</th>
                          <th className="product-subtotal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.map((item, index) => (
                          <tr key={index}>
                            <th className="product-subtotal">
                              {" "}
                              {format(item.created_at, "dd-MMM-yyyy")}
                            </th>
                            <th className="product-subtotal">{}</th>
                            <th className="product-subtotal">
                              {item.total_price.toFixed(2)}
                            </th>
                            <th className="product-subtotal">
                              {" "}
                              {item.delivery_charge.toFixed(2)}
                            </th>
                            <th className="product-subtotal">
                              {" "}
                              {(
                                item.delivery_charge + item.total_price
                              ).toFixed(2)}
                            </th>

                            <th className="product-subtotal"> {item.status}</th>
                            <th className="product-subtotal">
                              <Link to={`/admin_orders/${item.id}`}>View</Link>
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
                      <h6>Order Details</h6>
                    </div>
                    <div className="col-lg-12">
                      <table className="table cart_table shop_table_responsive">
                        <thead>
                          <tr>
                            <th className="product-subtotal">Name</th>
                            <th className="product-subtotal">Unit Cost</th>
                            <th className="product-subtotal">Quantity</th>
                            <th className="product-subtotal">Total Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeProduct.items &&
                            JSON.parse(activeProduct.items)?.map(
                              (item, index) => (
                                <tr key={index}>
                                  <th className="product-subtotal">
                                    {" "}
                                    {item?.name}
                                  </th>
                                  <th className="product-subtotal">
                                    {" "}
                                    {(item?.guest_price).toFixed(2)}
                                  </th>
                                  <th className="product-subtotal">
                                    {" "}
                                    {(item?.quantity).toFixed(2)}
                                  </th>
                                  <th className="product-subtotal">
                                    {" "}
                                    {(
                                      item.quantity + item.guest_price
                                    )?.toFixed(2)}
                                  </th>
                                </tr>
                              )
                            )}

                          <tr>
                            <td colSpan="6" className="actions">
                              <div className="coupon">
                                <Link
                                  to={`/shop`}
                                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                                >
                                  <i className="ti ti-arrow-left"></i>Back To
                                  Shop
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-lg-12">
                      <div className="cart-collaterals">
                        <div className="row">
                          <div className="col-md-6"></div>

                          <div className="col-md-6">
                            <div className="cart_totals res-767-mt-30">
                              <h5>
                                Total Price
                                <span>
                                  $
                                  {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                  {activeProduct.total_price}
                                </span>
                              </h5>

                              <h5>
                                Delivery
                                <span>
                                  $
                                  {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                  {activeProduct.delivery_charge}
                                </span>
                              </h5>

                              <h5>
                                Total Cost
                                <span>
                                  $
                                  {activeProduct.total_price +
                                    activeProduct.delivery_charge}
                                  {/* {(getCartTotal() + deliveryCharge)?.toFixed(
                                      2
                                    )} */}
                                </span>
                              </h5>
                            </div>
                          </div>
                        </div>
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

export default AdminOrders;
