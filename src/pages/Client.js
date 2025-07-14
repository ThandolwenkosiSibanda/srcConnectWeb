import { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Client = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Main Member Information" },
    { id: "tab2", label: "Next Of Kin Details" },
    { id: "tab3", label: "Policies" },
    { id: "tab4", label: "Subscriptions" },
    { id: "tab5", label: "Claims" },
  ];
  const [form, setForm] = useState({});

  const [policies, setPolicies] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [claims, setClaims] = useState([]);
  // const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch client info
        const { data: clientData, error: clientError } = await supabase
          .from("clients")
          .select("*")
          .eq("id", id)
          .single();

        if (clientError) throw clientError;

        // Set flattened form data
        setForm((prev) => ({
          ...prev,
          ...clientData,
        }));

        // Fetch Policies for this client
        const { data: policiesData, error: policiesError } = await supabase
          .from("policies")
          .select("*")
          .eq("client_id", id);

        if (policiesError) throw policiesError;

        setPolicies(policiesData || []);

        // Fetch subscriptions for this client
        const { data: subscriptionsData, error: subscriptionsError } =
          await supabase
            .from("subscriptions")
            .select("*, policy_id(*)")
            .eq("client_id", id);

        if (subscriptionsError) throw subscriptionsError;

        setSubscriptions(subscriptionsData || []);

        // Fetch subscriptions for this policy
        // const { data: subscriptionsData, error: subscriptionsError } =
        //   await supabase.from("subscriptions").select("*").eq("policy_id", id);

        // if (subscriptionsError) throw subscriptionsError;

        // setSubscriptions(subscriptionsData || []);

        // Fetch subscriptions for this policy
        const { data: claimsData, error: claimsError } = await supabase
          .from("claims")
          .select("*, policy_id(*)")
          .eq("client_id", id);

        if (claimsError) throw claimsError;

        setClaims(claimsData || []);
      } catch (error) {
        console.error("Error fetching policy or beneficiaries:", error);
        setError({
          message:
            "Error fetching policy data. Please check your internet and try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"View Client"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container" style={{ minHeight: "100vh" }}>
          <div
            style={{
              paddingBottom: "100px",
              // marginTop: "20px",
            }}
          >
            <div className="row" style={{ marginBottom: "-1px" }}>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className="col-auto"
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    marginLeft: "15px",
                    borderBottom:
                      activeTab === tab.id
                        ? "2px solid #23513f"
                        : "2px solid transparent",
                    // borderRight: "3px solid #23513f",
                    fontWeight: activeTab === tab.id ? "600" : "400",
                    fontSize: "14px",
                    color: activeTab === tab.id ? "#23513f" : "#555",
                    userSelect: "none",
                    transition: "color 0.3s, border-bottom-color 0.3s",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #23513f", padding: "30px" }}>
              {activeTab === "tab1" && (
                <div>
                  <div id="ttm-contactform" className="wrap-form clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <h5>SECTION A : Cient Information</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <h6 style={{ marginTop: "20px" }}>Region</h6>
                        <label>
                          <span className="text-input">
                            <Select
                              options={[
                                { id: 1, name: "Bulawayo" },
                                { id: 2, name: "Lower Gwelo" },
                                { id: 3, name: "Harare" },
                              ].map((c) => ({
                                value: c.id,
                                label: `${c.name}`,
                                data: c.name,
                              }))}
                              value={
                                form.region
                                  ? {
                                      value: form.region,
                                      label: form.region,
                                      data: form.region,
                                    }
                                  : null
                              }
                              onChange={(selected) =>
                                setForm((prev) => ({
                                  ...prev,
                                  title: selected?.data,
                                  region: selected?.data,
                                }))
                              }
                              placeholder="-"
                              isSearchable={true}
                              isDisabled={true}
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <h6 style={{ marginTop: "20px" }}>Gender</h6>
                        <label>
                          <span className="text-input">
                            <Select
                              options={[
                                { id: 1, name: "male", label: "Male" },
                                { id: 2, name: "female", label: "Female" },
                              ].map((c) => ({
                                value: c.id,
                                label: `${c.label}`,
                                data: c.name,
                              }))}
                              value={
                                form.gender
                                  ? {
                                      value: form.gender,
                                      label: form.gender,
                                      data: form.gender,
                                    }
                                  : null
                              }
                              onChange={(selected) =>
                                setForm((prev) => ({
                                  ...prev,
                                  gender: selected?.data,
                                }))
                              }
                              placeholder="-"
                              isSearchable={true}
                              isDisabled={true}
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-3">
                        <h6 style={{ marginTop: "20px" }}>Title</h6>
                        <label>
                          <span className="text-input">
                            <Select
                              options={[
                                { id: 1, name: "Mr" },
                                { id: 2, name: "Miss" },
                                { id: 3, name: "Mrs" },
                                { id: 4, name: "Doctor" },
                                { id: 5, name: "Prof" },
                                { id: 6, name: "Other" },
                              ].map((c) => ({
                                value: c.id,
                                label: `${c.name}`,
                                data: c.name,
                              }))}
                              value={
                                form.title
                                  ? {
                                      value: form.title,
                                      label: form.title,
                                      data: form.title,
                                    }
                                  : null
                              }
                              onChange={(selected) =>
                                setForm((prev) => ({
                                  ...prev,
                                  title: selected?.data,
                                  alt_title:
                                    selected?.data === "Other"
                                      ? ""
                                      : prev.alt_title,
                                }))
                              }
                              placeholder="-"
                              isSearchable={true}
                              isDisabled={true}
                            />
                          </span>
                        </label>
                      </div>

                      {form.title === "Other" && (
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Title</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                placeholder="Title"
                                required="required"
                                name={"alt_title"}
                                value={form?.alt_title}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>First Name</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"name"}
                              value={form?.name}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Middle Name</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"middle_name"}
                              value={form?.middle_name}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>

                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Last Name</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"surname"}
                              value={form?.surname}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>

                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Date Of Birth</h6>
                        <label>
                          <span className="text-input">
                            <DatePicker
                              selected={form?.dob ? new Date(form.dob) : null}
                              onChange={(date) => handleDateChange("dob", date)}
                              dateFormat="dd-MMM-YYYY"
                              showYearDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={100}
                              showMonthDropdown
                              dropdownMode="select"
                              className="form-control"
                              style={{ zIndex: 1000 }}
                              popperClassName="datepicker-zindex"
                              inputProps={{ readOnly: true }}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>

                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>National ID</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"id_number"}
                              value={form?.id_number}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Passport Number</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"passport_number"}
                              value={form?.passport_number}
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
                              required="required"
                              name={"phone"}
                              value={form?.phone}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Alt. Phone</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              placeholder="-"
                              required="required"
                              name={"alt_phone"}
                              value={form?.alt_phone}
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
                              placeholder="-"
                              required="required"
                              name={"email"}
                              value={form?.email}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>

                      <div className="col-lg-12">
                        <h6 style={{ marginTop: "20px" }}>Address</h6>
                        <label>
                          <span className="text-input">
                            <textarea
                              rows="1"
                              cols="40"
                              type="text"
                              required="required"
                              name={"address"}
                              value={form?.address}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>City</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              placeholder="-"
                              name={"city"}
                              value={form?.city}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "tab2" && (
                <div>
                  <div>
                    <div
                      id="ttm-contactform"
                      className="ttm-contactform wrap-form clearfix"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>Next of Kin Information</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3">
                          <h6 style={{ marginTop: "20px" }}>Title</h6>
                          <label>
                            <span className="text-input">
                              <Select
                                options={[
                                  { id: 1, name: "Mr" },
                                  { id: 2, name: "Miss" },
                                  { id: 3, name: "Mrs" },
                                  { id: 4, name: "Doctor" },
                                  { id: 5, name: "Prof" },
                                  { id: 6, name: "Other" },
                                ].map((c) => ({
                                  value: c.id,
                                  label: `${c.name}`,
                                  data: c.name,
                                }))}
                                value={
                                  form.nok_title === "Other"
                                    ? {
                                        value: form.alt_nok_title,
                                        label: form.alt_nok_title,
                                        data: "Other",
                                      }
                                    : form.nok_title
                                    ? {
                                        value: form.nok_title,
                                        label: form.nok_title,
                                        data: form.nok_title,
                                      }
                                    : null
                                }
                                onChange={(selected) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    nok_title:
                                      selected?.data === "Other"
                                        ? ""
                                        : prev.nok_title,
                                  }))
                                }
                                placeholder="-"
                                isSearchable={true}
                                isDisabled={true}
                              />
                            </span>
                          </label>
                        </div>

                        {form.title === "Other" && (
                          <div className="col-lg-4">
                            <h6 style={{ marginTop: "20px" }}>Title</h6>
                            <label>
                              <span className="text-input">
                                <input
                                  type="text"
                                  placeholder="-"
                                  required="required"
                                  name={"nok_alt_title"}
                                  value={form?.nok_alt_title}
                                  onChange={handleChange}
                                />
                              </span>
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>First Name</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                placeholder="-"
                                required="required"
                                name={"nok_name"}
                                value={form?.nok_name}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Middle Name</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                required="required"
                                name={"nok_middle_name"}
                                value={form?.nok_middle_name}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Last Name</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                placeholder="-"
                                required="required"
                                name={"nok_surname"}
                                value={form?.nok_surname}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>

                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>National ID </h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                required="required"
                                name={"nok_id_number"}
                                value={form?.nok_id_number}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Passport Number</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                required="required"
                                name={"nok_passport_number"}
                                value={form?.nok_passport_number}
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
                                placeholder="-"
                                required="required"
                                name={"nok_phone"}
                                value={form?.nok_phone}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Alt. Phone</h6>
                          <label>
                            <span className="text-input">
                              <input
                                type="text"
                                placeholder="-"
                                required="required"
                                name={"nok_alt_phone"}
                                value={form?.nok_alt_phone}
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
                                placeholder="-"
                                required="required"
                                name={"nok_email"}
                                value={form?.nok_email}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>

                        <div className="col-lg-12">
                          <h6 style={{ marginTop: "20px" }}>Address</h6>
                          <label>
                            <span className="text-input">
                              <textarea
                                rows="1"
                                cols="40"
                                type="text"
                                required="required"
                                name={"nok_address"}
                                value={form?.nok_address}
                                onChange={handleChange}
                                readOnly
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "tab3" && (
                <div>
                  {" "}
                  <div>
                    <div
                      id="ttm-contactform"
                      className="ttm-contactform wrap-form clearfix"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>SECTION C: Policies </h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <table className="table cart_table shop_table_responsive">
                            <thead>
                              <tr>
                                <th className="product-subtotal">Created</th>
                                <th className="product-subtotal">
                                  Policy Number
                                </th>
                                <th className="product-subtotal">Name</th>
                                <th className="product-subtotal">
                                  Payment Frequency
                                </th>
                                <th className="product-subtotal">Status</th>
                                <th className="product-subtotal"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {policies?.map((item, index) => (
                                <tr key={index}>
                                  <th className="product-subtotal">
                                    {" "}
                                    {format(item.created_at, "dd-MMM-yyyy")}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.policy_number}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.policy_name}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.payment_frequency}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.status}
                                  </th>

                                  <th className="product-subtotal">
                                    <Link to={`/policies/${item.id}`}>
                                      View
                                    </Link>
                                  </th>
                                </tr>
                              ))}

                              <tr>
                                <td colSpan="6" className="actions">
                                  <div className="coupon"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tab4" && (
                <div>
                  {" "}
                  <div>
                    <div
                      id="ttm-contactform"
                      className="ttm-contactform wrap-form clearfix"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>SECTION D: Subscriptions</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <table className="table cart_table shop_table_responsive">
                            <thead>
                              <tr>
                                <th className="product-subtotal">Created</th>
                                <th className="product-subtotal">
                                  Policy Number
                                </th>
                                <th className="product-subtotal">Amount</th>
                                <th className="product-subtotal">Platform</th>
                                <th className="product-subtotal">Ref</th>
                                <th className="product-subtotal"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {subscriptions?.map((item, index) => (
                                <tr key={index}>
                                  <th className="product-subtotal">
                                    {" "}
                                    {format(item.created_at, "dd-MMM-yyyy")}
                                  </th>

                                  <th className="product-subtotal">
                                    {item.policy_id.policy_number}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.amount} {item.currency}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.platform}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.ref}
                                  </th>

                                  <th className="product-subtotal">
                                    <Link to={`/payments/${item.id}`}>
                                      View
                                    </Link>
                                  </th>
                                </tr>
                              ))}

                              <tr>
                                <td colSpan="6" className="actions">
                                  <div className="coupon"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tab5" && (
                <div>
                  {" "}
                  <div>
                    <div
                      id="ttm-contactform"
                      className="ttm-contactform wrap-form clearfix"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5>SECTION D: Claims</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <table className="table cart_table shop_table_responsive">
                            <thead>
                              <tr>
                                <th className="product-subtotal">Created</th>
                                <th className="product-subtotal">
                                  Policy Number
                                </th>
                                <th className="product-subtotal">Amount</th>
                                <th className="product-subtotal">Platform</th>
                                <th className="product-subtotal">Ref</th>
                                <th className="product-subtotal">Status</th>
                                <th className="product-subtotal"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {claims?.map((item, index) => (
                                <tr key={index}>
                                  <th className="product-subtotal">
                                    {" "}
                                    {format(item.created_at, "dd-MMM-yyyy")}
                                  </th>

                                  <th className="product-subtotal">
                                    {item.policy_id.policy_number}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.amount} {item.currency}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.platform}
                                  </th>

                                  <th className="product-subtotal">
                                    {" "}
                                    {item.ref}
                                  </th>
                                  <th className="product-subtotal">
                                    {" "}
                                    {item.status}
                                  </th>

                                  <th className="product-subtotal">
                                    <Link to={`/payments/${item.id}`}>
                                      View
                                    </Link>
                                  </th>
                                </tr>
                              ))}

                              <tr>
                                <td colSpan="6" className="actions">
                                  <div className="coupon"></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default Client;
