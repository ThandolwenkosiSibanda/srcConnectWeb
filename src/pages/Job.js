import { useEffect, useState } from "react";

import NavBar from "../components/navBar/NavBar";

import FooterPage from "../components/footer/FooterComponent";
import { useNavigate, useParams, useNavigationType } from "react-router";
import { supabase } from "../utils/supabase";
import Select from "react-select";
import DraftEditor from "./DraftEditor";
import { ContentState, EditorState, convertFromHTML } from "draft-js";

import PageTitle from "../components/titles/PageTitle";
import BigLoading from "../components/spinners/Loading";
import ErrorMessage from "../components/spinners/ErrorMessage";

import { format } from "date-fns";

const Job = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({});

  const [diagnosticsReport, setDiagnosticsReport] = useState(() =>
    EditorState.createEmpty()
  );

  const [reportedDefects, setReportedDefects] = useState(() =>
    EditorState.createEmpty()
  );

  const [completedAction, setCompletedAction] = useState(() =>
    EditorState.createEmpty()
  );

  const [complaints, setComplaints] = useState(() => EditorState.createEmpty());

  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const handleBack = () => {
    // Fallback if there's no browser history
    if (navigationType === "POP") {
      navigate("/jobs");
    } else {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSelect = (field, value) => {
  //   setForm((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleImageChange = (e) => {
  //   if (e.target.files) {
  //     setImages(e.target.files);
  //   }
  // };

  // const handleDocChange = (e) => {
  //   if (e.target.files) {
  //     setDocs(e.target.files);
  //   }
  // };

  const getEditorStateFromHTML = (htmlContent) => {
    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*, customer_id(*)")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        const newDiagnosticsReportEditorState = getEditorStateFromHTML(
          data.diagnostics_report || ""
        );
        const newReportedDefectsEditorState = getEditorStateFromHTML(
          data.reported_defects || ""
        );
        const newCompletedActionEditorState = getEditorStateFromHTML(
          data.completed_action || ""
        );
        const newComplaintsEditorState = getEditorStateFromHTML(
          data.complaints || ""
        );

        setDiagnosticsReport(newDiagnosticsReportEditorState);
        setReportedDefects(newReportedDefectsEditorState);
        setCompletedAction(newCompletedActionEditorState);
        setComplaints(newComplaintsEditorState);

        setForm({
          ...form,
          ...data,
          status: { label: `${data?.status}`, value: `${data?.status}` },
        });
      } catch (error) {
        console.log("error", error);
        setError({
          message:
            "Error fetching job, please check your internet and refresh the page",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />

      <PageTitle name={"Job Details"} />
      {error.message && <ErrorMessage message={error.message} />}

      {loading ? (
        <BigLoading />
      ) : (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            {/* <Link
              to={`/jobs/${id}/edit`}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-edit"></i>Edit Job
            </Link> */}
            <button
              onClick={handleBack}
              style={{ marginBottom: "10px" }}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-icon-btn-left ttm-btn-color-skincolor"
            >
              <i className="ti ti-arrow-left"></i> Back
            </button>
          </div>
          <div
            id="ttm-contactform"
            className="ttm-contactform wrap-form clearfix"
          >
            <h5>Customer Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Name</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Unit measuremnet"
                      required="required"
                      name={"customer_name"}
                      value={form?.customer_id?.name}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Surname</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Surname"
                      required="required"
                      name={"customer_surname"}
                      value={form?.customer_id?.surname}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}> Phone</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Customer Surname"
                      required="required"
                      name={"customer_surname"}
                      value={form?.customer_id?.phone}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Email</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Brand"
                      required="required"
                      name={"brand"}
                      value={form?.customer_id?.email}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
            </div>

            <h5>Vehicle Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Registration Number</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Vehicle Registration Number"
                      required="required"
                      name={"vehicle_registration_number"}
                      value={form?.vehicle_registration_number}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Make</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      placeholder="Vehicle Make"
                      required="required"
                      name={"vehicle_make"}
                      value={form?.vehicle_make}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Vehicle Model</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"vehicle_model"}
                      value={form?.vehicle_model}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Vehicle Mileage(KM)</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"vehicle_mileage"}
                      value={form?.vehicle_mileage}
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
            </div>

            <h5>Job Details</h5>
            <div className="row">
              <div className="col-lg-3">
                <label>
                  <h6 style={{ marginTop: "20px" }}>Status</h6>
                  <span className="text-input">
                    <Select
                      value={form?.status}
                      // onChange={(e) => handleSelect("status", e)}
                      // options={[
                      //   { label: "Progress", value: "progress" },
                      //   { label: "Completed", value: "completed" },
                      // ]}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Start Date</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"start_date"}
                      value={
                        form?.start_date
                          ? format(new Date(form.start_date), "dd-MMM-yyyy")
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Expected Time(Hours)</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"expected_time"}
                      value={form?.expected_time}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>
              <div className="col-lg-3">
                <h6 style={{ marginTop: "20px" }}>Time Taken(Hours)</h6>
                <label>
                  <span className="text-input">
                    <input
                      type="text"
                      required="required"
                      name={"actual_time"}
                      value={form?.actual_time}
                      onChange={handleChange}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Diagnostics Report</h6>
                <DraftEditor
                  editorState={diagnosticsReport}
                  setEditorState={setDiagnosticsReport}
                  readOnly={true}
                />
              </div>
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}>Reported Defects</h6>
                <DraftEditor
                  editorState={reportedDefects}
                  setEditorState={setReportedDefects}
                  readOnly={true}
                />
              </div>
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}> Completed Action</h6>
                <DraftEditor
                  editorState={completedAction}
                  setEditorState={setCompletedAction}
                  readOnly={true}
                />
              </div>
              <div className="col-lg-12">
                <h6 style={{ marginTop: "20px" }}> Complaints</h6>
                <DraftEditor
                  editorState={complaints}
                  setEditorState={setComplaints}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
};

export default Job;
