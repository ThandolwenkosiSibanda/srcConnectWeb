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

const AdminBannerNew = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    type: { value: "Basic", label: "Basic" },
    featured: { label: "True", value: "True" },
    best_sales: { label: "True", value: "True" },
  });
  const [images, setImages] = useState({});
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

  const [content, setContent] = useState(() => EditorState.createEmpty());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleDocChange = (e) => {
    if (e.target.files) {
      setDocs(e.target.files);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("categories")
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
        setProduct(data);
      } catch (error) {
        console.log("error", error);
        setError({
          message:
            "Error fetching product, please check your internet and refresh the page",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveNewProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const file = images[0];
      const uploadUrl = "https://api.cloudinary.com/v1_1/molowehou/upload";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "y1t423pb");

      // Upload the single image
      const response = await axios.post(uploadUrl, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      const fileURL = response.data.secure_url;

      handleSaveProduct(fileURL);
    } catch (error) {
      setError("Image upload failed. Please try again.");
      handleSaveProduct();
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (imgUrl) => {
    try {
      setLoading(true);

      const productData = {
        name: form.name,
      };

      // Conditionally add image if URLs are available
      if (imgUrl) {
        productData.image = imgUrl;
      }

      const { data, error } = await supabase
        .from("banners")
        .insert([productData]);

      if (error) {
        throw error;
      }

      navigate("/admin_banners");
      return { success: true, data };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"New Banner"} />
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
              to={`/admin_banners`}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-arrow-left"></i>Back To Banners
            </Link>
          </div>
          <div
            id="ttm-contactform"
            className="ttm-contactform wrap-form clearfix"
          >
            <div className="row">
              {/* <div className="col-lg-4">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Status</h6>
                  <span className="text-input">
                    <Select
                      value={form?.status}
                      onChange={(e) => handleSelect("status", e)}
                      options={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                      ]}
                    />
                  </span>
                </label>
              </div> */}

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

              {/* <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Delivery Rate</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Delivery rate"
                      required="required"
                      name={"delivery_rate"}
                      value={form?.delivery_rate}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div> */}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <h6 style={{ marginTop: "20px" }}>New Image</h6>
                <button
                  style={{ marginBottom: "20px" }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Select Image
                </button>
                <div className="row">
                  <div
                    className="col-lg-3"
                    style={{
                      padding: "4px",
                      borderRadius: "10px",
                    }}
                  >
                    {images?.length > 0 && (
                      <img
                        src={URL.createObjectURL(images[0])}
                        style={{ height: "150px" }}
                        alt="Selected Image"
                      />
                    )}
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
              value="Add New Banner"
              onClick={handleSaveNewProduct}
            />
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default AdminBannerNew;
