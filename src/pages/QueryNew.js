import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";

import axios from "axios";
import PageTitle from "../components/titles/PageTitle";
import { UserContext } from "../context/user";

const QueryNew = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [form, setForm] = useState({ type: "Basic", featured: "false" });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSaveNewQuery = async () => {
    try {
      setLoading(true);

      let urls = [];
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

      // Wait for all uploads to complete
      await Promise.all([...imageUploaders]);
      handleSaveQuery(urls);
    } catch (error) {
      handleSaveQuery([]);
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveQuery = async (imgUrls) => {
    try {
      setLoading(true);

      const queryData = {
        message: form.message,
        documents: imgUrls,
        user: user.id,
      };

      const { data, error } = await supabase
        .from("queries")
        .insert([queryData]);

      if (error) {
        throw error;
      }

      console.log("Query saved successfully:", data);
      return { success: true, data };
    } catch (err) {
      console.error("Error saving query:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <PageTitle name={"New Query"} />

      <div className="container">
        <div
          id="ttm-contactform"
          className="ttm-contactform wrap-form clearfix"
        >
          <div className="row">
            <div className="col-lg-12">
              <h6 style={{ marginTop: "20px" }}>Message</h6>
              <label>
                <span className="text-input">
                  <textarea
                    rows="3"
                    cols="40"
                    type="text"
                    placeholder="Message"
                    required="required"
                    name={"message"}
                    value={form?.message}
                    onChange={handleChange}
                  />
                </span>
              </label>
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

              <h6>Supporting Documents</h6>
              <button
                style={{ marginBottom: "20px" }}
                onClick={() => document.getElementById("fileInput").click()}
              >
                Select Documents
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
            value="Save New Query"
            onClick={handleSaveNewQuery}
          />
        </div>
      </div>

      <FooterPage />
    </>
  );
};

export default QueryNew;
