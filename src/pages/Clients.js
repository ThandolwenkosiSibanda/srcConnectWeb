import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";

const Customers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy] = useState("name");
  const [sortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setError("");
    try {
      const { data, error } = await supabase.from("clients").select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching customers, please check your internet and refresh the page",
        });
        return null;
      }

      return data;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchData();

      if (result) {
        let sortedData = [...result];

        sortedData.sort((a, b) => {
          if (sortBy === "name") {
            return sortOrder === "asc"
              ? a?.name?.localeCompare(b?.name)
              : b?.name?.localeCompare(a?.name);
          } else if (sortBy === "surname") {
            return sortOrder === "asc"
              ? a?.surname?.localeCompare(b?.surname)
              : b?.surname?.localeCompare(a?.surname);
          }

          return 0; // Default return to avoid lint warning
        });

        setData(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const filterByNameAndSurname = (items, searchQuery) => {
      if (!Array.isArray(items)) return [];
      if (!searchQuery?.trim()) return items;

      return items.filter((item) => {
        const fullName = `${item.name ?? ""} ${
          item.surname ?? ""
        }`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      });
    };

    setFilteredData(filterByNameAndSurname(data, searchQuery));
  }, [searchQuery, data]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Clients"} />
        {error && !loading && <ErrorMessage message={error.message} />}

        {loading ? (
          <BigLoading />
        ) : (
          <div className="site-main" style={{ minHeight: "80vh" }}>
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
                    to={`/`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    <i className="ti ti-arrow-left"></i>Back To Home
                  </Link>

                  <div className="col-lg-6 col-12 ">
                    <div>
                      {/* <p>Search by Name</p> */}
                      <input
                        className="form-control"
                        type="text"
                        name="s"
                        placeholder="Search by name and surname"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/newpolicy`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Client And Policy
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Created</th>
                          <th className="product-subtotal">Title</th>
                          <th className="product-subtotal">Name</th>
                          <th className="product-subtotal">Surname</th>
                          <th className="product-subtotal">Phone</th>

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
                            <th className="product-subtotal"> {item.title}</th>
                            <th className="product-subtotal"> {item.name}</th>

                            <th className="product-subtotal">
                              {" "}
                              {item.surname}
                            </th>

                            <th className="product-subtotal"> {item.phone}</th>
                            {/* <th className="product-subtotal"> {item.email}</th> */}

                            {/* <th className="product-subtotal"> {item.status}</th> */}

                            <th className="product-subtotal">
                              <Link to={`/clients/${item.id}`}>View</Link>
                            </th>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="6" className="actions">
                            <div className="coupon">
                              <Link
                                to={`/`}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                              >
                                <i className="ti ti-arrow-left"></i>Back To Home
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

export default Customers;
