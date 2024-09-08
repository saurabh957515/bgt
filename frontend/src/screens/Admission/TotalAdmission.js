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
function validateAdmissionAndEducation(admissionObject, education_Details) {
  const errors = {};
  // Admission Object Validation
  if (!admissionObject.name.trim()) errors.name = "Name is required.";
  if (!admissionObject.email.trim()) errors.email = "Email is required.";
  if (!admissionObject.contact_no.trim())
    errors.contact_no = "Contact number is required.";
  if (
    admissionObject.alternate_no &&
    admissionObject.alternate_no.trim().length > 20
  ) {
    errors.alternate_no = "Alternate number must be less than 20 characters.";
  }
  if (!admissionObject.address.trim()) errors.address = "Address is required.";
  if (!admissionObject.date_of_birth.trim())
    errors.date_of_birth = "Date of birth is required.";
  if (!admissionObject.institute_name.trim())
    errors.institute_name = "Institute name is required.";
  if (!admissionObject.country.trim()) errors.country = "Country is required.";
  if (!admissionObject.city.trim()) errors.city = "City is required.";
  if (!admissionObject.paid_amount.trim())
    errors.paid_amount = "Paid amount is required.";
  if (!admissionObject.remaining_amount.trim())
    errors.remaining_amount = "Remaining amount is required.";
  if (!admissionObject.total_amount.trim())
    errors.total_amount = "Total amount is required.";

  // Validate Numeric Fields
  const paidAmount = parseFloat(admissionObject.paid_amount);
  const remainingAmount = parseFloat(admissionObject.remaining_amount);
  const totalAmount = parseFloat(admissionObject.total_amount);

  if (isNaN(paidAmount) || isNaN(remainingAmount) || isNaN(totalAmount)) {
    errors.amounts =
      "Paid amount, remaining amount, and total amount must be valid numbers.";
  } else {
    if (totalAmount < paidAmount + remainingAmount) {
      errors.amounts =
        "Total amount cannot be less than the sum of paid amount and remaining amount.";
    }

    if (remainingAmount !== totalAmount - paidAmount) {
      errors.remaining_amount =
        "Remaining amount must be equal to the total amount minus the paid amount.";
    }
  }

  if (!education_Details.highest_qualification.trim())
    errors.highest_qualification = "Highest qualification is required.";
  if (
    !education_Details.passing_year ||
    !Number.isInteger(education_Details.passing_year)
  )
    errors.passing_year = "Passing year must be a valid year.";
  if (!education_Details.name_of_institute.trim())
    errors.name_of_institute = "Name of institute is required.";

  // Validate percentage_cgpa
  const percentageCgpa = parseFloat(education_Details.percentage_cgpa);
  if (isNaN(percentageCgpa)) {
    errors.percentage_cgpa = "Percentage or CGPA must be a valid number.";
  } else if (percentageCgpa < 0 || percentageCgpa > 100) {
    errors.percentage_cgpa = "Percentage or CGPA must be between 0 and 100.";
  }

  const currentMonthlySalary = parseFloat(
    education_Details.current_monthly_salary
  );
  if (education_Details.is_employed && isNaN(currentMonthlySalary)) {
    errors.current_monthly_salary =
      "Current monthly salary must be a valid number.";
  } else if (education_Details.is_employed && currentMonthlySalary <= 0) {
    errors.current_monthly_salary =
      "Current monthly salary must be greater than zero.";
  }

  const totalExperienceYears = parseFloat(
    education_Details.total_experience_years
  );
  if (education_Details.is_employed && isNaN(totalExperienceYears)) {
    errors.total_experience_years =
      "Total experience in years must be a valid number.";
  } else if (
    education_Details.is_employed &&
    (totalExperienceYears < 0 || totalExperienceYears > 99)
  ) {
    errors.total_experience_years =
      "Total experience in years must be between 0 and 99.";
  }

  // Validate ielts_score
  const ieltsScore = parseFloat(education_Details.ielts_score);
  if (isNaN(ieltsScore)) {
    errors.ielts_score = "IELTS score must be a valid number.";
  } else if (ieltsScore < 0 || ieltsScore > 9) {
    errors.ielts_score = "IELTS score must be between 0 and 9.";
  }

  if (
    education_Details.is_employed &&
    !education_Details.current_company.trim()
  )
    errors.current_company = "Current company is required when employed.";
  if (
    education_Details.is_employed &&
    !education_Details.current_designation.trim()
  )
    errors.current_designation =
      "Current designation is required when employed.";
  if (
    education_Details.is_employed &&
    !education_Details.current_monthly_salary.trim()
  )
    errors.current_monthly_salary =
      "Current monthly salary is required when employed.";
  if (
    education_Details.is_employed &&
    !education_Details.total_experience_years.trim()
  )
    errors.total_experience_years =
      "Total experience in years is required when employed.";
  if (!education_Details.country_interested.trim())
    errors.country_interested = "Country interested is required.";
  if (!education_Details.visa_type.trim())
    errors.visa_type = "Visa type is required.";
  if (!education_Details.ielts_score.trim())
    errors.ielts_score = "IELTS score is required.";
  if (!education_Details.telecaller_name.trim())
    errors.telecaller_name = "Telecaller name is required.";

  return errors;
}

