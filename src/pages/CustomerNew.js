import React, { useEffect, useState } from "react";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import ProductComponent from "../components/product/ProductComponent";
import FooterPage from "../components/footer/FooterComponent";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import Select from "react-select";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";
import { Link } from "react-router-dom";

const CustomerNew = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    type: { value: "Basic", label: "Basic" },
    featured: { label: "True", value: "True" },
    best_sales: { label: "True", value: "True" },
    lay_by_availability_status: { label: "False", value: "false" },
  });
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [docs, setDocs] = useState([]);
  const [docsUrls, setDocsUrls] = useState([]);

  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [pricingAdditionalInformation, setPricingAdditionalInformation] =
    useState(() => EditorState.createEmpty());

  const [deliveryInformation, setDeliveryInformation] = useState(() =>
    EditorState.createEmpty()
  );

  const [technicalSpecifications, setTechnicalSpecifications] = useState(() =>
    EditorState.createEmpty()
  );

  const [keyFeatures, setKeyFeatures] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error:", error);
      } else {
        setProduct(data);
      }
    };

    fetchData();
  }, [id]);

  const fetchCategories = async (tableName) => {
    try {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching categories, please check your internet and refresh the page",
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
      const result = await fetchCategories("categories");
      if (result) setCategories(result);
    };

    getData();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      const customerData = {
        title: form.title,
        name: form.name,
        surname: form.surname,
        phone: form.phone,
        email: form.email,
        comments: form.comments,
      };

      const { data, error } = await supabase
        .from("customers")
        .insert([customerData]);

      if (error) {
        throw error;
      }

      navigate("/customers");
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

      <PageTitle name={"New Customer"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container" style={{ minHeight: "80vh" }}>
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
              style={{ marginBottom: "20px" }}
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
                      value={form?.title}
                      onChange={handleChange}
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
                      value={form?.name}
                      onChange={handleChange}
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
                      value={form?.surname}
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
              value="Save New Customer"
              onClick={handleSave}
            />
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default CustomerNew;
