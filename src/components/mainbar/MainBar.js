import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS_QUERY } from "../../gql/Query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import frontImage from "./pro-01-plus.png";
import backImage from "./pro-front-04.png";
import { CartContext } from "../../context/cart";
import { supabase } from "../../utils/supabase";

const Mainbar = () => {
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  const fetchData = async (tableName) => {
    try {
      // const { data, error } = await supabase.from(tableName).select("*");
      const { data, error } = await supabase
        .from("products")
        .select(
          `
        *,
        category:categories (
          *
        )
      `
        )
        .eq("status", "active");

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

  // const {data: productsData, loading: productsLoading, error: productsError} = useQuery(PRODUCTS_QUERY, {
  //     fetchPolicy: 'network-only',
  //     // pollInterval: 500,
  //   });

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsTotal,
  } = useContext(CartContext);

  return (
    <>
      <div className="col-lg-9 content-area"></div>
    </>
  );
};

export default Mainbar;
