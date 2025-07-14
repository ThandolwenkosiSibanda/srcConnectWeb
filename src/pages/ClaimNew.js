import { useCallback, useEffect, useState } from "react";

import NavBar from "../components/navBar/NavBar";

import FooterPage from "../components/footer/FooterComponent";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase";
import Select from "react-select";

import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClaimNew = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    currency: { label: "ZAR (Rands)", value: "zar" },
    transaction_date: new Date(),
  });

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = async (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Fetch policies for the selected client
    if (field === "client") {
      setForm((prev) => ({ ...prev, policy: {} }));
      const { data: clientPolicies, error } = await supabase
        .from("policies")
        .select("*")
        .eq("client_id", value.value);

      if (error) {
        console.error("Error fetching client policies:", error?.message);
        setPolicies([]);
      } else {
        setPolicies(clientPolicies || []);
      }
    }
  };

  const handleDateChange = (field, date) => {
    setForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const fetchCustomers = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) throw error;
      setCustomers(data);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError({
        message:
          "Error fetching customers, please check your internet and refresh the page",
      });
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validation
      if (!form?.policy?.value || !form?.client?.value || !form?.amount) {
        throw new Error("Please fill in all required fields.");
      }

      const policy_id = form.policy.value;
      const client_id = form.client.value;

      // Insert new subscription
      const claimsData = {
        policy_id,
        platform: form.platform?.value || null,
        ref: form.ref?.value || null,
        transaction_date: form.transaction_date,
        amount: form.amount,
        currency: form.currency?.value || "USD",
        client_id,
      };

      const { data, error } = await supabase
        .from("claims")
        .insert([claimsData]);

      if (error) throw error;

      navigate("/claims");
      return { success: true, data };
    } catch (err) {
      console.log("err", err);
      setError(err?.message || "An unknown error occurred");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"New Claim"} />
      {error?.message && <ErrorMessage message={error?.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container">
          <div
            id="ttm-contactform"
            className="ttm-contactform wrap-form clearfix"
          >
            <h5>Client Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Select Customer</h6>
                <label>
                  <span className="text-input">
                    <Select
                      options={customers.map((c) => ({
                        value: c.id,
                        label: `${c.name} ${c.surname}`,
                        data: c,
                      }))}
                      onChange={(e) => handleSelect("client", e)}
                      placeholder="Select a customer..."
                      isSearchable={true}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Client Name</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Name"
                      value={form?.client?.data?.name || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Client Surname</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Surname"
                      value={form?.client?.data?.surname || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Client Phone</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Phone"
                      value={form?.client?.data?.phone || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>
            </div>

            <h5>Policy Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Select Policy</h6>
                <label>
                  <span className="text-input">
                    <Select
                      options={policies.map((c) => ({
                        value: c.id,
                        label: `${c.policy_name}`,
                        data: c,
                      }))}
                      value={
                        form.policy
                          ? {
                              value: form.policy?.data?.id,
                              label: form.policy?.data?.policy_name,
                              data: form.policy.data,
                            }
                          : null
                      }
                      // onChange={(selected) =>
                      //   setForm((prev) => ({
                      //     ...prev,
                      //     customer_id: selected.data,
                      //   }))
                      // }

                      onChange={(e) => handleSelect("policy", e)}
                      placeholder="Select a customer..."
                      isSearchable={true}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Policy Number</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Name"
                      value={form.policy?.data?.policy_number || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Policy Name</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Surname"
                      value={form.policy?.data?.policy_name || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Policy Status</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Phone"
                      value={form.policy?.data?.status || ""}
                      readOnly
                    />
                  </span>
                </label>
              </div>
            </div>

            <h5>Payment Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Amount</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"amount"}
                      value={form?.amount || ""}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Currency</h6>
                  <span className="text-input">
                    <Select
                      value={form?.currency}
                      onChange={(e) => handleSelect("currency", e)}
                      options={[
                        { label: "ZAR (Rands)", value: "zar" },
                        { label: "usd (USD)", value: "usd" },
                      ]}
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Transaction Date</h6>
                <label>
                  <span className="text-input">
                    <DatePicker
                      selected={
                        form?.transaction_date
                          ? new Date(form.transaction_date)
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange("transaction_date", date)
                      }
                      dateFormat="dd-MMM-YYYY"
                      className="form-control"
                      style={{ zIndex: 1000 }}
                      placeholderText="Select transaction date"
                      popperClassName="datepicker-zindex"
                    />
                  </span>
                </label>
              </div>
            </div>

            <input
              style={{ marginBottom: "20px" }}
              name="submit"
              type="submit"
              id="submit"
              className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
              value="Save New Claim"
              onClick={handleSave}
            />
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default ClaimNew;
