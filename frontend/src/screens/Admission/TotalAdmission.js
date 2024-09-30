import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import EducationForm from "./partials/EducationForm";
import AdmissionForm from "./partials/AdmissionForm";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../utils/UseApi";
import UniversityDetails from "./partials/UniversityDetails";
import FeePayment from "./partials/FeePayment";
import PopupModel from "../../components/PopupModel";
import { connect } from "react-redux";

const TotalAdmission = ({ nationalities }) => {
  const [selected, setSelected] = useState(1);
  const [addmissionId, setAdmissionId] = useState("");
  const history = useHistory();
  const { getRoute, editRoute, postRoute, deleteById } = useApi();
  const admissionObject = {
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
  const education_Details = {
    admission_id: "",
    highest_qualification: "",
    passing_year: 2012,
    name_of_institute: "",
    percentage_cgpa: "",
    is_employed: 0,
    current_company: "",
    current_designation: "",
    current_monthly_salary: 0,
    total_experience_years: 0,
    country_interested: "",
    visa_type: "",
    past_rejection_country_name: "",
    ielts_score: "",
    telecaller_name: "",
  };
  const [bankOptions, setBankOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [visaOptions, setVisaOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [educationDetails, setEducationDetail] = useState(education_Details);
  const [admissionDetail, setAdmissionDetail] = useState(admissionObject);
  const [employedOptions, setEmployedOptions] = useState([]);
  const [progressCount, setProgressCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [stayInOptions, setStayInOptions] = useState([]);
  const location = useLocation();
  const editAdmissionId = location.state?.admissionId;
  const createAdmission = location.state?.makeAdmission;
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getProgressCount = async () => {
      const { data } = await getRoute("/api/inquiry/filter", {
        id: createAdmission?.id,
      });
      setProgressCount(data[0]?.progress_count);
    };
    getProgressCount();
  }, [selected]);

  useEffect(() => {
    const optionValues = async () => {
      const genderOptions = await getRoute(
        "api/inquiry/enum-values/inquiry/gender"
      );
      const visaOptions = await getRoute(
        "api/inquiry/enum-values/inquiry/visa_type"
      );
      const employedOptions = await getRoute(
        "api/inquiry/enum-values/education/employed_type"
      );
      const stayInOptions = await getRoute(
        "api/inquiry/enum-values/university/stay_in_type"
      );
      setEmployedOptions(
        employedOptions?.data?.map((type) => ({
          label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
          value: type,
        }))
      );
      setStayInOptions(
        stayInOptions?.data?.map((stay) => ({
          label: stay.charAt(0).toUpperCase() + stay.slice(1).toLowerCase(),
          value: stay,
        }))
      );
      const { data, error } = await getRoute("/api/bank", "", false);
      setBankOptions(
        data?.map((bank) => ({
          label: `${bank?.bank_name} : ${bank?.account_number} `,
          value: bank?.id,
        }))
      );
      setVisaOptions(
        visaOptions?.data?.map((visa) => ({
          label: visa.charAt(0).toUpperCase() + visa.slice(1).toLowerCase(),
          value: visa,
        }))
      );
      setGenderOptions(
        genderOptions?.data?.map((gender) => ({
          label: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(),
          value: gender,
        }))
      );
    };
    optionValues();
  }, []);

  const getComponent = (type) => {
    switch (type) {
      case 1:
        return (
          <AdmissionForm
            nationalities={nationalities}
            visaOptions={visaOptions}
            admissionDetail={admissionDetail}
            progressCount={progressCount}
            setAdmissionDetail={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
            errors={errors}
            genderOptions={genderOptions}
          />
        );
      case 2:
        return (
          <EducationForm
            setIsModalOpen={setIsModalOpen}
            progressCount={progressCount}
            setAdmissionId={setAdmissionId}
            employedOptions={employedOptions}
            genderOptions={genderOptions}
            setEducationDetail={setEducationDetail}
            educationDetails={educationDetails}
            addmissionId={addmissionId}
            setSelected={setSelected}
            errors={errors}
          />
        );
      case 3:
        return (
          <UniversityDetails
            progressCount={progressCount}
            stayInOptions={stayInOptions}
            universityDetails={admissionDetail}
            setUniversityDetails={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
            errors={errors}
            addmissionId={addmissionId}
          />
        );
      case 4:
        return (
          <FeePayment
            progressCount={progressCount}
            bankOptions={bankOptions}
            feePaymentDetails={admissionDetail}
            setFeePaymentDetails={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
            errors={errors}
          />
        );
      default:
        break;
    }
  };
  const validationFiels = {
    1: [
      "name",
      "email",
      "contact_no",
      "alternate_no",
      "address",
      "date_of_birth",
    ],
    2: [
      "highest_qualification",
      "passing_year",
      "name_of_institute",
      "percentage_cgpa",
      "is_employed",
      "current_company",
      "current_designation",
      "current_monthly_salary",
      "total_experience_years",
      "country_interested",
      "visa_type",
      "past_rejection_country_name",
      "ielts_score",
      "telecaller_name",
    ],
    3: ["institute_name", "course_detail", "city", "country"],
    4: [
      "total_amount",
      "bank_detail",
      "remaining_amount",
      "paid_amount",
      "amounts",
    ],
  };
  const isErrorPresent = (field) =>
    validationFiels[field].some((key) => Object.keys(errors).includes(key));
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <PopupModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="Admissions"
            Breadcrumb={[
              { name: "Admission", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <ul style={{ borderBottom: "0px" }} className="nav nav-tabs">
            {[
              "Admission Details",
              "Education Details",
              "University Details",
              "Fee Payment",
            ]?.map((tab, index) => (
              <li
                key={index}
                className="cursor-pointer nav-item"
                onClick={() => setSelected(index + 1)}
              >
                <div
                  style={{ userSelect: "none", cursor: "pointer" }}
                  className={`nav-link cursor-pointer ${
                    isErrorPresent(index + 1) && "text-danger"
                  } ${selected === index + 1 && "active"}`}
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
const mapStateToProps = (state) => ({
  nationalities: state?.nationalityReducer?.nationalities,
});

export default connect(mapStateToProps)(TotalAdmission);
