import { useEffect, useState } from "react";

import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Customer = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [customer, setCustomer] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSelect = (field, value) => {
  //   setForm((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleImageChange = (e) => {
  //   if (e.target.files) {
  //     setImages(e.target.files);
  //   }
  // };

  // const handleDocChange = (e) => {
  //   if (e.target.files) {
  //     setDocs(e.target.files);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setCustomer(data);
      } catch (error) {
        setError({
          message:
            "Error fetching customer, please check your internet and refresh the page",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("customer_id", id);

      if (error) {
        setError({
          message:
            "Error fetching jobs, please check your internet and refresh the page",
        });
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await fetchJobs();
      if (result) setJobs(result);
    };

    getData();
  }, []);

  return (
    <>
      <NavBar />

      <PageTitle name={"Customer"} />
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
              to={`/customers`}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-arrow-left"></i>Back To Customers
            </Link>
          </div>
          <div
            id="ttm-contactform"
            className="ttm-contactform wrap-form clearfix"
          >
            <div className="row">
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Title</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Title"
                      required="required"
                      name={"title"}
                      value={customer?.title}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Name</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Name"
                      required="required"
                      name={"name"}
                      value={customer?.name}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Surname</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Surname"
                      required="required"
                      name={"surname"}
                      value={customer?.surname}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Phone</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Phone"
                      required="required"
                      name={"phone"}
                      value={customer?.phone}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Email</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Email"
                      required="required"
                      name={"email"}
                      value={customer?.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Comments</h6>
                <label>
                  <span className="text-input">
                    <textarea
                      rows="3"
                      cols="40"
                      type="text"
                      placeholder="Comments"
                      required="required"
                      name={"comments"}
                      value={form?.comments}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Jobs</h6>
                <table className="table cart_table shop_table_responsive">
                  <thead>
                    <tr>
                      <th className="product-subtotal">Created</th>
                      <th className="product-subtotal">VRN</th>
                      <th className="product-subtotal">Make</th>
                      <th className="product-subtotal">Model</th>
                      <th className="product-subtotal">Delivery Time</th>
                      <th className="product-subtotal">Status</th>

                      <th className="product-subtotal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs?.map((item, index) => (
                      <tr key={index}>
                        <th className="product-subtotal">
                          {" "}
                          {format(item.created_at, "dd-MMM-yyyy")}
                        </th>
                        <th className="product-subtotal">
                          {" "}
                          {item.vehicle_registration_number}
                        </th>
                        <th className="product-subtotal">
                          {" "}
                          {item.vehicle_make}
                        </th>

                        <th className="product-subtotal">
                          {item.vehicle_model}
                        </th>

                        <th className="product-subtotal"> {item.phone}</th>
                        <th className="product-subtotal"> {item.status}</th>

                        <th className="product-subtotal">
                          <Link to={`/jobs/${item.id}`}>View</Link>
                        </th>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan="6" className="actions">
                        <div className="coupon">
                          <Link
                            to={`/customers`}
                            className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                          >
                            <i className="ti ti-arrow-left"></i>Back To
                            Customers
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default Customer;
