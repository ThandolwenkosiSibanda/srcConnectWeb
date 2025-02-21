import React, { useEffect, useState } from "react";
import "./index.css";
import { supabase } from "../../utils/supabase";

const Banners = () => {
  const [images, setImages] = useState([]);

  console.log("images", images);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("image")
        .limit(2);

      if (error) {
        console.error("Error fetching banners:", error);
      } else {
        setImages(data.map((item) => item.image));
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      <section className="banner-top-section pt-10 res-991-pt-0 clearfix">
        <div className="container">
          <div className="row">
            {images.map((image, index) => (
              <div className="col-sm-6" key={index}>
                <div className="banner-image pt-30">
                  <a href="/html">
                    <img
                      className="img-fluid"
                      src={image}
                      alt={`Banner ${index + 1}`}
                      style={{ height: "300px", width: "100%" }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Banners;
