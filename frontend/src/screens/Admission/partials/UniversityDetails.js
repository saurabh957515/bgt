import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import { countries } from "../../../helper";
import ReactSelect from "../../../components/ReactSelect";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import RadioGroup from "../../../components/RadioGroup";
const universityObject = {
  institute_name: "",
  country: "",
  course_detail: "",
  city: "",
  stay_in_type: "",
  stay_in_address: "",
  inquiry_id: "",
  admission_id: "",
};
const UniversityDetails = ({
  setSelected,
  universityDetails,
  setUniversityDetails,
  stayInOptions,
  progressCount,
}) => {
  const [admissionId, setAdmissionId] = useState("");
  const { postRoute, editRoute, getRoute } = useApi();
  const location = useLocation();
  const [editAdmissionId, setEditAdmissionId] = useState(
    location.state?.admissionId
  );
  const [createAdmission, setCreateAdmission] = useState(
    location.state?.makeAdmission
  );
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(
          `api/university/${universityDetails?.id}`,
          universityDetails
        )
      : await postRoute(`api/university`, universityDetails);
    if (errors) {
      setErrors(errors);
    } else {
      setSelected(4);
    }
  };

  const handleUniversity = (name, value) => {
    setUniversityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/university/filter",
          { admission_id: editAdmissionId },
          false
        );
        const editAdmisson = data?.[0];
        if (editAdmisson) {
          setUniversityDetails({
            id: editAdmisson?.id,
            inquiry_id: editAdmisson?.inquiry_id,
            institute_name: editAdmisson?.institute_name,
            country: editAdmisson?.country,
            course_detail: editAdmisson?.course_detail,
            city: editAdmisson?.city,
            stay_in_type: editAdmisson?.stay_in_type,
            admission_id: editAdmisson?.admission_id,
            stay_in_address: editAdmisson?.stay_in_address,
          });
          setIsEdit(true);
        } else {
          setUniversityDetails({
            inquiry_id: createAdmission?.id,
            country: createAdmission?.interested_country,
            course_detail: createAdmission?.course_detail,
            admission_id: admissionId,
          });
        }
      } else {
        if (createAdmission) {
          setUniversityDetails({
            inquiry_id: createAdmission?.id,
            country: createAdmission?.interested_country,
            course_detail: createAdmission?.course_detail,
            admission_id: admissionId,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission, admissionId]);

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
              <h2 className=" font-weight-bold">University Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Living options</label>
                    <ReactSelect
                      onChange={(option) =>
                        handleUniversity("stay_in_type", option?.value)
                      }
                      value={universityDetails?.stay_in_type}
                      options={stayInOptions}
                    />

                    <p className="mt-2 text-danger">{errors["stay_in_type"]}</p>
                  </div>
                </div>{" "}
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Living Address</label>
                    <input
                      className={`form-control`}
                      value={universityDetails?.stay_in_address || ""}
                      required="required"
                      onChange={(e) =>
                        handleUniversity("stay_in_address", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["stay_in_address"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
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
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelected(2);
                  }}
                  className="btn btn-outline-info"
                  type="button"
                >
                  Back
                </button>
                <button className="mx-2 btn btn-outline-primary" type="submit">
                  Save
                </button>
                <button
                  disabled={progressCount < 3}
                  onClick={() => {
                    setSelected(4);
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

export default UniversityDetails;
