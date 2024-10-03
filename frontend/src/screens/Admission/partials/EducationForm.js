import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../../utils/UseApi";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import RadioGroup from "../../../components/RadioGroup";
import ReactSelect from "../../../components/ReactSelect";
const education_Object = {
  admission_id: "",
  course_details: "",
  passing_year: 2012,
  name_of_institute: "",
  city: "",
  state: "",
  percentage_cgpa: "",
  is_employed: 0,
  current_company: null,
  current_designation: null,
  current_monthly_salary: 0,
  total_experience_years: 0,
  ielts_score: "",
  business_name: null,
  business_type: null,
  business_start_date: null,
  employed_type: "job",
};
const EducationForm = ({
  educationDetails,
  setEducationDetail,
  setSelected,
  genderOptions,
  employedOptions,
  progressCount,
  setIsModalOpen,
}) => {
  const location = useLocation();
  const [admissionId, setAdmissionId] = useState("");
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { postRoute, editRoute, getRoute } = useApi();
  const [editAdmissionId, setEditAdmissionId] = useState(
    location.state?.admissionId
  );
  const [createAdmission, setCreateAdmission] = useState(
    location.state?.makeAdmission
  );
  const handleEducation = (name, value) => {
    const newEducation = { ...educationDetails };
    newEducation[name] = value;

    if (name === "employed_type") {
      if (value === "job") {
        newEducation["business_name"] = null;
        newEducation["business_type"] = null;
        newEducation["business_start_date"] = null;
      } else {
        newEducation["current_designation"] = null;
        newEducation["current_company"] = null;
      }
    }
    setEducationDetail(newEducation);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(
          `api/education/${educationDetails?.id}`,
          educationDetails
        )
      : await postRoute(`api/education`, educationDetails);

    if (errors) {
      setErrors(errors);
    } else {
      setSelected(3);
    }
  };
  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data } = await getRoute(
          "/api/education/filter",
          { admission_id: editAdmissionId },
          false
        );
        const editAdmisson = data[0];
        if (editAdmisson) {
          setEducationDetail({
            id: editAdmisson?.id,
            admission_id: editAdmisson?.admission_id,
            inquiry_id: editAdmisson?.inquiry_id || null,
            course_details: editAdmisson?.course_details,
            passing_year: editAdmisson?.passing_year,
            name_of_institute: editAdmisson?.name_of_institute,
            percentage_cgpa: editAdmisson?.percentage_cgpa,
            is_employed: editAdmisson?.is_employed,
            current_company: editAdmisson?.current_company,
            current_designation: editAdmisson?.current_designation,
            current_monthly_salary: editAdmisson?.current_monthly_salary || 0,
            total_experience_years: editAdmisson?.total_experience_years || 0,
            state: editAdmisson?.state,
            city: editAdmisson?.city,
            // past_rejection_country_name:
            //   editAdmisson?.past_rejection_country_name,
            ielts_score: editAdmisson?.ielts_score,
            business_name: editAdmisson?.business_name,
            business_type: editAdmisson?.business_type,
            business_start_date: editAdmisson?.business_start_date,
            employed_type: editAdmisson?.employed_type,
            // gender: editAdmisson?.gender,
            // place_of_birth: editAdmisson?.place_of_birth,
            // current_nationality: editAdmisson?.current_nationality,
          });
          setIsEdit(true);
        } else {
          setEducationDetail({
            ...education_Object,
            admission_id: admissionId,
            inquiry_id: createAdmission?.id,
          });
        }
      } else {
        if (createAdmission) {
          setEducationDetail({
            ...education_Object,
            admission_id: admissionId,
            inquiry_id: createAdmission?.id,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission, admissionId]);

  // useEffect(() => {
  //   if (!admissionId) {
  //     const getEducation = async () => {
  //       const { data, errors } = await getRoute(
  //         "/api/admission/filter",
  //         { inquiry_id: createAdmission?.id },
  //         false
  //       );
  //       if (!errors && data?.length === 1) {
  //         setAdmissionId(data[0]?.id);
  //       }
  //     };
  //     getEducation();
  //   }
  // }, [admissionId]);

  useEffect(() => {
    const getAdmission = async () => {
      if (!editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/admission/filter",
          { inquiry_id: createAdmission?.id },
          false
        );
        if (!errors && data?.length === 1) {
          setAdmissionId(data[0]?.id);
          setEditAdmissionId(data[0]?.id);
        }
      }
    };
    getAdmission();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="clearfix row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2 className=" font-weight-bold">
                Current Education Information
              </h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label> Institution Name</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.name_of_institute}
                      name="name_of_institute"
                      required="required"
                      onChange={(e) => {
                        handleEducation("name_of_institute", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["name_of_institute"]}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Course Details</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.course_details}
                      name="course_details"
                      required="required"
                      type="text"
                      onChange={(e) => {
                        handleEducation("course_details", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["course_details"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.city}
                      name="city"
                      required="required"
                      onChange={(e) => {
                        handleEducation("city", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["city"]}</p>
                  </div>
                </div>{" "}
                <div className="col-md-4">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      className={`form-control`}
                      value={educationDetails?.state}
                      name="state"
                      required="required"
                      onChange={(e) => {
                        handleEducation("state", e.target.value);
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["state"]}</p>
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
                      max={2024}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[0-9]*$/.test(value)) {
                          handleEducation("passing_year", value.slice(0, 4));
                        }
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
                        const value = e.target.value;
                        if (/^\+?[0-9]*$/.test(value)) {
                          handleEducation("percentage_cgpa", value.slice(0, 4));
                        }
                      }}
                    />
                    <p className="mt-2 text-danger">
                      {errors["percentage_cgpa"]}
                    </p>
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
                      type="number"
                      maxLength="4"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[0-9]*$/.test(value)) {
                          handleEducation("ielts_score", value.slice(0, 4));
                        }
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["ielts_score"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className=" form-group">
                    <label>Employed Type</label>
                    <ReactSelect
                      options={[
                        { label: "Working", value: 1 },
                        {
                          label: "Not Working",
                          value: 0,
                        },
                      ]}
                      required
                      value={educationDetails?.is_employed}
                      onChange={(e) => {
                        handleEducation("is_employed", e.value);
                      }}
                    />{" "}
                  </div>
                </div>
                {educationDetails?.is_employed ? (
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Employed Type</label>
                      <ReactSelect
                        options={employedOptions}
                        required
                        value={educationDetails?.employed_type || ""}
                        onChange={(e) => {
                          handleEducation("employed_type", e.value);
                        }}
                      />{" "}
                      <p className="mt-2 text-danger">
                        {errors["employed_type"]}
                      </p>
                    </div>
                  </div>
                ) : null}
                {educationDetails?.is_employed ? (
                  educationDetails?.employed_type === "job" ? (
                    <>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Current Company</label>
                          <input
                            className={`form-control`}
                            value={educationDetails?.current_company}
                            name="current_company"
                            required="required"
                            onChange={(e) => {
                              handleEducation(
                                "current_company",
                                e.target.value
                              );
                            }}
                          />
                          <p className="mt-2 text-danger">
                            {errors["current_company"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Current Designation</label>
                          <input
                            className={`form-control`}
                            value={educationDetails?.current_designation}
                            name="current_designation"
                            required="required"
                            type="text"
                            onChange={(e) => {
                              handleEducation(
                                "current_designation",
                                e.target.value
                              );
                            }}
                          />
                          <p className="mt-2 text-danger">
                            {errors["current_designation"]}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label> Business Name</label>
                          <input
                            className={`form-control`}
                            value={educationDetails?.business_name}
                            name="business_name"
                            required="required"
                            onChange={(e) => {
                              handleEducation("business_name", e.target.value);
                            }}
                          />
                          <p className="mt-2 text-danger">
                            {errors["business_name"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Business Type</label>
                          <input
                            className={`form-control`}
                            value={educationDetails?.business_type}
                            name="business_type"
                            required="required"
                            type="text"
                            onChange={(e) => {
                              handleEducation("business_type", e.target.value);
                            }}
                          />
                          <p className="mt-2 text-danger">
                            {errors["business_type"]}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Business Startdate</label>

                          <Flatpickr
                            maxDate={"today"}
                            style={{
                              border: "1px solid #d1d5db",
                              borderRadius: "0.3rem",
                              width: "100%",
                              boxSizing: "border-box",
                              padding: "0.5rem",
                            }}
                            value={educationDetails?.business_start_date || ""}
                            className="date-picker"
                            onChange={(date) =>
                              handleEducation(
                                "business_start_date",
                                moment(date[0]).format("YYYY-MM-DD")
                              )
                            }
                          />

                          <p className="mt-2 text-danger">
                            {errors["business_start_date"]}
                          </p>
                        </div>
                      </div>
                    </>
                  )
                ) : null}
                {educationDetails?.is_employed ? (
                  <>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Current Monthly Salary</label>
                        <input
                          className={`form-control`}
                          value={educationDetails?.current_monthly_salary}
                          name="current_monthly_salary"
                          required="required"
                          type="number"
                          onChange={(e) => {
                            handleEducation(
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
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Total Experience (In Years)</label>
                        <input
                          className={`form-control`}
                          value={educationDetails?.total_experience_years}
                          name="total_experience_years"
                          required="required"
                          type="number"
                          onChange={(e) => {
                            handleEducation(
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
                  </>
                ) : null}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelected(1);
                  }}
                  className="btn btn-outline-info "
                  type="button"
                >
                  Back
                </button>
                <button className="mx-2 btn btn-outline-primary" type="submit">
                  Save
                </button>
                <button
                  disabled={isEdit ? false : progressCount < 2}
                  onClick={() => {
                    setSelected(3);
                  }}
                  className="btn btn-outline-secondary "
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EducationForm;
