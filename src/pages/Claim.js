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

const Claim = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Claim Details" },
    { id: "tab2", label: "Client Information" },
    { id: "tab3", label: "Policy Details" },
  ];
  const [form, setForm] = useState({});

  console.log("form", form);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch claim + client info + policy info
        const { data: claimData, error: claimError } = await supabase
          .from("claims")
          .select("*, client_id(*), policy_id(*)")
          .eq("id", id)
          .single();

        if (claimError) throw claimError;

        // Set flattened form data
        setForm((prev) => ({
          ...prev,
          ...claimData,
          ...(claimData.client_id || {}),
          ...(claimData.policy_id || {}),
        }));
      } catch (error) {
        console.error("Error fetching claim:", error);
        setError({
          message:
            "Error fetching claim data. Please check your internet and try again.",
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

      <PageTitle name={"View Claim"} />
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
            <div
              className="row"
              style={{ marginBottom: "-1px", marginTop: "15px" }}
            >
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className="col-auto"
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    marginLeft: "5px",
                    borderBottom:
                      activeTab === tab.id
                        ? "2px solid #23513f"
                        : "1px solid #23513f",
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

            <div style={{ padding: "30px" }}>
              {activeTab === "tab1" && (
                <div>
                  <div id="ttm-contactform" className="wrap-form clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <h5>Claim Information</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Status</h6>
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
                                form.status
                                  ? {
                                      value: form.status,
                                      label: form.status,
                                      data: form.status,
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

                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Transaction Date</h6>
                        <label>
                          <span className="text-input">
                            <DatePicker
                              selected={
                                form?.transaction_date
                                  ? new Date(form.transaction_date)
                                  : null
                              }
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
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Amount</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"amount"}
                              value={form?.amount}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Currency</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"middle_name"}
                              value={form?.currency}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Platform</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"surname"}
                              value={form?.platform}
                              onChange={handleChange}
                              readOnly
                            />
                          </span>
                        </label>
                      </div>

                      <div className="col-lg-4">
                        <h6 style={{ marginTop: "20px" }}>Ref</h6>
                        <label>
                          <span className="text-input">
                            <input
                              type="text"
                              required="required"
                              name={"surname"}
                              value={form?.ref}
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
                  <div id="ttm-contactform" className="wrap-form clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <h5>Client Information</h5>
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
                          <h5>Policy information</h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Policy Status</h6>
                          <label>
                            <span className="text-input">
                              <Select
                                options={[
                                  {
                                    id: 1,
                                    name: "Basic Peace Plan – $5/month",
                                    premium: 5,
                                  },
                                  {
                                    id: 2,
                                    name: "Family Comfort Plan – $10/month",
                                    premium: 10,
                                  },
                                  {
                                    id: 3,
                                    name: "Comprehensive Legacy Plan – $15/month",
                                    premium: 15,
                                  },
                                  {
                                    id: 4,
                                    name: "Long Lasting Plan – $20/month",
                                    premium: 20,
                                  },
                                ].map((c) => ({
                                  value: c.id,
                                  label: `${c.name}`,
                                  data: c,
                                }))}
                                value={
                                  form.status
                                    ? {
                                        value: form.status,
                                        label: form.status,
                                        data: form.status,
                                      }
                                    : null
                                }
                                onChange={(selected) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    policy: selected?.data,
                                  }))
                                }
                                placeholder="-"
                                isSearchable={true}
                                isDisabled
                              />
                            </span>
                          </label>
                        </div>

                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Policy</h6>
                          <label>
                            <span className="text-input">
                              <Select
                                options={[
                                  {
                                    id: 1,
                                    name: "Basic Peace Plan – $5/month",
                                    premium: 5,
                                  },
                                  {
                                    id: 2,
                                    name: "Family Comfort Plan – $10/month",
                                    premium: 10,
                                  },
                                  {
                                    id: 3,
                                    name: "Comprehensive Legacy Plan – $15/month",
                                    premium: 15,
                                  },
                                  {
                                    id: 4,
                                    name: "Long Lasting Plan – $20/month",
                                    premium: 20,
                                  },
                                ].map((c) => ({
                                  value: c.id,
                                  label: `${c.name}`,
                                  data: c,
                                }))}
                                value={
                                  form.policy_name
                                    ? {
                                        value: form.policy_name,
                                        label: form.policy_name,
                                        data: form.policy_name,
                                      }
                                    : null
                                }
                                onChange={(selected) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    policy: selected?.data,
                                  }))
                                }
                                placeholder="-"
                                isSearchable={true}
                                isDisabled
                              />
                            </span>
                          </label>
                        </div>

                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Start Date</h6>
                          <label>
                            <span className="text-input">
                              <DatePicker
                                selected={
                                  form?.start_date
                                    ? new Date(form.start_date)
                                    : null
                                }
                                onChange={(date) =>
                                  handleDateChange("start_date", date)
                                }
                                dateFormat="dd-MMM-YYYY"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                showMonthDropdown
                                dropdownMode="select"
                                className="form-control"
                                style={{ zIndex: 1000 }}
                                placeholderText="-"
                                popperClassName="datepicker-zindex"
                                inputProps={{ readOnly: true }}
                              />
                            </span>
                          </label>
                        </div>

                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>
                            Payment Frequency
                          </h6>
                          <label>
                            <span className="text-input">
                              <Select
                                options={[
                                  { id: 1, name: "Monthly" },
                                  { id: 2, name: "Quarterly" },
                                  {
                                    id: 3,
                                    name: "Annual",
                                  },
                                ].map((c) => ({
                                  value: c.id,
                                  label: `${c.name}`,
                                  data: c.name,
                                }))}
                                value={
                                  form.payment_frequency
                                    ? {
                                        value: form.payment_frequency,
                                        label: form.payment_frequency,
                                        data: form.payment_frequency,
                                      }
                                    : null
                                }
                                onChange={(selected) =>
                                  setForm((prev) => ({
                                    ...prev,
                                    payment_frequency: selected?.data,
                                  }))
                                }
                                placeholder="-"
                                isSearchable={true}
                                isDisabled
                              />
                            </span>
                          </label>
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

export default Claim;
