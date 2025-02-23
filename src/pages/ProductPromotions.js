import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";

import { supabase } from "../utils/supabase";
import QuickProductView from "../components/modals/QuickProductView";
import PageTitle from "../components/titles/PageTitle";
import ProductsList from "../components/product/ProductsList";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";

const ProductPromotions = () => {
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setError("");
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, category(*)");

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching products, please check your internet and refresh the page",
        });
        return null;
      }

      return data;
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData("products");

      if (result) {
        let sortedData = [...result];

        sortedData.sort((a, b) => {
          if (sortBy === "name") {
            return sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortBy === "guest_price") {
            return sortOrder === "asc"
              ? a.guest_price - b.guest_price
              : b.guest_price - a.guest_price;
          }
        });

        setProducts(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Promotions"} />
        {error.message && !loading && <ErrorMessage message={error.message} />}

        {loading ? (
          <BigLoading />
        ) : (
          <ProductsList
            quickViewModalStatus={quickViewModalStatus}
            setQuickViewModalStatus={setQuickViewModalStatus}
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
            products={products}
            setProducts={setProducts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            loading={loading}
          />
        )}

        <QuickProductView
          quickViewModalStatus={quickViewModalStatus}
          setQuickViewModalStatus={setQuickViewModalStatus}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />

        <FooterPage />
      </div>
    </>
  );
};

export default ProductPromotions;
