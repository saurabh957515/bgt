import React, { useEffect, useState } from "react";

const EducationForm = ({
  educationDetails,
  setEducationDetail,
  handleSubmit,
}) => {
  const handleAdmission = (name, value) => {
    setEducationDetail((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const { textInput, emailInput, areaInput, submeet } = educationDetails;
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return (
    <form onSubmit={handleSubmit}>
      <div className="clearfix row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2>Education Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Highest Qualification</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.highest_qualification}
                      name="contact_no"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission(
                          "highest_qualification",
                          e.target.value
                        );
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name of Institute</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.name_of_institute}
                      name="name_of_institute"
                      required="required"
                      onChange={(e) => {
                        handleAdmission("name_of_institute", e.target.value);
                      }}
                    ></input>
                    {areaInput === "" && submeet ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mt-4 form-group">
                    <div className="fancy-checkbox">
                      <label>
                        <input
                          value={educationDetails?.is_employed}
                          onChange={(e) => {
                            handleAdmission("is_employed", e.target.checked);
                          }}
                          type="checkbox"
                        />
                        <span>Is Currently Working</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Passing Year</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.passing_year}
                      name="alternate_no"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission("passing_year", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Percentage/CGPA</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.percentage_cgpa}
                      name="percentage_cgpa"
                      type="number"
                      required="required"
                      onChange={(e) => {
                        handleAdmission("percentage_cgpa", e.target.value);
                      }}
                    ></input>
                    {areaInput === "" && submeet ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Current Company</label>
                    <textarea
                      className={`form-control`}
                      value={educationDetails?.current_company}
                      name="current_company"
                      required="required"
                      onChange={(e) => {
                        handleAdmission("current_company", e.target.value);
                      }}
                    ></textarea>
                    {areaInput === "" && submeet ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Current Designation</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.current_designation}
                      name="current_designation"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission("current_designation", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Current Monthly Salary</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.current_monthly_salary}
                      name="current_monthly_salary"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission(
                          "current_monthly_salary",
                          e.target.value
                        );
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Total Experience </label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.total_experience_years}
                      name="alternate_no"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission(
                          "total_experience_years",
                          e.target.value
                        );
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Country Interested</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.country_interested}
                      name="country_interested"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission("country_interested", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Visa Type</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.visa_type}
                      name="visa_type"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission("visa_type", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>IELTS Score</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.ielts_score}
                      name="ielts_score"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission("ielts_score", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Past Rejection Country Name</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.past_rejection_country_name}
                      name="past_rejection_country_name"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission(
                          "past_rejection_country_name",
                          e.target.value
                        );
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>TeleCaller Name</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.telecaller_name}
                      name="telecaller_name"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission("telecaller_name", e.target.value);
                      }}
                    />
                    {submeet && !reg.test(emailInput) ? (
                      <ul
                        className="parsley-errors-list filled"
                        id="parsley-id-29"
                      >
                        <li className="parsley-required">
                          This value is required.
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EducationForm;
