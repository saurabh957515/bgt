import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../components/ReactSelect";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import RadioGroup from "../../../components/RadioGroup";
import axios from "axios";
const admissionObject = {
  inquiry_id: "",
  first_name: "",
  last_name: "",
  email: "",
  contact_no: "",
  alternate_no: "",
  address: "",
  date_of_birth: "",
  current_city: "",
  visa_type: "",
  telecaller_name: "",
  date_of_admission: "2024-09-30",
  gender: "",
  zip_code: "",
  passport_number: "333223",
  passport_expirydate: "2024-09-30",
  photo_document: "",
  adharcard_document: "",
  certification_document: "",
};
const AdmissionForm = ({
  setAdmissionId,
  setSelected,
  visaOptions,
  genderOptions,
  progressCount,
  nationalities,
}) => {
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
  const [imageSrc, setImageSrc] = useState("");
  const [pdfSrc, setPdfSrc] = useState('');
  useEffect(() => {
    const fetchFile = async () => {
      try {
        // Assuming your backend is running on localhost:9000
        const response = await axios.get(`http://localhost:5000/api/file/${10}`, {
          responseType: "blob", // Get the file as a Blob
        });
        // const imageURL = URL.createObjectURL(response.data);
        // setImageSrc(imageURL);
        const pdfURL = URL.createObjectURL(response.data);
        setPdfSrc(pdfURL); // Set PDF source to blob URL
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo_document", admissionDetail.photo_document);
    formData.append("adharcard_document", admissionDetail.adharcard_document);
    formData.append(
      "certification_document",
      admissionDetail.certification_document
    );
    Object.keys(admissionDetail).forEach((key) => {
      if (
        key !== "photo_document" &&
        key !== "adharcard_document" &&
        key !== "certification_document"
      ) {
        formData.append(key, admissionDetail[key]);
      }
    });
    const url = isEdit
      ? `api/admission/${admissionDetail?.id}`
      : `api/admission`;

    const response = isEdit
      ? await editRoute(url, formData)
      : await postRoute(url, formData, true, false);

    const { errors, data } = response;

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
  const handlePhotoDocument = (e) => {
    const file = e.target.files[0];
    handleAdmission("photo_document", file);
  };
  const handlAdharDocument = (e) => {
    const file = e.target.files[0];
    handleAdmission("adharcard_document", file);
  };
  const handleCertificationDocument = (e) => {
    const file = e.target.files[0];
    handleAdmission("certification_document", file);
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
            first_name: editAdmisson?.first_name,
            last_name: editAdmisson?.last_name,
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
            date_of_admission: editAdmisson?.date_of_admission,
            gender: editAdmisson?.gender,
            zip_code: editAdmisson?.zip_code,
            current_state: editAdmisson?.current_state,
            current_nationality: editAdmisson?.current_nationality,
          });
        }
        setIsEdit(true);
      } else {
        if (createAdmission) {
          setAdmissionDetail({
            ...admissionDetail,
            inquiry_id: createAdmission?.id,
            first_name: createAdmission?.first_name,
            last_name: createAdmission?.last_name,
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
            // date_of_admission: createAdmission?.date_of_admission,
            gender: createAdmission?.gender,
            zip_code: createAdmission?.zip_code,
            current_state: createAdmission?.current_state,
            current_nationality: createAdmission?.current_nationality,
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
        <div>
        {pdfSrc && (
        <iframe
          src={pdfSrc}
          width="100%"
          height="600px"
          title="PDF Viewer"
        />
      )}
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="File"
              style={{ width: "300px", height: "auto" }}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="col-md-12">
          <div className="card" style={{ borderRadius: "0 8px 8px 0" }}>
            <div className="header">
              <h2 className="font-weight-bold">Basic Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <di v className="col-md-4">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.first_name || ""}
                      // required="required"
                      onChange={(e) =>
                        handleAdmission("first_name", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">{errors["first_name"]}</p>
                  </div>
                </di>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.last_name || ""}
                      required="required"
                      onChange={(e) =>
                        handleAdmission("last_name", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">{errors["last_name"]}</p>
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
                    <label>Date of Admission</label>
                    <Flatpickr
                      maxDate={"today"}
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "0.3rem",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "0.5rem",
                      }}
                      value={admissionDetail?.date_of_admission || ""}
                      className="date-picker"
                      onChange={(date) =>
                        handleAdmission(
                          "date_of_admission",
                          moment(date[0]).format("YYYY-MM-DD")
                        )
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["date_of_admission"]}
                    </p>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label>Gender</label>
                  <ReactSelect
                    required
                    onChange={(e) => handleAdmission("gender", e.value)}
                    value={admissionDetail?.gender || ""}
                    options={genderOptions}
                  />

                  <p className="mt-2 text-danger">{errors["gender"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Current Nationality</label>
                  <ReactSelect
                    options={nationalities}
                    required
                    value={admissionDetail?.current_nationality || ""}
                    onChange={(e) => {
                      handleAdmission("current_nationality", e.value);
                    }}
                  />{" "}
                  <p className="mt-2 text-danger">
                    {errors["current_nationality"]}
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Phone Number</label>
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
                    <label>Alternate Number</label>
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
                    <label>Permanent Home Address</label>
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
                    <label>Email Address</label>
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
                <div className="form-group col-md-4">
                  <label> Current State</label>
                  <input
                    required
                    className="form-control"
                    value={admissionDetail?.current_state}
                    type="text"
                    onChange={(e) =>
                      handleAdmission("current_state", e.target.value)
                    }
                  />{" "}
                  <p className="mt-2 text-danger">{errors["city"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Postal/Zip Code</label>
                  <input
                    required
                    className="form-control"
                    value={admissionDetail?.zip_code}
                    type="text"
                    onChange={(e) =>
                      handleAdmission("zip_code", e.target.value)
                    }
                  />{" "}
                  <p className="mt-2 text-danger">{errors["city"]}</p>
                </div>{" "}
              </div>
            </div>
            <hr />
            <div className="header">
              <h2 className="font-weight-bold">PassPort Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Passport Number</label>
                    <input
                      className={`form-control`}
                      value={admissionDetail?.passport_number || ""}
                      required="required"
                      onChange={(e) =>
                        handleAdmission("passport_number", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["passport_number"]}
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Passport Expiry Date</label>
                    <Flatpickr
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "0.3rem",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "0.5rem",
                      }}
                      value={admissionDetail?.passport_expirydate || ""}
                      className="date-picker"
                      onChange={(date) =>
                        handleAdmission(
                          "passport_expirydate",
                          moment(date[0]).format("YYYY-MM-DD")
                        )
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["passport_expirydate"]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="header">
              <h2 className="font-weight-bold">Document Uploads </h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Upload Photo</label>
                    <input
                      type="file"
                      name="photo_document"
                      className={`form-control`}
                      onChange={handlePhotoDocument}
                    />
                    <p className="mt-2 text-danger">
                      {errors["photo_document"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Upload Aadhar Card</label>
                    <input
                      name="adharcard_document"
                      type="file"
                      className={`form-control`}
                      onChange={handlAdharDocument}
                    />
                    <p className="mt-2 text-danger">
                      {errors["adharcard_document"]}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Upload Certification</label>
                    <input
                      name="certification_document"
                      type="file"
                      className={`form-control`}
                      onChange={handleCertificationDocument}
                    />
                    <p className="mt-2 text-danger">
                      {errors["certification_document"]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <button className="mr-2 btn btn-outline-primary" type="submit">
                  Save
                </button>
                <button
                  disabled={progressCount < 1}
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
