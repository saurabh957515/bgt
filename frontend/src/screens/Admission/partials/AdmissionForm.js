import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../components/ReactSelect";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const admissionObject = {
  id: "",
  inquiry_id: "",
  name: "",
  email: "",
  contact_no: "",
  alternate_no: "",
  address: "",
  date_of_birth: "",
  current_city: "",
  visa_type: "",
  telecaller_name: "",
};
const AdmissionForm = ({ setAdmissionId, setSelected, visaOptions,progressCount }) => {
  const [admissionDetail, setAdmissionDetail] = useState(admissionObject);
  const [errors, setErrors] = useState({});
  const { postRoute, editRoute, getRoute } = useApi();
  const location = useLocation();
  const [editAdmissionId, setEditAdmissionId] = useState(
    location.state?.admissionId
  );
  const [createAdmission, setCreateAdmission] = useState(
    location.state?.makeAdmission
  );

  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(`api/admission/${admissionDetail?.id}`, admissionDetail)
      : await postRoute(`api/admission`, admissionDetail);
    if (errors) {
      setErrors(errors);
    } else {
      setAdmissionId(data?.admission_id);
      setSelected(2);
    }
  };

  const handleAdmission = (name, value) => {
    setAdmissionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data } = await getRoute(
          "/api/admission/filter",
          { id: editAdmissionId },
          false
        );
        const editAdmisson = data[0];
        if (editAdmisson) {
          setAdmissionDetail({
            id: editAdmisson?.id,
            inquiry_id: editAdmisson?.inquiry_id,
            name: editAdmisson?.name,
            email: editAdmisson?.email,
            contact_no: editAdmisson?.contact_no,
            alternate_no: editAdmisson?.alternate_no,
            address: editAdmisson?.address,
            date_of_birth: moment(editAdmisson?.date_of_birth).format(
              "YYYY-MM-DD"
            ),
            current_city: editAdmisson?.current_city,
            visa_type: editAdmisson?.visa_type,
            telecaller_name: editAdmisson?.telecaller_name,
          });
        }
        setIsEdit(true);
      } else {
        if (createAdmission) {
          setAdmissionDetail({
            inquiry_id: createAdmission?.id,
            name: createAdmission?.name,
            email: createAdmission?.email,
            contact_no: createAdmission?.contact_no,
            alternate_no: createAdmission?.alternate_no,
            address: createAdmission?.address,
            date_of_birth: moment(createAdmission?.date_of_birth).format(
              "YYYY-MM-DD"
            ),
            current_city: createAdmission?.current_city,
            visa_type: createAdmission?.visa_type,
            telecaller_name: createAdmission?.telecaller_name,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission]);

  useEffect(() => {
    const getAdmission = async () => {
      if (!editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/admission/filter",
          { inquiry_id: createAdmission?.id },
          false
        );
        if (!errors && data?.length === 1) {
          setEditAdmissionId(data[0]?.id);
          setIsEdit(true);
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
              <h2>Basic Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.name || ""}
                      required="required"
                      onChange={(e) => handleAdmission("name", e.target.value)}
                    />
                    <p className="mt-2 text-danger">{errors["name"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <Flatpickr
                      maxDate={"today"}
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
                    <p className="mt-2 text-danger">
                      {errors["date_of_birth"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Contact No</label>
                    <input
                      required
                      className="form-control"
                      value={admissionDetail?.contact_no || ""}
                      type="text"
                      maxLength="12"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[0-9]*$/.test(value)) {
                          handleAdmission("contact_no", value.slice(0, 12));
                        }
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["contact_no"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
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
                    <p className="mt-2 text-danger">{errors["alternate_no"]}</p>
                  </div>
                </div>{" "}
                <div className="col-md-4">
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
                    <p className="mt-2 text-danger">{errors["address"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Visa Type</label>
                    <ReactSelect
                      options={visaOptions}
                      required
                      value={admissionDetail?.visa_type || ""}
                      onChange={(e) => {
                        handleAdmission("visa_type", e.value);
                      }}
                    />{" "}
                    <p className="mt-2 text-danger">{errors["visa_type"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.email || ""}
                      required="required"
                      type="email"
                      onChange={(e) => handleAdmission("email", e.target.value)}
                    />
                    <p className="mt-2 text-danger">{errors["email"]}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Telecaller Name</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.telecaller_name || ""}
                      required="required"
                      type="text"
                      onChange={(e) =>
                        handleAdmission("telecaller_name", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["telecaller_name"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Current City</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.current_city || ""}
                      required="required"
                      type="text"
                      onChange={(e) =>
                        handleAdmission("current_city", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">{errors["current_city"]}</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="mr-2 btn btn-outline-primary" type="submit">
                  Save
                </button>
                <button
                 disabled={progressCount<1}
                  onClick={() => {
                    setSelected(2);
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

export default AdmissionForm;
