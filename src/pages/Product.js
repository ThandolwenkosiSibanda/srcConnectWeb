import React, { useEffect, useState } from "react";
import NavBannerTop from "../components/navBannerTop/NavBannerTop";
import NavBar from "../components/navBar/NavBar";
import ProductComponent from "../components/product/ProductComponent";
import FooterPage from "../components/footer/FooterComponent";
import { useParams } from "react-router";
import { supabase } from "../utils/supabase";
import ProductTitle from "../components/titles/ProductTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";
import CartSuccessModal from "../components/modals/CartSuccessModal";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [product, setProduct] = useState({});
  const [cartModalStatus, setCartModalStatus] = useState("");
  const [cartItem, setCartItem] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) throw new Error("Product ID is missing");

        const { data, error } = await supabase
          .from("products")
          .select("*, category(*)")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <ProductTitle name={`${product.name}`} />
      {error?.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        !error && (
          <ProductComponent
            product={product}
            setCartModalStatus={setCartModalStatus}
            setCartItem={setCartItem}
          />
        )
      )}

      <CartSuccessModal
        modalStatus={cartModalStatus}
        setModalStatus={setCartModalStatus}
        item={cartItem}
      />

      <FooterPage />
    </>
  );
};

export default Product;
