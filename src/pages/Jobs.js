import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";

const Jobs = () => {
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
      const { data, error } = await supabase.from("jobs").select("*");

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching jobs, please check your internet and refresh the page",
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
          if (sortBy === "vehicle_registration_number") {
            return sortOrder === "asc"
              ? a?.vehicle_registration_number?.localeCompare(
                  b?.vehicle_registration_number
                )
              : b?.vehicle_registration_number?.localeCompare(
                  a?.vehicle_registration_number
                );
          }

          // Add additional sorting logic for other fields if needed here
          return 0; // no sorting if field is not matched
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
        item.vehicle_registration_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    };

    setFilteredData(filterByName(data, searchQuery));
  }, [searchQuery, data]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Jobs"} />
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
                    to={`/shop`}
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
                        placeholder="Search by Vehicle Registration Number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/newjob`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Job
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Created</th>
                          <th className="product-subtotal">VRN</th>
                          <th className="product-subtotal">Make</th>
                          <th className="product-subtotal">Model</th>
                          <th className="product-subtotal">Status</th>

                          <th className="product-subtotal"></th>
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
                            <th className="product-subtotal">
                              {" "}
                              {item.vehicle_registration_number}
                            </th>
                            <th className="product-subtotal">
                              {" "}
                              {item.vehicle_make}
                            </th>

                            <th className="product-subtotal">
                              {item.vehicle_model}
                            </th>
                            {/* <th className="product-subtotal">
                              {format(
                                item.expected_delivery_time,
                                "dd-MMM-yyyy HH:mm"
                              )}
                            </th> */}
                            {/* <th className="product-subtotal">
                              {item.delivery_time &&
                                format(item.delivery_time, "dd-MMM-yyyy")}
                              <br />
                              {item.delivery_time &&
                                format(item.delivery_time, "HH:mm")}
                            </th> */}

                            <th className="product-subtotal"> {item.status}</th>

                            <th className="product-subtotal">
                              <Link to={`/jobs/${item.id}`}>View</Link>
                            </th>
                            <th className="product-subtotal">
                              <Link to={`/jobs/${item.id}/edit`}>Edit</Link>
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

export default Jobs;
