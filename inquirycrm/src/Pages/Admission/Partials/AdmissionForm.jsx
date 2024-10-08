import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import useApi from "../../../utils/UseApi";
import axios from "axios";
import ReactSelect from "../../../Components/ReactSelect";
import { useLocation } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import PopUpModel from "../../../Components/PopUpModel";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { MdHideImage } from "react-icons/md";
import SaveButton from "../../../Components/SaveButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import { PiEmptyFill } from "react-icons/pi";
import CancelButton from "../../../Components/CancelButton";
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
  setProgressCount
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
  const [photoPreview, setPhotoPreview] = useState(null);
  const [adharPreview, setAdharPreview] = useState(null);
  const [certificationPreview, setCertificationPreview] = useState(null);
  const [isPhotoEdit, setIsPhotEdit] = useState(false);
  const [isAdharEdit, setIsAdharEdit] = useState(false);
  const [isCertiEdit, setIsCertiEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showAdharPreview, setShowAdharPreview] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false)
  useEffect(() => {
    const fetchFile = async () => {
      try {
        // Assuming your backend is running on localhost:9000
        const response = await axios.get(
          `http://localhost:5000/api/file/${10}`,
          {
            responseType: "blob", // Get the file as a Blob
          }
        );
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
      setProgressCount(1)
      setTimeout(() => {
        setSelected(1);
      }, 300)

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

    if (file) {
      const MAX_PHOTO_SIZE = 500 * 1024; // 500KB
      const allowedTypes = ["image/jpeg", "image/png"]; // Allowed image types

      // Check if file size exceeds 500KB
      if (file.size > MAX_PHOTO_SIZE) {
        setErrors({
          photo_document:
            "File size exceeds 500KB. Please upload a smaller image.",
        });
        handleAdmission("photo_document", null); // Clear the file in the admission form
        setIsPhotEdit(false);
        setPhotoPreview(null); // Clear the preview
        return; // Stop further processing
      }

      // Check if file type is valid
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          photo_document:
            "Invalid file type. Only JPEG and PNG images are allowed.",
        });
        handleAdmission("photo_document", null); // Clear the file in the admission form
        setIsPhotEdit(false);
        setPhotoPreview(null); // Clear the preview
        return; // Stop further processing
      }

      handleAdmission("photo_document", file);
      setIsPhotEdit(true);
      setPhotoPreview(URL.createObjectURL(file)); // Show the preview of the uploaded image
    }
  };

  const handleAdharDocument = (e) => {
    const file = e.target.files[0];

    if (file) {
      const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ["application/pdf"]; // Allowed file type (PDF)

      // Check if file size exceeds 2MB
      if (file.size > MAX_PDF_SIZE) {
        setErrors({
          adharcard_document:
            "File size exceeds 2MB. Please upload a smaller PDF file.",
        });
        handleAdmission("adharcard_document", null); // Clear the file in the admission form
        setIsAdharEdit(false);
        setAdharPreview(null); // Clear the preview
        return; // Stop further processing
      }

      // Check if file type is valid (PDF)
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          adharcard_document:
            "Invalid file type. Only PDF files are allowed for Adhar card documents.",
        });
        handleAdmission("adharcard_document", null); // Clear the file in the admission form
        setIsAdharEdit(false);
        setAdharPreview(null); // Clear the preview
        return; // Stop further processing
      }

      handleAdmission("adharcard_document", file);
      setIsAdharEdit(true);
      setAdharPreview(URL.createObjectURL(file)); // Show the preview of the uploaded file
    }
  };

  const handleCertificationDocument = (e) => {
    const file = e.target.files[0];

    if (file) {
      const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ["application/pdf"]; // Allowed file type (PDF)

      // Check if file size exceeds 2MB
      if (file.size > MAX_PDF_SIZE) {
        setErrors({
          certification_document:
            "File size exceeds 2MB. Please upload a smaller PDF file.",
        });
        handleAdmission("certification_document", null); // Clear the file in the admission form
        setIsCertiEdit(false);
        setCertificationPreview(null); // Clear the preview
        return; // Stop further processing
      }

      // Check if file type is valid (PDF)
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          certification_document:
            "Invalid file type. Only PDF files are allowed for certification documents.",
        });
        handleAdmission("certification_document", null); // Clear the file in the admission form
        setIsCertiEdit(false);
        setCertificationPreview(null); // Clear the preview
        return; // Stop further processing
      }

      handleAdmission("certification_document", file);
      setIsCertiEdit(true);
      setCertificationPreview(URL.createObjectURL(file)); // Show the preview of the uploaded file
    }
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
            passport_number: editAdmisson?.passport_number,
            passport_expirydate: editAdmisson?.passport_expirydate,
            photo_document: editAdmisson?.photo_document,
            adharcard_document: editAdmisson?.adharcard_document,
            certification_document: editAdmisson?.certification_document,
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
            passport_number: createAdmission?.passport_number,
            passport_expirydate: createAdmission?.passport_expirydate,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission]);

  useEffect(() => {
    if (editAdmissionId) {
      const fetchFile = async (id, type) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/file/${id}`,
            {
              responseType: "blob",
            }
          );
          return URL.createObjectURL(response.data);
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      };

      const fetchFiles = async () => {
        if (admissionDetail?.photo_document && !isPhotoEdit) {
          const photoUrl = await fetchFile(
            admissionDetail.photo_document,
            "photo"
          );
          setPhotoPreview(photoUrl);
        }
        if (admissionDetail?.adharcard_document && !isAdharEdit) {
          const adharUrl = await fetchFile(
            admissionDetail.adharcard_document,
            "adhar"
          );
          setAdharPreview(adharUrl);
        }
        if (admissionDetail?.certification_document && !isCertiEdit) {
          const certificationUrl = await fetchFile(
            admissionDetail.certification_document,
            "certification"
          );
          setCertificationPreview(certificationUrl);
        }
      };

      fetchFiles();
    }
  }, [
    admissionDetail?.photo_document,
    admissionDetail?.adharcard_document,
    admissionDetail?.certification_document,
    editAdmissionId,
    isPhotoEdit,
  ]);

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
    <form className="mt-4" onSubmit={handleSubmit}>
      <h1 className="text-base font-bold">Basic Information</h1>
      <div className="grid gap-4 mt-4 sm:grid-cols-3">
        <div>
          <InputLabel required="required" value={'First Name'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.first_name || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("first_name", e.target.value)
            }
          />
          <InputError message={errors["first_name"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Last Name'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.last_name || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("last_name", e.target.value)
            }
          />
          <InputError message={errors["last_name"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Date Of Birth'}></InputLabel>
          <Flatpickr
            options={{
              maxDate: moment().subtract(10, "years").format("YYYY-MM-DD"),
            }}
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
          <InputError message={errors["date_of_birth"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Date of Admission'}></InputLabel>
          <Flatpickr
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
          <InputError message={errors["date_of_birth"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Gender'}></InputLabel>
          <ReactSelect
            required
            onChange={(e) => handleAdmission("gender", e.value)}
            value={admissionDetail?.gender || ""}
            options={genderOptions}
          />
          <InputError message={errors["gender"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Current Nationality'}></InputLabel>
          <ReactSelect
            required
            onChange={(e) => handleAdmission("current_nationality", e.value)}
            value={admissionDetail?.current_nationality || ""}
            options={nationalities}
          />
          <InputError message={errors["current_nationality"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Phone Number'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.contact_no || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("contact_no", e.target.value)
            }
          />
          <InputError message={errors["contact_no"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Alternate Number'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.alternate_no || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("alternate_no", e.target.value)
            }
          />
          <InputError message={errors["alternate_no"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Permanent Home Address'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.address || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("address", e.target.value)
            }
          />
          <InputError message={errors["address"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Visa Type'}></InputLabel>
          <ReactSelect
            options={visaOptions}
            required
            value={admissionDetail?.visa_type || ""}
            onChange={(e) => {
              handleAdmission("visa_type", e.value);
            }}
          />{" "}
          <InputError message={errors["visa_type"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Email Address'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.email || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("email", e.target.value)
            }
          />
          <InputError message={errors["email"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Telecaller Name'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.telecaller_name || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("telecaller_name", e.target.value)
            }
          />
          <InputError message={errors["telecaller_name"]} />
        </div> <div>
          <InputLabel required="required" value={'Current City'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.current_city || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("current_city", e.target.value)
            }
          />
          <InputError message={errors["current_city"]} />
        </div>

        <div>
          <InputLabel required="required" value={'Current State'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.current_state || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("current_state", e.target.value)
            }
          />
          <InputError message={errors["current_state"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Postal/Zip Code'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.zip_code || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("zip_code", e.target.value)
            }
          />
          <InputError message={errors["zip_code"]} />
        </div>
      </div>
      <h1 className="my-4 text-base font-bold">PassPort Information</h1>
      <div className="grid gap-4 grid-cols sm:grid-cols-3">
        <div>
          <InputLabel required="required" value={'Passport Number'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={admissionDetail?.passport_number || ""}
            required="required"
            onChange={(e) =>
              handleAdmission("passport_number", e.target.value)
            }
          />
          <InputError message={errors["passport_number"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Passport Expiry Date'}></InputLabel>
          <Flatpickr
            options={{
              minDate: new Date().toISOString().split("T")[0],
              allowInput: true
            }}
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
          <InputError message={errors["passport_expirydate"]} />
        </div>

      </div>
      <h1 className="my-4 text-base font-bold">Document Uploads </h1>
      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="flex flex-col justify-between h-full pr-4 border-r-2">
          <label className="block mb-2 font-medium text-gray-700">Upload Photo</label>
          <input
            disabled={editAdmissionId}
            type="file"
            name="photo_document"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handlePhotoDocument}
          />
          {errors["photo_document"] && (
            <p className="mt-2 text-sm text-red-600">{errors["photo_document"]}</p>
          )}
        </div>
        <div className="flex flex-col justify-between h-full">
          <label className="block mb-2 font-medium text-gray-700">Photo Preview</label>
          <div>
            {photoPreview ? <FaImage className="w-20 h-20 text-gray-600" /> : <MdHideImage className="w-20 h-20 text-gray-600" />}
          </div>
          <div className="flex items-center gap-x-4">

            <SecondaryButton disabled={!photoPreview} onClick={(e) => {
              e.preventDefault();
              setShowImagePreview(true)
            }}>
              Preview
            </SecondaryButton>
            <SaveButton disabled={!photoPreview}>
              Delete
            </SaveButton>


          </div>


          <div className="mb-3">
            <PopUpModel open={showImagePreview} setOpen={setShowImagePreview}>
              <div className="flex flex-col w-full h-full ">
                <div className="p-4 grow">
                  <a href={photoPreview || "#"} download="photo.png" target="_blank" rel="noopener noreferrer">
                    <img
                      src={photoPreview || "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="}
                      alt="Photo Preview"
                      className="object-cover w-full bg-gray-100 rounded-lg h-60"
                    />
                  </a>
                </div>


                <div >
                  <button onClick={() => setShowImagePreview(false)} className="px-8 py-2 my-2 ml-4 font-semibold text-gray-400 bg-white border rounded-lg">
                    Cancel

                  </button>
                  <a
                    href={photoPreview || "#"}
                    download="adharcard.pdf"
                    className="px-8 py-2 my-2 ml-4 font-semibold text-white rounded-lg bg-inquiryBlue-900">
                    Download
                  </a>
                </div>
              </div>
            </PopUpModel>

          </div>
        </div>

        {/* Aadhar Upload and Preview */}
        <div className="flex flex-col justify-between h-full pr-4 border-r-2">
          <label className="block mb-2 font-medium text-gray-700">Upload Aadhar Card</label>
          <input
            disabled={editAdmissionId}
            type="file"
            name="adharcard_document"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleAdharDocument}
          />
          {errors["adharcard_document"] && (
            <p className="mt-2 text-sm text-red-600">{errors["adharcard_document"]}</p>
          )}
        </div>
        <div className="flex flex-col justify-between h-full">
          <label className="block mb-2 font-medium text-gray-700">Aadhar Card Preview</label>
          <div>
            {adharPreview ? <FaFilePdf className="w-20 h-20 text-gray-600" /> : <PiEmptyFill className="w-20 h-20 text-gray-600" />}
          </div>
          <div className="flex items-center gap-x-4">

            <SecondaryButton disabled={!adharPreview} onClick={(e) => {
              e.preventDefault();
              setShowAdharPreview(true)
            }}>
              Preview
            </SecondaryButton>
            <SaveButton disabled={!adharPreview}>
              Delete
            </SaveButton>

          </div>
          <div className="mb-3">
            <PopUpModel className="w-full h-full" open={showAdharPreview} setOpen={setShowAdharPreview}>
              <div className="flex flex-col w-full h-full ">
                <div className="p-4 grow">
                  <embed
                    src={adharPreview || "data:application/pdf;base64,JVBERi0xLjcKJYGBgYEKC..."}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="w-full h-full bg-gray-100 rounded-lg"
                  />
                </div>
                <div >
                  <button onClick={() => setShowAdharPreview(false)} className="px-8 py-2 my-2 ml-4 font-semibold text-gray-400 bg-white border rounded-lg">
                    Cancel

                  </button>
                  <a
                    href={adharPreview || "#"}
                    download="adharcard.pdf"
                    className="px-8 py-2 my-2 ml-4 font-semibold text-white rounded-lg bg-inquiryBlue-900">
                    Download
                  </a>
                </div>
              </div>
            </PopUpModel>
          </div>
        </div>

        {/* Certification Upload and Preview */}
        <div className="flex flex-col justify-between h-full pr-4 border-r-2">
          <label className="block mb-2 font-medium text-gray-700">Upload Certification</label>
          <input
            disabled={editAdmissionId}
            type="file"
            name="certification_document"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleCertificationDocument}
          />
          {errors["certification_document"] && (
            <p className="mt-2 text-sm text-red-600">{errors["certification_document"]}</p>
          )}
        </div>
        <div className="flex flex-col justify-between h-full">
          <label className="block mb-2 font-medium text-gray-700">Certification Preview</label>
          <div>
            {certificationPreview ? <FaFilePdf className="w-20 h-20 text-gray-600" /> : <PiEmptyFill className="w-20 h-20 text-gray-600" />}
          </div>
          <div className="flex items-center gap-x-4">

            <SecondaryButton disabled={!certificationPreview} onClick={(e) => {
              e.preventDefault();
              setShowDocPreview(true)
            }}>
              Preview
            </SecondaryButton>
            <SaveButton disabled={!certificationPreview}>
              Delete
            </SaveButton>
          </div>
          <div className="mb-3">
            <PopUpModel className="w-full h-full" open={showDocPreview} setOpen={setShowDocPreview}>
              <div className="flex flex-col w-full h-full ">
                <div className="p-4 grow">
                  <embed
                    src={certificationPreview || "data:application/pdf;base64,JVBERi0xLjcKJYGBgYEKC..."}
                    type="application/pdf"
                    width="100%"
                    height="190px"
                    className="w-full h-full bg-gray-100 rounded-lg"
                  />
                </div>
                <div >
                  <button onClick={() => setShowDocPreview(false)} className="px-8 py-2 my-2 ml-4 font-semibold text-gray-400 bg-white border rounded-lg">
                    Cancel

                  </button>
                  <a
                    href={certificationPreview || "#"}
                    download="adharcard.pdf"
                    className="px-8 py-2 my-2 ml-4 font-semibold text-white rounded-lg bg-inquiryBlue-900">
                    Download
                  </a>
                </div>
              </div>
            </PopUpModel>
          </div>
        </div>

      </div>

      <div className="mt-4 ">

        <SaveButton type="submit">
          Save
        </SaveButton>
        <SecondaryButton disabled={progressCount < 1} type="button"
          onClick={() => {
            setSelected(1);
          }} className="ml-4">
          Next
        </SecondaryButton>
      </div>
    </form>
  );
};

export default AdmissionForm;
