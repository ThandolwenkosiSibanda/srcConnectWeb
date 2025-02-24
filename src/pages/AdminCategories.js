import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "../utils/supabase";
import { UserContext } from "../context/user";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";

const AdminCategories = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [quickViewModalStatus, setQuickViewModalStatus] = useState("");
  const [activeProduct, setActiveProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setError("");
    try {
      const { data, error } = await supabase.from("categories").select("*");

      console.log("error", error);

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
      console.log("error", error);
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

        setData(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const filterByName = (items, searchQuery) => {
      if (!Array.isArray(items)) return [];

      if (!searchQuery) return items; // Return all items if search query is empty

      return items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    setFilteredData(filterByName(data, searchQuery));
  }, [searchQuery, data]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Admin Categories"} />
        {error && !loading && <ErrorMessage message={error.message} />}

        {loading ? (
          <BigLoading />
        ) : (
          <div className="site-main">
            <section className="cart-section clearfix">
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`/shop`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    <i className="ti ti-arrow-left"></i>Back To Shop
                  </Link>

                  <div className="col-lg-6 col-12 ">
                    <div>
                      {/* <p>Search by Name</p> */}
                      <input
                        className="form-control"
                        type="text"
                        name="s"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/admin_newcategory`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Category
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Created</th>
                          <th className="product-subtotal">Name</th>
                          <th className="product-subtotal">Delivery rate</th>
                          <th className="product-subtotal">Status</th>
                          <th className="product-subtotal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.map((item, index) => (
                          <tr key={index}>
                            <th className="product-subtotal">
                              {" "}
                              {format(item.created_at, "dd-MMM-yyyy")}
                            </th>
                            <th className="product-subtotal"> {item.name}</th>

                            <th className="product-subtotal">
                              {item.delivery_rate}
                            </th>

                            <th className="product-subtotal">{item.status}</th>

                            <th className="product-subtotal">
                              <Link to={`/admin_categories/${item.id}`}>
                                View
                              </Link>
                            </th>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="6" className="actions">
                            <div className="coupon">
                              <Link
                                to={`/shop`}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              >
                                <i className="ti ti-arrow-left"></i>Back To Shop
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <FooterPage />
      </div>
    </>
  );
};

export default AdminCategories;
