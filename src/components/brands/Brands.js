import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const Brands = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("image")
        .limit(20);

      if (error) {
        console.error("Error fetching banners:", error);
      } else {
        setImages(data.map((item) => item.image));
      }
    };

    fetchBrands();
  }, []);

  return (
    <>
      <section
        class="banner-top-section pt-10 res-991-pt-0 clearfix"
        style={{ marginBottom: `20px` }}
      >
        <div class="container">
          <div class="row">
            {images.map((image, index) => (
              <div class="col-sm-6" key={index}>
                <div class="banner-image pt-30">
                  <a href="/html">
                    <img
                      class="img-fluid"
                      src={image}
                      alt=""
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

export default Brands;
