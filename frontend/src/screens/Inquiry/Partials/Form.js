import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment/moment";
import useApi from "../../../utils/UseApi";
import { useHistory } from "react-router-dom";
import ReactSelect from "../../../components/ReactSelect";
import { countries } from "../../../helper.js";
import RadioGroup from "../../../components/RadioGroup.js";
const inquiryObject = {
  name: "john cena",
  email: "cena@gmail.com",
  contact_no: "96523485",
  alternate_no: "69523652",
  address: "jimsd@132",
  date_of_birth: "2001-09-03",
  interested_country: "USA",
  course_detail: "gg",
  current_city: "gg",
  telecaller_name: "gg",
  gender: "male",
  visa_type: "Work Visa",
  progress_count: "0",
};

const Form = ({ inquiryEdit }) => {
  const { postRoute, editRoute, getRoute } = useApi();
  const history = useHistory();
  const [inquiry, setInquiry] = useState(inquiryObject);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [genderOptions, setGenderOptions] = useState([]);
  const [visaOptions, setVisaOptions] = useState([]);

  useEffect(() => {
    const optionValues = async () => {
      const genderOptions = await getRoute(
        "api/inquiry/enum-values/inquiry/gender"
      );
      const visaOptions = await getRoute(
        "api/inquiry/enum-values/inquiry/visa_type"
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
    if (inquiryEdit?.id) {
      setIsEdit(true);
      setInquiry(inquiryEdit);
    } else {
      setInquiry(inquiryObject);
      setIsEdit(false);
    }
  }, [inquiryEdit]);
  const handleInquiry = (name, value) => {
    setInquiry((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newInquiry = {
        ...inquiry,
        date_of_birth: moment(inquiry?.date_of_birth).format("YYYY-MM-DD"),
      };
      const response = isEdit
        ? await editRoute(`/api/inquiry/${newInquiry?.id}`, newInquiry)
        : await postRoute("/api/inquiry", newInquiry);
      if (response?.errors) {
        setErrors(response?.errors);
      } else if (response?.data) {
        history.push("/inquiry");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

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
                {/* Name */}
                <div className="form-group col-md-4">
                  <label>Name</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.name}
                    onChange={(e) => handleInquiry("name", e.target.value)}
                  />
                  <p className="mt-2 text-danger">{errors["name"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Date Of Birth</label>
                  <Flatpickr
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "0.35rem",
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "0.5rem",
                    }}
                    required
                    value={inquiry?.date_of_birth}
                    onChange={(data) => {
                      const newDate = moment(data[0]).format("YYYY-MM-DD");
                      handleInquiry("date_of_birth", newDate);
                    }}
                  />{" "}
                  <p className="mt-2 text-danger">{errors["date_of_birth"]}</p>
                </div>

                <div className="form-group col-md-4">
                  <label>Gender</label>
                  <RadioGroup
                    onChange={(e) => handleInquiry("gender", e)}
                    value={inquiry?.gender}
                    options={genderOptions}
                  />

                  <p className="mt-2 text-danger">{errors["gender"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Contact No</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.contact_no}
                    type="number"
                    min="1"
                    maxLength="12"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        handleInquiry("contact_no", value.slice(0, 12));
                      }
                    }}
                  />
                  <p className="mt-2 text-danger">{errors["contact_no"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Alternate No</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.alternate_no}
                    type="text"
                    maxLength="12"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        handleInquiry("alternate_no", value.slice(0, 12));
                      }
                    }}
                  />{" "}
                  <p className="mt-2 text-danger">{errors["alternate_no"]}</p>
                </div>

                {/* Contact No */}

                {/* Address */}
                <div className="form-group col-md-4">
                  <label>Address</label>
                  <textarea
                    required
                    className="form-control"
                    value={inquiry?.address}
                    onChange={(e) => handleInquiry("address", e.target.value)}
                  />{" "}
                  <p className="mt-2 text-danger">{errors["address"]}</p>
                </div>

                {/* Email */}

                {/* Alternate No */}
                <div className="form-group col-md-4">
                  <label>Email</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.email}
                    type="email"
                    onChange={(e) => handleInquiry("email", e.target.value)}
                  />{" "}
                  <p className="mt-2 text-danger">{errors["email"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Inquiry Type</label>
                  <ReactSelect
                    options={visaOptions}
                    required
                    value={inquiry?.visa_type || ""}
                    onChange={(e) => {
                      handleInquiry("visa_type", e.value);
                    }}
                  />{" "}
                  <p className="mt-2 text-danger">{errors["visa_type"]}</p>
                </div>     <div className="form-group col-md-4">
                  <label>Country Interested</label>
                  <ReactSelect
                    options={Object.entries(countries)?.map(([key, value]) => ({
                      label: value,
                      value: key,
                    }))}
                    required
                    value={inquiry?.interested_country || ""}
                    onChange={(e) => {
                      handleInquiry("interested_country", e.value);
                    }}
                  />{" "}
                  <p className="mt-2 text-danger">
                    {errors["interested_country"]}
                  </p>
                </div>
                <div className="form-group col-md-4">
                  <label>Course Detail</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.course_detail}
                    type="text"
                    onChange={(e) =>
                      handleInquiry("course_detail", e.target.value)
                    }
                  />{" "}
                  <p className="mt-2 text-danger">{errors["course_detail"]}</p>
                </div>
                <div className="form-group col-md-4">
                  <label>Current City</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.current_city}
                    type="text"
                    onChange={(e) =>
                      handleInquiry("current_city", e.target.value)
                    }
                  />{" "}
                  <p className="mt-2 text-danger">{errors["city"]}</p>
                </div>
           
                <div className="form-group col-md-4">
                  <label>Telecaller Name</label>
                  <input
                    required
                    className="form-control"
                    value={inquiry?.telecaller_name}
                    type="text"
                    onChange={(e) =>
                      handleInquiry("telecaller_name", e.target.value)
                    }
                  />{" "}
                  <p className="mt-2 text-danger">
                    {errors["telecaller_name"]}
                  </p>
                </div>

                {/* Date of Birth */}
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
