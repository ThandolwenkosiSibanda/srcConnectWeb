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

const ProductNew = () => {
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

  const [content, setContent] = useState(() => EditorState.createEmpty());

  const types = [
    { value: "Basic", label: "Basic" },
    { value: "Premium", label: "Premium" },
  ];

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

  const getEditorStateFromHTML = (htmlContent) => {
    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, category(*)")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        const newContentEditorState = getEditorStateFromHTML(data.content);
        const newKeyFeaturesEditorState = getEditorStateFromHTML(
          data.key_features
        );
        const newDeliveryInformationEditorState = getEditorStateFromHTML(
          data.delivery_information
        );
        const newTechnicalSpecificationsEditorState = getEditorStateFromHTML(
          data.technical_specifications
        );
        const newPricingAdditionalInforEditorState = getEditorStateFromHTML(
          data.pricing_additional_info
        );

        setEditorState(newContentEditorState);
        setPricingAdditionalInformation(newPricingAdditionalInforEditorState);
        setDeliveryInformation(newDeliveryInformationEditorState);
        setTechnicalSpecifications(newTechnicalSpecificationsEditorState);
        setKeyFeatures(newKeyFeaturesEditorState);

        setForm({
          ...form,
          ...data,
          status: { label: `${data?.status}`, value: `${data?.status}` },
          featured: { label: `${data?.featured}`, value: `${data?.featured}` },
          type: { label: `${data?.type}`, value: `${data?.type}` },
          lay_by_availability_status: {
            label: `${data?.lay_by_availability_status}`,
            value: `${data?.lay_by_availability_status}`,
          },
          category: {
            label: `${data?.category?.name}`,
            value: `${data?.category?.id}`,
          },
          best_sales: {
            label: `${data?.best_sales}`,
            value: `${data?.best_sales}`,
          },
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

  const fetchCategories = async (tableName) => {
    try {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
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

  const handleSaveNewProduct = async () => {
    try {
      setLoading(true);
      setError("");

      let urls = [];
      let docUrls = [];
      const uploadUrl = "https://api.cloudinary.com/v1_1/molowehou/upload";

      // Upload images
      const imageUploaders = [...images].map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "y1t423pb");

        return axios
          .post(uploadUrl, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          })
          .then((response) => {
            const fileURL = response.data.secure_url;
            urls.push(fileURL);
          });
      });

      // Upload documents
      const docUploaders = [...docs].map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "y1t423pb");

        return axios
          .post(uploadUrl, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          })
          .then((response) => {
            const fileURL = response.data.secure_url;
            docUrls.push(fileURL);
          });
      });

      // Wait for all uploads to complete
      await Promise.all([...imageUploaders, ...docUploaders]);

      setImagesUrls(urls);
      setDocsUrls(docUrls);

      handleSaveProduct(urls, docUrls);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (imgUrls, documentsUrls) => {
    try {
      setLoading(true);

      const productData = {
        name: form.name,
        category: form?.category?.id,
        guest_price: form.guest_price,
        brand: form.brand,
        long_description: form.long_description,
        short_description: form.short_description,
        type: form.type.value,
        featured: form.featured.value,
        status: form.status.value,
        best_sales: form.best_sales.value,
        trade_account_price: form.trade_account_price,
        bulk_price: form.bulk_price,
        unit_measurement: form.unit_measurement,
        lay_by_availability_status: form.lay_by_availability_status.value,
        average_delivery_hours: form.average_delivery_hours,
        pricing_additional_info: stateToHTML(
          pricingAdditionalInformation.getCurrentContent()
        ),
        delivery_information: stateToHTML(
          deliveryInformation.getCurrentContent()
        ),
        technical_specifications: stateToHTML(
          technicalSpecifications.getCurrentContent()
        ),
        key_features: stateToHTML(keyFeatures.getCurrentContent()),
        content: stateToHTML(editorState.getCurrentContent()),
      };

      // Conditionally add images if URLs are available
      if (imgUrls && imgUrls.length > 0) {
        productData.images = imgUrls;
      }

      // Conditionally add technical_downloads if URLs are available
      if (documentsUrls && documentsUrls.length > 0) {
        productData.technical_downloads = documentsUrls;
      }

      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      navigate("/admin_products");
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

      <PageTitle name={"Product Update"} />
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
              to={`/admin_products`}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-arrow-left"></i>Back To Products
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
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                      ]}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Layby Status</h6>
                  <span className="text-input">
                    <Select
                      value={form?.lay_by_availability_status}
                      onChange={(e) =>
                        handleSelect("lay_by_availability_status", e)
                      }
                      options={[
                        { label: "True", value: "true" },
                        { label: "False", value: "false" },
                      ]}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Type</h6>
                  <span className="text-input">
                    <Select
                      defaultValue={{ label: "Basic", value: "Basic" }}
                      value={form?.type}
                      onChange={(e) => handleSelect("type", e)}
                      options={types.map((category) => ({
                        label: category.label,
                        value: category.value,
                      }))}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Featured</h6>
                  <span className="text-input">
                    <Select
                      defaultValue={{ label: "True", value: "True" }}
                      value={form?.featured}
                      onChange={(e) => handleSelect("featured", e)}
                      options={[
                        { label: "True", value: "True" },
                        { label: "False", value: "False" },
                      ]}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Category</h6>
                  <span className="text-input">
                    <Select
                      value={form?.category}
                      onChange={(e) => handleSelect("category", e)}
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                        id: category.id,
                      }))}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Best Sales</h6>
                  <span className="text-input">
                    <Select
                      value={form?.best_sales}
                      onChange={(e) => handleSelect("best_sales", e)}
                      options={[
                        { label: "True", value: "true" },
                        { label: "False", value: "false" },
                      ]}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-12">
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
                <h6 style={{ marginTop: "20px" }}>Guest price</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Guest Price"
                      required="required"
                      name={"guest_price"}
                      value={form?.guest_price}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Trade Account Price</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Trade Account Price"
                      required="required"
                      name={"trade_account_price"}
                      value={form?.trade_account_price}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Bulk Price</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Bulk Price"
                      required="required"
                      name={"bulk_price"}
                      value={form?.bulk_price}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Unit Measurement</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Unit measuremnet"
                      required="required"
                      name={"unit_measurement"}
                      value={form?.unit_measurement}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Average Delivery Time</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Average Delivery Hours"
                      required="required"
                      name={"average_delivery_hours"}
                      value={form?.average_delivery_hours}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-4">
                <h6 style={{ marginTop: "20px" }}>Brand</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Brand"
                      required="required"
                      name={"brand"}
                      value={form?.brand}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Description</h6>
                <label>
                  <span className="text-input">
                    <textarea
                      rows="3"
                      cols="40"
                      type="text"
                      placeholder="Short description"
                      required="required"
                      name={"short_description"}
                      value={form?.short_description}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>
                  Pricing Additional Information
                </h6>
                <DraftEditor
                  editorState={pricingAdditionalInformation}
                  setEditorState={setPricingAdditionalInformation}
                />
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Delivery Information</h6>
                <DraftEditor
                  editorState={deliveryInformation}
                  setEditorState={setDeliveryInformation}
                />
              </div>
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Technical Specifications</h6>
                <DraftEditor
                  editorState={technicalSpecifications}
                  setEditorState={setTechnicalSpecifications}
                />
              </div>
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Key Features</h6>
                <DraftEditor
                  editorState={keyFeatures}
                  setEditorState={setKeyFeatures}
                />
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Content</h6>
                <DraftEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div>

              <div className="col-lg-12">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <h6>Old Images</h6>
                <div className="row">
                  {form.images?.map((image, index) => (
                    <div
                      className="col-lg-3"
                      key={index}
                      style={{
                        padding: "4px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={image}
                        style={{ height: "150px" }}
                        alt={"name of the"}
                      />
                    </div>
                  ))}
                </div>
                <h6 style={{ marginTop: "20px" }}>New Images</h6>
                <button
                  style={{ marginBottom: "20px" }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Select Images
                </button>
                <div className="row">
                  {[...images].map((image, index) => (
                    <div
                      className="col-lg-3"
                      key={index}
                      style={{
                        padding: "4px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        style={{ height: "150px" }}
                        alt={"name of the"}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-12" style={{ marginTop: "20px" }}>
                <input
                  type="file"
                  accept="image/*"
                  id="docInput"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleDocChange}
                />

                <h6>Old Technical Downloads</h6>

                <div className="row">
                  {form.technical_downloads?.map((image, index) => (
                    <div
                      className="col-lg-3"
                      key={index}
                      style={{
                        padding: "4px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={image}
                        style={{ height: "130px" }}
                        alt={"name of the"}
                      />
                    </div>
                  ))}
                </div>

                <h6 style={{ marginTop: "20px" }}>New Technical Downloads</h6>
                <button
                  style={{ marginBottom: "20px" }}
                  onClick={() => document.getElementById("docInput").click()}
                >
                  Select Documents
                </button>

                <div className="row">
                  {[...docs].map((image, index) => (
                    <div
                      className="col-lg-3"
                      key={index}
                      style={{
                        padding: "4px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        style={{ height: "130px" }}
                        alt={"name of the"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <input
              style={{ marginBottom: "20px" }}
              name="submit"
              type="submit"
              id="submit"
              className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
              value="Update Product"
              onClick={handleSaveNewProduct}
            />
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default ProductNew;
