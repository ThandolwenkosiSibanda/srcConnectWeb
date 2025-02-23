import React, { useEffect, useState } from "react";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import ProductComponent from "../components/product/ProductComponent";
import FooterPage from "../components/footer/FooterComponent";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";
import ProductTitle from "../components/titles/ProductTitle";

const Product = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

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

  return (
    <>
      <NavBar />
      <ProductTitle name={`${product.name}`} />

      <ProductComponent product={product} />

      <FooterPage />
    </>
  );
};

export default Product;
