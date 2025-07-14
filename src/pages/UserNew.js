import { useEffect, useState } from "react";
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

const UserNew = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    { id: "tab1", label: "User Information" },
    { id: "tab2", label: "Permissions" },
  ];
  const [form, setForm] = useState({});
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

  const [permissions, setPermissions] = useState({});
  const [groupedPermissions, setGroupedPermissions] = useState({});

  console.log("Grouped Permissions", groupedPermissions);

  console.log("Permissions", permissions);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch claim + client info + policy info
        const { data: permissionsData, error: permissionsError } =
          await supabase.from("permissions").select("*");

        if (permissionsError) throw permissionsError;

        // Set flattened form data
        // setPermissions(permissionsData);

        const grouped = permissionsData.reduce((acc, item) => {
          if (!acc[item.resource]) {
            acc[item.resource] = [];
          }
          acc[item.resource].push(item);
          return acc;
        }, {});

        setGroupedPermissions(grouped);
      } catch (error) {
        console.error("Error fetching claim:", error);
        setError({
          message:
            "Error fetching data. Please check your internet and try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare data for the transaction
      const clientData = {
        title: form.title,
        name: form.name,
        surname: form.surname,
        phone: form.phone,
        email: form.email,
        dob: form.dob,
        id_number: form.id_number,
        address: form.address,
        city: form.city,
        region: form.region,
        nok_title: form.nok_title,
        nok_name: form.nok_name,
        nok_surname: form.nok_surname,
        nok_phone: form.nok_phone,
      };

      const policyData = {
        policy_name: form.policy?.name,
        start_date: form.start_date,
        payment_frequency: form.payment_frequency,
      };

      const beneficiariesData = beneficiaries.map((b) => ({
        title: b.title,
        name: b.name,
        surname: b.surname,
        dob: b.dob,
        relationship: b.relationship,
        id_number: b.id_number,
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

      navigate(`/customers/${newClientId}`);
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

      <PageTitle name={"New System User"} />
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
                        : "1px solid  #23513f",
                    // borderRight: "3px solid #23513f",
                    fontWeight: activeTab === tab.id ? "600" : "400",
                    fontSize: "16px",
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
                  <div
                    id="ttm-contactform"
                    className="ttm-contactform wrap-form clearfix"
                  >
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
                              onChange={(selected) =>
                                setForm((prev) => ({
                                  ...prev,
                                  title: selected?.data,
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
                  {" "}
                  <div>
                    <div
                      id="ttm-contactform"
                      className="ttm-contactform wrap-form clearfix"
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <h5 style={{ marginTop: "20px" }}>
                            User Permissions
                          </h5>
                        </div>
                      </div>

                      {Object.entries(groupedPermissions).map(
                        ([resourceName, permissions]) => (
                          <div
                            key={resourceName}
                            style={{ marginBottom: "40px" }}
                          >
                            <h5 style={{ marginTop: "30px" }}>
                              {resourceName.toUpperCase()}
                            </h5>

                            {permissions.map((permission, index) => (
                              <div key={permission.id} className="row">
                                {/* Title input */}
                                <div className="col-lg-4">
                                  <label>
                                    <span className="text-input">
                                      <input
                                        type="text"
                                        placeholder={`${permission.action}`}
                                        required
                                        name={`${permission.id}`}
                                        value={permission.alt_title || ""}
                                        onChange={(e) => {
                                          const updated = JSON.parse(
                                            JSON.stringify(groupedPermissions)
                                          );
                                          updated[resourceName][
                                            index
                                          ].alt_title = e.target.value;
                                          setGroupedPermissions(updated);
                                        }}
                                        readOnly
                                      />
                                    </span>
                                  </label>
                                </div>

                                {/* True/False Select for 'allowed' */}
                                <div className="col-lg-4">
                                  <label>
                                    <span className="text-input">
                                      <Select
                                        options={[
                                          { value: "true", label: "true" },
                                          { value: "false", label: "false" },
                                        ]}
                                        value={
                                          typeof permission.allowed !==
                                          "undefined"
                                            ? {
                                                value: String(
                                                  permission.allowed
                                                ),
                                                label: String(
                                                  permission.allowed
                                                ),
                                              }
                                            : null
                                        }
                                        onChange={(selected) => {
                                          const updated = JSON.parse(
                                            JSON.stringify(groupedPermissions)
                                          );
                                          updated[resourceName][index].allowed =
                                            selected?.value;
                                          setGroupedPermissions(updated);
                                        }}
                                        placeholder="Select"
                                        isSearchable
                                      />
                                    </span>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      )}

                      {/* <div>
                        <h6 style={{ marginTop: "20px" }}>Policy Name</h6>

                        <div className="row">
                          <div className="col-lg-4">
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

                          <div className="col-lg-4">
                            <label>
                              <span className="text-input">
                                <Select
                                  options={[
                                    { id: 1, name: "true" },
                                    { id: 2, name: "false" },
                                  ].map((c) => ({
                                    value: c.id,
                                    label: `${c.name}`,
                                    data: c.name,
                                  }))}
                                  onChange={(selected) =>
                                    setForm((prev) => ({
                                      ...prev,
                                      payment_frequency: selected?.data,
                                    }))
                                  }
                                  placeholder="Select"
                                  isSearchable={true}
                                />
                              </span>
                            </label>
                          </div>
                        </div>
                      </div> */}
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
            value="Save New System User"
            onClick={handleSave}
          />
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default UserNew;
