import React, { useEffect, useState } from "react";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import ProductComponent from "../components/product/ProductComponent";
import FooterPage from "../components/footer/FooterComponent";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import Select from "react-select";
import DraftEditor from "./DraftEditor";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const AdminOrder = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [order, setOrder] = useState({});
  const [form, setForm] = useState({
    status: { value: "Pending", label: "Pending" },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setForm({
          ...form,
          ...data,
          status: { label: `${data?.status}`, value: `${data?.status}` },
        });
        setOrder(data);
      } catch (error) {
        console.log("error", error);
        setError({
          message:
            "Error fetching order, please check your internet and refresh the page",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
        status: form.status.value,
        // estimated_time_of_delivery: form.estimated_time_of_delivery,
      };

      const { data, error } = await supabase
        .from("orders")
        .update(orderData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      navigate("/admin_orders");
      return { success: true, data };
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"Order Update"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Link
              to={`/admin_orders`}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-arrow-left"></i>Back To Orders
            </Link>
          </div>
          <div
            id="ttm-contactform"
            className="ttm-contactform wrap-form clearfix"
          >
            <div className="row">
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Status</h6>
                  <span className="text-input">
                    <Select
                      value={form?.status}
                      onChange={(e) => handleSelect("status", e)}
                      options={[
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
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Name</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Name"
                      required="required"
                      name={"name"}
                      value={form?.name}
                      onChange={handleChange}
                    />
                  </span>
                </label>
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
                    {order.items &&
                      JSON.parse(order.items)?.map((item, index) => (
                        <tr key={index}>
                          <th className="product-subtotal"> {item?.name}</th>
                          <th className="product-subtotal">
                            {" "}
                            {item?.guest_price}
                          </th>
                          <th className="product-subtotal">
                            {" "}
                            {item?.quantity}
                          </th>
                          <th className="product-subtotal">
                            {" "}
                            {item.quantity + item.guest_price}
                          </th>
                        </tr>
                      ))}
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
                            {order.total_price}
                          </span>
                        </h5>

                        <h5>
                          Delivery
                          <span>${order.delivery_charge}</span>
                        </h5>

                        <h5>
                          Total Cost
                          <span>
                            ${order.total_price + order.delivery_charge}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input
              style={{ marginBottom: "20px" }}
              name="submit"
              type="submit"
              id="submit"
              className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
              value="Update Order"
              onClick={handleSaveOrder}
            />
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default AdminOrder;
