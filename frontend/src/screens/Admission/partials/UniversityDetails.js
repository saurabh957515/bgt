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
              <h2>Basic Information</h2>
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
