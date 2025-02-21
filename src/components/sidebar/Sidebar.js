// import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
// import { PRODUCTS_QUERY } from '../../gql/Query';
import { Link } from "react-router-dom";

import frontImage from "./pro-01-plus.png";
import backImage from "./pro-front-04.png";
import { supabase } from "../../utils/supabase";

const Sidebar = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState({});

  const fetchData = async (tableName) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("featured", true);

      if (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData("products");
      if (result) setProducts(result);
      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      const { data, error } = await supabase
        .from("special_offers")
        .select("image")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching special offer:", error);
      } else {
        setOffer(data); // `data` is already an object
      }
    };

    fetchOffers();
  }, []);

  // const {data: productsData, loading: productsLoading, error: productsError} = useQuery(PRODUCTS_QUERY, {
  //     fetchPolicy: 'network-only',
  //     // pollInterval: 500,
  //   });

  return (
    <>
      <div class="col-lg-3 widget-area sidebar-left">
        <aside class="widget widget-testimonial">
          <div
            class="testimonial_slick_slider"
            data-slick='{"slidesToShow": 1, "slidesToScroll": 1, "arrows":false, "dots":true, "autoplay":true, "infinite":true}'
          >
            <div class="testimonials ttm-testimonial-box-view-style2">
              <div class="testimonial-content">
                <div class="testimonial-avatar">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      flexWrap: "wrap",
                    }}
                  >
                    <p style={{ fontSize: "16px", fontWeight: "400" }}>Great</p>

                    <div
                      class="star-ratings"
                      style={{
                        height: "14px",
                        display: "flex",
                        alignContent: "center",
                        paddingTop: "5px",
                      }}
                    >
                      <ul class="rating">
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: "400" }}>
                      98 Reviews on
                    </p>
                    <div
                      class="star-ratings"
                      style={{
                        height: "14px",
                        display: "flex",
                        alignContent: "center",
                        paddingTop: "5px",
                      }}
                    >
                      <ul class="rating">
                        <li>
                          <i class="fa fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: "400" }}>
                      Trust Pilot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <aside class="widget widget-text">
          <h3 class="widget-title">Special Offers</h3>
          <img
            alt={offer.name}
            loading="lazy"
            src={offer.image}
            style={{ width: "100%" }}
          />
        </aside>
        <aside class="widget products top-rated-products">
          <h3 class="widget-title">Featured Products</h3>
          <ul class="product-list-widget product">
            {products.slice(0, 5).map((product, index) => (
              <li key={index}>
                {/* <a href="/html"><img src={product?.images?.length > 0 && product?.images[0] } alt="" /></a> */}

                <Link to={`/products/${product?.id}`}>
                  <img alt={product.name} loading="lazy" src={frontImage} />
                </Link>

                <div class="product-content-box">
                  <Link
                    className="product-title"
                    to={`/products/${product?._id}`}
                  >
                    <h2>{product.name}</h2>
                  </Link>
                  <span class="price">
                    <span class="product-Price-amount">
                      <span class="product-Price-currencySymbol">$</span>
                      {product?.guestPrice}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
