import { useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";

import Select from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Adjust this value as needed
  }),
};

const PolicyNew = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "Main Member Information" },
    { id: "tab2", label: "Next Of Kin Details" },
    { id: "tab3", label: "Policy Details" },
    { id: "tab4", label: "Beneficiary Details" },
  ];
  const [form, setForm] = useState({});

  console.log("form", form);

  const [beneficiaries, setBeneficiaries] = useState([
    {
      title: "",
      alt_title: "",
      name: "",
      middle_name: "",
      surname: "",
      dob: null,
      id_number: "",
      passport_number: "",
      relationship: "",
    },
  ]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const addBeneficiary = () => {
    if (beneficiaries.length >= 6) return alert("Max 6 beneficiaries");

    if (window.confirm("add new beneficiary?")) {
      setBeneficiaries((prev) => [
        ...prev,
        {
          title: "",
          alt_title: "",
          name: "",
          middle_name: "",
          surname: "",
          dob: null,
          id_number: "",
          passport_number: "",
          relationship: "",
        },
      ]);
    }
  };

  const handleBeneficiaryChange = (index, key, value) => {
    const updated = [...beneficiaries];
    updated[index][key] = value;
    setBeneficiaries(updated);
  };

  const handleDeleteBeneficiary = (indexToDelete) => {
    if (window.confirm("Remove beneficiary?")) {
      setBeneficiaries((prev) => prev.filter((_, i) => i !== indexToDelete));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare data for the transaction
      const clientData = {
        gender: form.gender,
        title: form.title,
        name: form.name,
        middle_name: form?.middle_name,
        surname: form.surname,
        phone: form.phone,
        alt_phone: form?.alt_phone,
        email: form.email,
        dob: form.dob,
        id_number: form.id_number,
        passport_number: form?.passport_number,
        address: form.address,
        city: form.city,
        region: form.region,
        nok_title: form.nok_title,
        nok_name: form.nok_name,
        nok_surname: form.nok_surname,
        nok_middle_name: form?.nok_middle_name,
        nok_phone: form.nok_phone,
        nok_email: form.nok_email,
        nok_id_number: form?.nok_id_number,
        nok_passport_number: form?.nok_passport_number,
        nok_alt_phone: form?.nok_alt_phone,
        nok_address: form?.nok_address,
      };

      const policyData = {
        policy_name: form.policy_name,
        start_date: form.start_date,
        payment_frequency: form.payment_frequency,
      };

      const beneficiariesData = beneficiaries.map((b) => ({
        title: b.title,
        name: b.name,
        surname: b.surname,
        middle_name: b.middle_name,
        dob: b.dob,
        relationship: b.relationship,
        id_number: b.id_number,
        passport_number: b.passport_number,
      }));

      // Execute the transaction
      const { data: newClientId, error } = await supabase.rpc(
        "create_client_with_policy_and_beneficiaries",
        {
          client_data: clientData,
          policy_data: policyData,
          beneficiaries_data: beneficiariesData,
        }
      );

      if (error) throw error;

      navigate(`/policies/${newClientId}`);
      return { success: true };
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err.message || "Failed to save. Please try again.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavBar />

      <PageTitle name={"New Policy And Member"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container" style={{ minHeight: "100vh" }}>
          <div
            style={{
              paddingBottom: "100px",
              marginTop: "20px",
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
                  <div
                    id="ttm-contactform"
                    className="ttm-contactform wrap-form clearfix"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <h5 style={{ marginTop: "20px" }}>
                          SECTION A : Main Member Information
                        </h5>
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
                                  region: selected?.data,
                                }))
                              }
                              placeholder="Select title"
                              isSearchable={true}
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
                              placeholder="Select Gender"
                              isSearchable={true}
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
                              placeholder="Select title"
                              isSearchable={true}
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
                              placeholder="Name"
                              required="required"
                              name={"name"}
                              value={form?.name}
                              onChange={handleChange}
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
                              placeholder="Surname"
                              required="required"
                              name={"surname"}
                              value={form?.surname}
                              onChange={handleChange}
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
                              placeholderText="Select Date of Birth"
                              popperClassName="datepicker-zindex"
                              inputProps={{ readOnly: true }}
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
                              value={form?.phone}
                              onChange={handleChange}
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
                              placeholder="Other Phone"
                              required="required"
                              name={"alt_phone"}
                              value={form?.alt_phone}
                              onChange={handleChange}
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
                              value={form?.email}
                              onChange={handleChange}
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
                              placeholder="City"
                              name={"city"}
                              value={form?.city}
                              onChange={handleChange}
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
                          <h5 style={{ marginTop: "20px" }}>
                            Next of Kin Information
                          </h5>
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
                                  form.nok_title
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
                                    nok_title: selected?.data,
                                  }))
                                }
                                placeholder="Select title"
                                isSearchable={true}
                              />
                            </span>
                          </label>
                        </div>

                        {form.nok_title === "Other" && (
                          <div className="col-lg-4">
                            <h6 style={{ marginTop: "20px" }}>Title</h6>
                            <label>
                              <span className="text-input">
                                <input
                                  type="text"
                                  placeholder="Title"
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
                                placeholder="Name"
                                required="required"
                                name={"nok_name"}
                                value={form?.nok_name}
                                onChange={handleChange}
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
                                placeholder="Surname"
                                required="required"
                                name={"nok_surname"}
                                value={form?.nok_surname}
                                onChange={handleChange}
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
                                name={"nok_phone"}
                                value={form?.nok_phone}
                                onChange={handleChange}
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
                                placeholder="Other Phone"
                                required="required"
                                name={"nok_alt_phone"}
                                value={form?.nok_alt_phone}
                                onChange={handleChange}
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
                                name={"nok_email"}
                                value={form?.nok_email}
                                onChange={handleChange}
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
                          <h5 style={{ marginTop: "20px" }}>
                            SECTION B : Policy
                          </h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <h6 style={{ marginTop: "20px" }}>Policy</h6>
                          <label>
                            <span className="text-input">
                              <Select
                                styles={customStyles}
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
                                  data: c.name,
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
                                    policy_name: selected?.data,
                                  }))
                                }
                                placeholder="Select Policy"
                                isSearchable={true}
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
                                placeholderText="Select Date of Birth"
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
                                styles={customStyles}
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
                                placeholder="Select Payment Frequency"
                                isSearchable={true}
                              />
                            </span>
                          </label>
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
                          <h5 style={{ marginTop: "30px" }}>
                            SECTION C: Beneficiaries Information
                          </h5>
                        </div>
                      </div>

                      {beneficiaries.map((form, index) => (
                        <div key={index} className="row mb-4">
                          <div className="col-lg-1">
                            <span
                              style={{
                                marginLeft: "30px",
                                padding: "10px 20px",
                                borderRadius: "30%",
                                fontSize: "16px",
                                textAlign: "center",
                                width: "70px",
                                height: "40px",
                              }}
                            >
                              {index + 1}.
                            </span>
                          </div>
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="col-lg-3">
                                <h6 style={{ marginTop: "20px" }}>Title</h6>
                                <Select
                                  styles={customStyles}
                                  options={[
                                    { id: 1, name: "Mr" },
                                    { id: 2, name: "Miss" },
                                    { id: 3, name: "Mrs" },
                                    { id: 4, name: "Doctor" },
                                    { id: 5, name: "Prof" },
                                    { id: 6, name: "Other" },
                                  ].map((c) => ({
                                    value: c.id,
                                    label: c.name,
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
                                    handleBeneficiaryChange(
                                      index,
                                      "title",
                                      selected?.data
                                    )
                                  }
                                  placeholder="Select title"
                                  isSearchable
                                />
                              </div>

                              {form.title === "Other" && (
                                <div className="col-lg-4">
                                  <h6 style={{ marginTop: "20px" }}>
                                    Alternative Title
                                  </h6>
                                  <input
                                    type="text"
                                    placeholder="Title"
                                    name="alt_title"
                                    value={form.alt_title}
                                    onChange={(e) =>
                                      handleBeneficiaryChange(
                                        index,
                                        "alt_title",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>

                            <div className="row">
                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  First Name
                                </h6>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  value={form.name}
                                  onChange={(e) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  Middle Name
                                </h6>
                                <input
                                  type="text"
                                  name="middle_name"
                                  value={form.middle_name}
                                  onChange={(e) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "middle_name",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>Last Name</h6>
                                <input
                                  type="text"
                                  placeholder="Surname"
                                  name="surname"
                                  value={form.surname}
                                  onChange={(e) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "surname",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  Date Of Birth
                                </h6>
                                <DatePicker
                                  selected={form.dob}
                                  onChange={(date) =>
                                    handleBeneficiaryChange(index, "dob", date)
                                  }
                                  dateFormat="dd-MMM-yyyy"
                                  showYearDropdown
                                  scrollableYearDropdown
                                  yearDropdownItemNumber={100}
                                  showMonthDropdown
                                  dropdownMode="select"
                                  className="form-control"
                                  placeholderText="Select Date of Birth"
                                  // readOnly
                                />
                              </div>

                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  National ID
                                </h6>
                                <input
                                  type="text"
                                  name="id_number"
                                  value={form.id_number}
                                  onChange={(e) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "id_number",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  Passport Number
                                </h6>
                                <input
                                  type="text"
                                  name="passport_number"
                                  value={form.passport_number}
                                  onChange={(e) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "passport_number",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-lg-4">
                                <h6 style={{ marginTop: "20px" }}>
                                  Relationship to Policy Holder
                                </h6>
                                <Select
                                  styles={customStyles}
                                  options={[
                                    { id: 1, name: "Child" },
                                    { id: 2, name: "Guardian" },
                                    { id: 3, name: "Cousin" },
                                    { id: 4, name: "Brother" },
                                    { id: 5, name: "Sister" },
                                    { id: 6, name: "Other" },
                                  ].map((c) => ({
                                    value: c.id,
                                    label: c.name,
                                    data: c.name,
                                  }))}
                                  value={
                                    form.relationship
                                      ? {
                                          value: form.relationship,
                                          label: form.relationship,
                                          data: form.relationship,
                                        }
                                      : null
                                  }
                                  onChange={(selected) =>
                                    handleBeneficiaryChange(
                                      index,
                                      "relationship",
                                      selected?.data
                                    )
                                  }
                                  placeholder="Select Relationship"
                                  isSearchable
                                />
                              </div>

                              {form.relationship === "Other" && (
                                <div className="col-lg-4">
                                  <h6 style={{ marginTop: "20px" }}>
                                    Alternative Relationship
                                  </h6>
                                  <input
                                    type="text"
                                    name="alt_relationship"
                                    value={form.alt_relationship || ""}
                                    onChange={(e) =>
                                      handleBeneficiaryChange(
                                        index,
                                        "alt_relationship",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-1">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteBeneficiary(index)}
                              disabled={beneficiaries.length === 1}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="col-lg-3 pl-100">
                        <input
                          style={{ marginBottom: "20px" }}
                          name="submit"
                          type="submit"
                          id="submit"
                          className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
                          value="New Beneficiary"
                          onClick={addBeneficiary}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <input
            style={{ marginBottom: "20px" }}
            name="submit"
            type="submit"
            id="submit"
            className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
            value="Save New Client"
            onClick={handleSave}
          />
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default PolicyNew;
