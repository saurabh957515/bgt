import React, { useEffect, useState } from "react";
import useApi from "../../../utils/UseApi";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import ReactSelect from "../../../Components/ReactSelect";
import { useLocation } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import SaveButton from "../../../Components/SaveButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import CancelButton from "../../../Components/CancelButton";
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
  setProgressCount,
  setEditAdmission
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
        educationDetails,{},true
      )
      : await postRoute(`api/education`, educationDetails);
    if (errors) {
      setErrors(errors);
    } else {
      setProgressCount(2)
      setTimeout(() => {
         setSelected(2);
      }, 1000)
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
          setEditAdmission(true)
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
        setEditAdmission(false)
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
    <form className="mt-4" onSubmit={handleSubmit}>
      <h1 className="text-base font-bold">Current Education Information</h1>
      <div className="grid gap-4 mt-4 sm:grid-cols-3">
        <div>
          <InputLabel required="required" value={'Institution Name'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.name_of_institute || ""}
            required="required"
            onChange={(e) =>
              handleEducation("name_of_institute", e.target.value)
            }
          />
          <InputError message={errors["name_of_institute"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Course Details'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.course_details || ""}
            required="required"
            onChange={(e) =>
              handleEducation("course_details", e.target.value)
            }
          />
          <InputError message={errors["course_details"]} />
        </div>
        <div>
          <InputLabel required="required" value={'city'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.city || ""}
            required="required"
            onChange={(e) =>
              handleEducation("city", e.target.value)
            }
          />
          <InputError message={errors["city"]} />
        </div>
        <div>
          <InputLabel required="required" value={'state'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.state || ""}
            required="required"
            onChange={(e) =>
              handleEducation("state", e.target.value)
            }
          />
          <InputError message={errors["state"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Passing Year'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.passing_year || ""}
            required="required"
            onChange={(e) =>
              handleEducation("passing_year", e.target.value)
            }
          />
          <InputError message={errors["passing_year"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Percentage/CGPA'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.percentage_cgpa || ""}
            required="required"
            onChange={(e) =>
              handleEducation("percentage_cgpa", e.target.value)
            }
          />
          <InputError message={errors["percentage_cgpa"]} />
        </div>
        <div>
          <InputLabel required="required" value={'IELTS Score'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={educationDetails?.ielts_score || ""}
            required="required"
            onChange={(e) =>
              handleEducation("ielts_score", e.target.value)
            }
          />
          <InputError message={errors["ielts_score"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Current Status'}></InputLabel>
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
          <InputError message={errors["is_employed"]} />
        </div>

        {educationDetails?.is_employed ? (
          <div>
            <InputLabel value={"Employed Type"}></InputLabel>
            <ReactSelect
              options={employedOptions}
              required
              value={educationDetails?.employed_type || ""}
              onChange={(e) => {
                handleEducation("employed_type", e.value);
              }}
            />{" "}
            <InputError message={errors["employed_type"]} />

          </div>
        ) : null}
        {educationDetails?.is_employed ? (
          educationDetails?.employed_type === "job" ? (
            <>
              <div >
                <InputLabel value={'Current Company'}></InputLabel>
                <input
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                <InputError message={errors["current_company"]} />

              </div>
              <div className="col-md-4">

                <InputLabel value={"Current Designation"}></InputLabel>
                <input
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                <InputError message={errors["current_designation"]} />
              </div>
            </>
          ) : (
            <>
              <div >
                <InputLabel value={"Business Name"}> </InputLabel>
                <input
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={educationDetails?.business_name}
                  name="business_name"
                  required="required"
                  onChange={(e) => {
                    handleEducation("business_name", e.target.value);
                  }}
                />
                <InputError message={errors["business_name"]} />

              </div>
              <div>
                <InputLabel value={"Business Type"}> </InputLabel>
                <input
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={educationDetails?.business_type}
                  name="business_type"
                  required="required"
                  type="text"
                  onChange={(e) => {
                    handleEducation("business_type", e.target.value);
                  }}
                />
                <InputError message={errors["business_type"]} />
              </div>

              <div >
                <InputLabel value={'Business Startdate'}></InputLabel>
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
            </>
          )
        ) : null}
        {educationDetails?.is_employed ? (
          <>
            <div>
              <InputLabel value={"Current Monthly Salary"}> </InputLabel>
              <input
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
              <InputError message={errors["current_monthly_salary"]} />
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <InputLabel value={"Total Experience (In Years)"}> </InputLabel>
                <input
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
                /><InputError message={errors["total_experience_years"]} />


              </div>
            </div>
          </>
        ) : null}

      </div>

      <div className="mt-4">
        <CancelButton className="" onClick={(e) => {
          e.preventDefault();
          setSelected(0);
        }}>
          Back
        </CancelButton>
        <SaveButton className={'mr-4'}>
          Save
        </SaveButton>
        <SecondaryButton disabled={progressCount < 2} onClick={(e) => {
          e.preventDefault();
          setSelected(2);
        }}>
          Next
        </SecondaryButton>

      </div>
    </form>
  );
};

export default EducationForm;