const TotalAdmission = () => {
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
  const [errors, setErrors] = useState({});
  const [stayInOptions,setStayInOptions]=useState([])
  const location = useLocation();
  const editAdmissionId = location.state?.admissionId;
  const createAdmission = location.state?.makeAdmission;
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
          label: bank?.bank_name,
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
  useEffect(() => {
    // const getData = async () => {
    //   if (editAdmissionId) {
    //     const admissionData = await getRoute("api/admission");
    //     const editAdmisson = admissionData?.find(
    //       (admisson) => admisson?.admissionDetails_id === editAdmissionId
    //     );
    //     if (editAdmisson) {
    //       if (editAdmisson?.educationDetails_id) {
    //         setEducationDetail({
    //           id: editAdmisson?.educationDetails_id,
    //           admission_id: editAdmisson?.admissionDetails_id,
    //           highest_qualification: editAdmisson?.highest_qualification,
    //           passing_year: editAdmisson?.passing_year,
    //           name_of_institute: editAdmisson?.name_of_institute,
    //           percentage_cgpa: editAdmisson?.percentage_cgpa,
    //           is_employed: editAdmisson?.is_employed,
    //           current_company: editAdmisson?.current_company,
    //           current_designation: editAdmisson?.current_designation,
    //           current_monthly_salary: editAdmisson?.current_monthly_salary || 0,
    //           total_experience_years: editAdmisson?.total_experience_years || 0,
    //           country_interested: editAdmisson?.country_interested,
    //           visa_type: editAdmisson?.visa_type,
    //           past_rejection_country_name:
    //             editAdmisson?.past_rejection_country_name,
    //           ielts_score: editAdmisson?.ielts_score,
    //           telecaller_name: editAdmisson?.telecaller_name,
    //         });
    //       } else {
    //         setEducationDetail({
    //           ...education_Details,
    //           admission_id: editAdmisson?.admissionDetails_id,
    //         });
    //       }
    //       setAdmissionDetail({
    //         id: editAdmisson?.admissionDetails_id,
    //         name: editAdmisson?.name,
    //         email: editAdmisson?.email,
    //         contact_no: editAdmisson?.contact_no,
    //         alternate_no: editAdmisson?.alternate_no,
    //         address: editAdmisson?.address,
    //         date_of_birth: moment(editAdmisson?.date_of_birth).format(
    //           "YYYY-MM-DD"
    //         ),
    //         is_acknowledged: editAdmisson?.is_acknowledged,
    //         institute_name: editAdmisson?.institute_name,
    //         country: editAdmisson?.country,
    //         city: editAdmisson?.city,
    //         paid_amount: editAdmisson?.paid_amount,
    //         remaining_amount: editAdmisson?.remaining_amount,
    //         total_amount: editAdmisson?.total_amount,
    //         city: editAdmisson?.city,
    //         bank_detail_id: editAdmisson?.bank_detail_id,
    //       });
    //     }
    //     setIsEdit(true);
    //   } else {
    //     if (createAdmission) {
    //       setAdmissionDetail({
    //         inquiry_id: createAdmission?.id,
    //         name: createAdmission?.name,
    //         email: createAdmission?.email,
    //         contact_no: createAdmission?.contact_no,
    //         alternate_no: createAdmission?.alternate_no,
    //         address: createAdmission?.address,
    //         date_of_birth: moment(createAdmission?.date_of_birth).format(
    //           "YYYY-MM-DD"
    //         ),
    //         current_city: createAdmission?.current_city,
    //         visa_type: createAdmission?.visa_type,
    //         telecaller_name: createAdmission?.telecaller_name,
    //       });
    //     }
    //     setIsEdit(false);
    //   }
    // };
    // getData();
  }, [editAdmissionId, createAdmission]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateAdmissionAndEducation(
      admissionDetail,
      educationDetails
    );

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      if (isEdit) {
        const admissionResponse = await editRoute(
          `api/admission/${admissionDetail?.id}`,
          admissionDetail
        );
        if (admissionResponse?.status === "success") {
          const educationResponse = await editRoute(
            `api/education/${educationDetails?.id}`,
            {
              ...educationDetails,
              admission_id: admissionResponse?.admission_id,
            }
          );
          if (educationResponse?.status === "success") {
            setTimeout(() => {
              history.push("/totalAdmission");
            }, 1000);
          }
        }
      } else {
        const admissionResponse = await postRoute(
          `api/admission`,
          admissionDetail
        );
        if (admissionResponse?.status === "success") {
          const educationResponse = await postRoute(`api/education`, {
            ...educationDetails,
            admission_id: admissionResponse?.admission_id,
          });
          if (educationResponse?.status === "success") {
            if (createAdmission) {
              const inquiresData = await deleteById(
                `api/inquiry/${createAdmission?.id}`
              );
            }
            setTimeout(() => {
              history.push("/totalAdmission");
            }, 1000);
          }
        }
      }
    }
  };

  const getComponent = (type) => {
    switch (type) {
      case 1:
        return (
          <AdmissionForm
            visaOptions={visaOptions}
            admissionDetail={admissionDetail}
            setAdmissionDetail={setAdmissionDetail}
            setSelected={setSelected}
            setAdmissionId={setAdmissionId}
            errors={errors}
          />
        );
      case 2:
        return (
          <EducationForm
          employedOptions={employedOptions}
            genderOptions={genderOptions}
            handleSubmit={handleSubmit}
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
            bankOptions={bankOptions}
            handleSubmit={handleSubmit}
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
                className="cursor-pointer nav-item"
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

export default TotalAdmission;
