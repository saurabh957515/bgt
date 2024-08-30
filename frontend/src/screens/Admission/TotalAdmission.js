import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import EducationForm from "./partials/EducationForm";
import AdmissionForm from "./partials/AdmissionForm";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../utils/UseApi";
import moment from "moment";
import UniversityDetails from "./partials/UniversityDetails";
import FeePayment from "./partials/FeePayment";

const TotalAdmission = () => {
  const [selected, setSelected] = useState(1);
  const [addmissionId, setAdmissionId] = useState("");
  const history = useHistory();
  const { getRoute, editRoute, postRoute, deleteById } = useApi();
  const admissionObject = {
    name: "",
    email: "",
    contact_no: "",
    alternate_no: "",
    address: "",
    date_of_birth: "",
    is_acknowledged: false,
    institute_name: "",
    country: "",
    city: "",
    paid_amount: "",
    remaining_amount: "",
    total_amount: "",
  };
  const education_Details = {
    admission_id: "",
    highest_qualification: "s's Degree",
    passing_year: 2012,
    name_of_institute: "XYZ University",
    percentage_cgpa: "3.80",
    is_employed: 1,
    current_company: "ABC Corp",
    current_designation: "Software Engineer",
    current_monthly_salary: "5000.00",
    total_experience_years: "5.0",
    country_interested: "USA",
    visa_type: "H-1B",
    past_rejection_country_name: "None",
    ielts_score: "7.5",
    telecaller_name: "mate dameon",
  };

  const [isEdit, setIsEdit] = useState(false);
  const [educationDetails, setEducationDetail] = useState(education_Details);
  const [admissionDetail, setAdmissionDetail] = useState(admissionObject);
  const location = useLocation();
  const editAdmissionId = location.state?.admissionId;
  const createAdmission = location.state?.makeAdmission;
  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const admissionData = await getRoute("api/admission");
        const editAdmisson = admissionData?.find(
          (admisson) => admisson?.admissionDetails_id === editAdmissionId
        );
        if (editAdmisson) {
          if (editAdmisson?.educationDetails_id) {
            setEducationDetail({
              id: editAdmisson?.educationDetails_id,
              admission_id: editAdmisson?.admissionDetails_id,
              highest_qualification: editAdmisson?.highest_qualification,
              passing_year: editAdmisson?.passing_year,
              name_of_institute: editAdmisson?.name_of_institute,
              percentage_cgpa: editAdmisson?.percentage_cgpa,
              is_employed: editAdmisson?.is_employed,
              current_company: editAdmisson?.current_company,
              current_designation: editAdmisson?.current_designation,
              current_monthly_salary: editAdmisson?.current_monthly_salary,
              total_experience_years: editAdmisson?.total_experience_years,
              country_interested: editAdmisson?.country_interested,
              visa_type: editAdmisson?.visa_type,
              past_rejection_country_name:
                editAdmisson?.past_rejection_country_name,
              ielts_score: editAdmisson?.ielts_score,
              telecaller_name: editAdmisson?.telecaller_name,
            });
          } else {
            setEducationDetail({
              ...education_Details,
              admission_id: editAdmisson?.admissionDetails_id,
            });
          }
          setAdmissionDetail({
            id: editAdmisson?.admissionDetails_id,
            name: editAdmisson?.name,
            email: editAdmisson?.email,
            contact_no: editAdmisson?.contact_no,
            alternate_no: editAdmisson?.alternate_no,
            address: editAdmisson?.address,
            date_of_birth: moment(editAdmisson?.date_of_birth).format(
              "YYYY-MM-DD"
            ),
            is_acknowledged: editAdmisson?.is_acknowledged,
          });
        }
        setIsEdit(true);
      } else {
        if (createAdmission) {
          setAdmissionDetail({
            name: createAdmission?.name,
            email: createAdmission?.email,
            contact_no: createAdmission?.contact_no,
            alternate_no: createAdmission?.alternate_no,
            address: createAdmission?.address,
            date_of_birth: moment(createAdmission?.date_of_birth).format(
              "YYYY-MM-DD"
            ),
            is_acknowledged: false,
            institute_name: createAdmission?.institute_name,
            country: createAdmission?.interesetd_country,
            city: createAdmission?.city,
            paid_amount: createAdmission?.paid_amount,
            remaining_amount: createAdmission?.remaining_amount,
            total_amount: createAdmission?.total_amount,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const admissionResponse = await editRoute(
        `api/admission/${admissionDetail?.id}`,
        admissionDetail
      );
      const educationResponse = await editRoute(
        `api/education/${educationDetails?.id}`,
        { ...educationDetails, admission_id: admissionResponse?.admission_id }
      );
    } else {
      const admissionResponse = await postRoute(
        `api/admission`,
        admissionDetail
      );
      const educationResponse = await postRoute(`api/education`, {
        ...educationDetails,
        admission_id: admissionResponse?.admission_id,
      });
      if (createAdmission) {
        const inquiresData = await deleteById(
          `api/inquiry/${createAdmission?.id}`
        );
      }
    }
    setTimeout(() => {
      history.push("/totalAdmission");
    }, 1000);
  };

  const getComponent = (type) => {
    switch (type) {
      case 1:
        return (
          <AdmissionForm
            admissionDetail={admissionDetail}
            setAdmissionDetail={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
          />
        );
      case 2:
        return (
          <EducationForm
            handleSubmit={handleSubmit}
            setEducationDetail={setEducationDetail}
            educationDetails={educationDetails}
            addmissionId={addmissionId}
            setSelected={setSelected}
          />
        );
      case 3:
        return (
          <UniversityDetails
            universityDetails={admissionDetail}
            setUniversityDetails={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
          />
        );
      case 4:
        return (
          <FeePayment
            handleSubmit={handleSubmit}
            feePaymentDetails={admissionDetail}
            setFeePaymentDetails={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
          />
        );
      default:
        break;
    }
  };

  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="Admissions"
            Breadcrumb={[
              { name: "Admission", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <ul className="nav nav-tabs">
            {[
              "Admission Details",
              "Education Details",
              "University Details",
              "Fee Payment",
            ]?.map((tab, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelected(index + 1);
                }}
                className="nav-item"
              >
                <div
                  className={`nav-link  ${selected === index + 1 && "active"}`}
                >
                  {tab}
                </div>
              </li>
            ))}
          </ul>
          {getComponent(selected)}
        </div>
      </div>
    </div>
  );
};

export default TotalAdmission;
