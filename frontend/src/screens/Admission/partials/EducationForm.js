import React, { useEffect, useState } from "react";

const EducationForm = ({
  educationDetails,
  setEducationDetail,
  setSelected,errors
}) => {
  const handleAdmission = (name, value) => {
    setEducationDetail((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelected(3);
  };

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
                      name="highest_qualification"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleAdmission(
                          "highest_qualification",
                          e.target.value
                        );
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["highest_qualification"]}
                    </p>
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
                    />
                    <p className="mt-2 text-danger">
                      {errors["name_of_institute"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mt-4 form-group">
                    <div className="fancy-checkbox">
                      <label>
                        <input
                          checked={educationDetails?.is_employed === 1}
                          onChange={(e) => {
                            handleAdmission(
                              "is_employed",
                              e.target.checked ? 1 : 0
                            );
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
                      name="passing_year"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission("passing_year", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["passing_year"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Percentage/CGPA</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.percentage_cgpa}
                      name="percentage_cgpa"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission("percentage_cgpa", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["percentage_cgpa"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Current Company</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.current_company}
                      name="current_company"
                      required="required"
                      onChange={(e) => {
                        handleAdmission("current_company", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["current_company"]}
                    </p>
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
                    <p className="mt-2 text-danger">
                      {errors["current_designation"]}
                    </p>
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
                    <p className="mt-2 text-danger">
                      {errors["current_monthly_salary"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Total Experience (In Years)</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.total_experience_years}
                      name="total_experience_years"
                      required="required"
                      type="number"
                      onChange={(e) => {
                        handleAdmission(
                          "total_experience_years",
                          e.target.value
                        );
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["total_experience_years"]}
                    </p>
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
                    <p className="mt-2 text-danger">
                      {errors["country_interested"]}
                    </p>
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
                    <p className="mt-2 text-danger">{errors["visa_type"]}</p>
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
                    <p className="mt-2 text-danger">{errors["ielts_score"]}</p>
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
                    <p className="mt-2 text-danger">
                      {errors["past_rejection_country_name"]}
                    </p>
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
                    <p className="mt-2 text-danger">
                      {errors["telecaller_name"]}
                    </p>
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

export default EducationForm;
