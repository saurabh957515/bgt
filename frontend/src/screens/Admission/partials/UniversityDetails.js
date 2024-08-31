import moment from "moment";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import { countries } from "../../../helper";
import ReactSelect from "../../../components/ReactSelect";

const UniversityDetails = ({
  setAdmissionId,
  setSelected,
  universityDetails,
  setUniversityDetails,
  errors,
}) => {
  const { postRoute, editRoute } = useApi();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelected(4);
  };

  const handleUniversity = (name, value) => {
    setUniversityDetails((prev) => ({
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
              <h2>University Information</h2>
            </div>
            <div className="body">
              {/* Removed the inner form tag */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Interested University/Institute Name</label>
                    <input
                      className={`form-control`}
                      value={universityDetails?.institute_name || ""}
                      required="required"
                      onChange={(e) =>
                        handleUniversity("institute_name", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["institute_name"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Course Detail</label>
                    <input
                      className={`form-control`}
                      value={universityDetails?.course_detail || ""}
                      required="required"
                      onChange={(e) =>
                        handleUniversity("course_detail", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["course_detail"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      className={`form-control`}
                      value={universityDetails?.city || ""}
                      required="required"
                      onChange={(e) => handleUniversity("city", e.target.value)}
                    />
                    <p className="mt-2 text-danger">{errors["city"]}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country</label>
                    <ReactSelect
                      options={Object.entries(countries)?.map(
                        ([key, value]) => ({
                          label: value,
                          value: key,
                        })
                      )}
                      value={universityDetails?.country || ""}
                      onChange={(e) => handleUniversity("country", e.value)}
                    />
                    <p className="mt-2 text-danger">{errors["country"]}</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UniversityDetails;
