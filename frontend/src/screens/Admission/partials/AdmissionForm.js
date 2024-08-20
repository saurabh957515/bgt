import moment from "moment";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";

const AdmissionForm = ({ setAdmissionId, setSelected,admissionDetail,setAdmissionDetail }) => {
 
  const { postRoute, editRoute } = useApi();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelected(2);
  };

  const handleAdmission = (name, value) => {
    setAdmissionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="clearfix row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2>Basic Information</h2>
            </div>
            <div className="body">
              {/* Removed the inner form tag */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.name || ""}
                      required="required"
                      onChange={(e) => handleAdmission("name", e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.email || ""}
                       required="required"
                      type="email"
                      onChange={(e) => handleAdmission("email", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contact No</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.contact_no || ""}
                       required="required"
                      type="number"
                      onChange={(e) =>
                        handleAdmission("contact_no", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Alternate No</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.alternate_no || ""}
                       required="required"
                      type="number"
                      onChange={(e) =>
                        handleAdmission("alternate_no", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className={`form-control`}
                      value={admissionDetail?.address || ""}
                      required="required"
                      onChange={(e) =>
                        handleAdmission("address", e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <Flatpickr
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "0.3rem",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "0.5rem",
                      }}
                      value={admissionDetail?.date_of_birth || ""}
                      className="date-picker"
                      onChange={(date) =>
                        handleAdmission(
                          "date_of_birth",
                          moment(date[0]).format("YYYY-MM-DD")
                        )
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="fancy-checkbox">
                      <label>
                        <input
                          onChange={(e) => {
                            handleAdmission(
                              "is_acknowledged",
                              e.target.checked
                            );
                          }}
                          type="checkbox"
                        />
                        <span>Confirmation & acknowledged</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Next & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdmissionForm;
