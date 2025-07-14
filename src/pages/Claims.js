import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

import { format } from "date-fns";
import PageTitle from "../components/titles/PageTitle";
import ErrorMessage from "../components/spinners/ErrorMessage";
import BigLoading from "../components/spinners/Loading";
import Select from "react-select";

const Claims = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy] = useState("name");
  const [sortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState({
    id: 1,
    name: ["policies.policy_number"],
    label: "Policy Number",
  });

  const searchOptions = [
    {
      id: 1,
      name: ["policies.policy_number"],
      label: "Policy Number",
    },
    {
      id: 2,
      name: ["clients.id_number"],
      label: "ID Number",
    },
    {
      id: 3,
      name: ["clients.name", "clients.surname"],
      label: "Policy Holder Name",
    },
  ];

  const fetchData = async () => {
    setError("");
    try {
      const { data, error } = await supabase.from("claims").select(`
    *,
    clients (
      name,
      surname,
      id_number
    ),
          policies (
      policy_number
   
    )
  `);

      if (error) {
        console.error("Error fetching data:", error.message);
        setError({
          message:
            "Error fetching policies, please check your internet and refresh the page",
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
        const sortedData = [...result].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setData(sortedData);
      }

      setLoading(false);
    };

    getData();
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, key) => acc?.[key], obj);
    };

    const filterByFields = (items, fieldPaths, searchQuery) => {
      if (!Array.isArray(items)) return [];
      if (!searchQuery?.trim() || !Array.isArray(fieldPaths)) return items;

      return items.filter((item) => {
        const combinedValue = fieldPaths
          .map((path) => getNestedValue(item, path))
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return combinedValue.includes(searchQuery.toLowerCase());
      });
    };

    setFilteredData(filterByFields(data, searchBy?.name, searchQuery));
  }, [searchQuery, data, searchBy]);

  return (
    <>
      <div className="page">
        <NavBar />

        <PageTitle name={"Claims"} />
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
                    <div className="row">
                      <div className="col-lg-8">
                        {/* <p>Search by Name</p> */}
                        <input
                          className="form-control"
                          type="text"
                          name="s"
                          placeholder={`Search by ${searchBy.label}`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-4">
                        {/* <p>Search by Name</p> */}
                        <Select
                          value={
                            searchBy
                              ? {
                                  value: searchBy.name,
                                  label: searchBy.label,
                                  data: searchBy,
                                }
                              : null
                          }
                          options={searchOptions.map((c) => ({
                            value: c.id,
                            label: `${c.label}`,
                            data: c,
                          }))}
                          onChange={(selected) => setSearchBy(selected.data)}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/newclaim`}
                    style={{ marginBottom: "20px" }}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
                  >
                    New Claim
                  </Link>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <table className="table cart_table shop_table_responsive">
                      <thead>
                        <tr>
                          <th className="product-subtotal">Created</th>
                          <th className="product-subtotal">Policy Number</th>
                          <th className="product-subtotal">Amount</th>
                          <th className="product-subtotal">Policy Holder</th>
                          <th className="product-subtotal">Policy Holder ID</th>
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

                            <th className="product-subtotal">
                              {" "}
                              {item.policies?.policy_number}
                            </th>

                            <th className="product-subtotal">
                              {item?.amount} {item?.currency}
                            </th>

                            <th className="product-subtotal">
                              {item?.clients?.name} {item?.clients?.surname}
                            </th>

                            <th className="product-subtotal">
                              {item?.clients?.id_number}
                            </th>

                            <th className="product-subtotal">{item?.status}</th>

                            <th className="product-subtotal">
                              <Link to={`/claims/${item.id}`}>View</Link>
                            </th>
                            {/* <th className="product-subtotal">
                              <Link to={`/jobs/${item.id}/edit`}>Edit</Link>
                            </th> */}
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

export default Claims;
